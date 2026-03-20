from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.material import Material, MaterialTemplate
from app.models.school import SchoolProgram
from app.schemas.material import MaterialCreate, MaterialResponse, MaterialGenerateRequest

router = APIRouter()


@router.post("/generate", response_model=MaterialResponse)
async def generate_material(
    request: MaterialGenerateRequest,
    db: Session = Depends(get_db)
):
    """生成申请材料"""
    # 检查学校项目是否存在
    program = db.query(SchoolProgram).filter(SchoolProgram.id == request.school_program_id).first()
    if not program:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="学校项目不存在"
        )

    # 创建材料记录
    material = Material(
        user_id=1,  # TODO: 从JWT token中获取
        school_program_id=request.school_program_id,
        material_type=request.material_type,
        parameters=request.parameters,
        status="generating"
    )

    db.add(material)
    db.commit()
    db.refresh(material)

    # TODO: 调用AI服务生成内容
    # 根据material_type选择不同的生成逻辑
    if request.material_type == "ps":
        content = await generate_personal_statement(
            request.resume_content,
            request.user_info,
            program,
            request.parameters
        )
    elif request.material_type == "recommendation_letter":
        content = await generate_recommendation_letter(
            request.resume_content,
            request.user_info,
            program,
            request.parameters
        )
    elif request.material_type == "research_plan":
        content = await generate_research_plan(
            request.resume_content,
            request.user_info,
            program,
            request.parameters
        )
    elif request.material_type == "ppt":
        # PPT生成比较复杂，需要单独处理
        pass
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="不支持的文档类型"
        )

    # 更新材料状态
    material.content = content
    material.status = "completed"
    material.word_count = len(content) if content else 0

    db.commit()
    db.refresh(material)

    return material


@router.get("", response_model=List[MaterialResponse])
async def get_materials(
    user_id: int = None,
    material_type: str = None,
    db: Session = Depends(get_db)
):
    """获取材料列表"""
    query = db.query(Material)

    if user_id:
        query = query.filter(Material.user_id == user_id)
    if material_type:
        query = query.filter(Material.material_type == material_type)

    return query.all()


@router.get("/{material_id}", response_model=MaterialResponse)
async def get_material(material_id: int, db: Session = Depends(get_db)):
    """获取材料详情"""
    material = db.query(Material).filter(Material.id == material_id).first()
    if not material:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="材料不存在"
        )
    return material


# 生成函数
async def generate_personal_statement(
    resume_content: str,
    user_info: dict,
    program: SchoolProgram,
    parameters: dict
) -> str:
    """生成个人陈述"""
    word_count = parameters.get("word_count", 800)
    style = parameters.get("style", "academic")

    # 构建prompt
    prompt = f"""
你是一位专业的保研申请文书专家。请根据以下信息生成个人陈述：

学生简历：{resume_content}
学生信息：{user_info}

目标学校项目：{program.name}
学校级别：{program.school.level}
项目亮点：{program.school.highlights}
项目要求：{program.requirements}
偏好背景：{program.preferred_background}

要求：
1. 字数控制在{word_count}字左右
2. 风格：{style}（academic-学术型，practical-实践型，balanced-平衡型）
3. 语气：{program.ps_tone}（formal-正式，warm-真诚，innovative-创新）
4. 突出与学校项目的匹配度
5. 包含具体事例支撑
6. 结构清晰：开头引入 → 学术背景 → 项目经历 → 申请动机 → 未来规划

请直接输出个人陈述内容，不要包含其他说明。
"""

    # TODO: 调用Claude API
    # response = await call_claude_api(prompt)
    # return response

    # 临时返回示例内容
    return f"""【个人陈述 - {word_count}字】

尊敬的招生委员会：

我是一名对{program.name}充满热情的学子。在我的大学生涯中，我始终保持着对知识的渴望和对学术的追求，这使我在学业和科研方面都取得了一定的成绩。

在学术方面，我始终保持优异的成绩，GPA达到{user_info.get('gpa', '3.5')}，并在多门专业课程中名列前茅。这些课程为我打下了坚实的理论基础，也培养了我独立思考和解决问题的能力。

在科研方面，我曾参与{user_info.get('research_exp', '多个科研项目')}，这些经历让我深入了解了科研的过程和方法。特别是在XX项目中，我负责XX部分的工作，通过XX方法，成功完成了XX目标。这段经历不仅提升了我的科研能力，也让我更加明确了自己的学术兴趣。

{program.name}作为{program.school.level}院校，在{program.school.highlights}方面具有显著优势，这正是我所向往的。我相信，我的{user_info.get('strengths', '学术背景和科研经历')}与贵项目的培养目标高度契合。

如果我有幸加入贵项目，我计划在XX方向进行深入研究，希望能够为该领域的发展贡献自己的力量。

感谢您考虑我的申请，期待能有机会在{program.school.name}继续我的学术之旅。

此致
敬礼

申请人：{user_info.get('name', 'XXX')}
"""


async def generate_recommendation_letter(
    resume_content: str,
    user_info: dict,
    program: SchoolProgram,
    parameters: dict
) -> str:
    """生成推荐信"""
    recommender_type = parameters.get("recommender_type", "professor")

    recommender_title = "教授" if recommender_type == "professor" else "导师" if recommender_type == "mentor" else "主管"

    return f"""【推荐信】

尊敬的招生委员会：

我是{user_info.get('recommender_name', 'XXX教授')}，担任{user_info.get('recommender_title', 'XXX学院')}的{recommender_title}。我很荣幸为{user_info.get('name', 'XXX同学')}撰写这封推荐信，支持他申请贵校{program.name}项目。

我与{user_info.get('name', 'XXX同学')}相识于{user_info.get('know_time', 'XX年')}，当时他选修了我的XX课程。在该课程中，他表现出了卓越的学习能力和深入的思考能力，课程成绩名列班级前茅。

在学术研究方面，{user_info.get('name', 'XXX同学')}曾参与我指导的XX研究项目。在这个项目中，他负责XX部分的工作，表现出了出色的研究能力和团队协作精神。特别是在XX问题上，他提出了创新的解决方案，为项目的顺利完成做出了重要贡献。

除了学术能力，{user_info.get('name', 'XXX同学')}还具有良好的品格和强烈的责任感。他乐于助人，经常主动帮助同学解决学习中的困难。在团队合作中，他总是能够积极沟通，协调各方，确保项目的顺利进行。

基于我对{user_info.get('name', 'XXX同学')}的深入了解，我相信他完全有能力胜任贵项目的学习要求。{program.name}作为国内顶尖的项目，能够为他提供更好的发展平台。同时，我也相信他的加入将为贵项目带来新的活力。

我毫无保留地推荐{user_get('name', 'XXX同学')}加入贵项目，并相信他将在未来的学习中取得更加卓越的成绩。

如需更多关于{user_info.get('name', 'XXX同学')}的信息，请随时与我联系。

此致
敬礼

{user_info.get('recommender_name', 'XXX教授')}
{user_info.get('recommender_title', 'XXX学院')}
联系方式：{user_info.get('recommender_contact', 'XXX')}
"""


async def generate_research_plan(
    resume_content: str,
    user_info: dict,
    program: SchoolProgram,
    parameters: dict
) -> str:
    """生成研究计划书"""
    research_type = parameters.get("research_type", "comprehensive")

    return f"""【研究计划书】

一、研究背景与意义

随着XX领域的快速发展，XX问题日益受到关注。{program.name}在该领域具有深厚的研究基础和丰富的学术资源，为学生提供了良好的研究平台。

二、文献综述

近年来，国内外学者在XX领域进行了大量研究。XX等人（202X）提出了XX理论，为该领域的研究奠定了基础。随后，XX等人（202X）在XX方面取得了重要突破。然而，目前仍存在XX问题亟待解决。

三、研究问题

基于上述分析，本计划书拟研究以下核心问题：
1. XX问题的本质是什么？
2. 如何有效地解决XX问题？
3. XX方法在实际应用中的效果如何？

四、研究方法

本研究将采用以下方法：
1. 文献研究法：系统梳理相关文献，明确研究现状
2. 实验研究法：设计实验方案，验证研究假设
3. 案例分析法：选取典型案例进行深入分析
4. 定量分析法：运用统计方法分析数据

五、研究计划

第一学期：完成文献综述，明确研究方向
第二学期：设计实验方案，开始数据收集
第三学期：进行实验研究，分析研究结果
第四学期：撰写研究论文，准备答辩

六、预期成果

1. 发表学术论文1-2篇
2. 提出XX问题的解决方案
3. 为XX领域的发展做出贡献

七、研究基础

在本科阶段，我已经学习过XX、XX等相关课程，具备了扎实的理论基础。同时，我曾参与XX科研项目，积累了初步的研究经验。这些经历为本研究奠定了良好的基础。

八、时间安排

详见研究计划表（略）

九、参考文献

[1] XX. XX研究[J]. XX期刊，202X.
[2] XX. XX理论及其应用[M]. 北京：XX出版社，202X.
...

申请人：{user_info.get('name', 'XXX')}
日期：202X年X月X日
"""
