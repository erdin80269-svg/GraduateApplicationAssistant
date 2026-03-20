"""
初始化数据库数据
运行此脚本可以创建一些示例学校和项目数据
"""
from sqlalchemy.orm import Session
from app.database import engine, Base, SessionLocal
from app.models import School, SchoolProgram, MaterialTemplate
from app.models.user import User
from passlib.context import CryptContext


def init_db():
    """初始化数据库"""
    # 创建所有表
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    try:
        # 检查是否已有数据
        if db.query(School).first():
            print("数据库已有数据，跳过初始化")
            return

        # 创建示例用户
        demo_user = User(
            username="demo",
            email="demo@example.com",
            hashed_password=pwd_context.hash("demo123"),
            name="张三",
            phone="13800138000",
            university="示例大学",
            major="计算机科学与技术",
            gpa="3.6",
            is_active=True
        )
        db.add(demo_user)

        # 创建示例学校
        schools_data = [
            {
                "name": "南京大学",
                "level": "985",
                "location": "江苏南京",
                "website": "https://www.nju.edu.cn",
                "highlights": ["985院校", "A+学科", "地理位置优越", "历史悠久"]
            },
            {
                "name": "复旦大学",
                "level": "985",
                "location": "上海",
                "website": "https://www.fudan.edu.cn",
                "highlights": ["985院校", "顶尖学府", "国际交流项目", "就业前景好"]
            },
            {
                "name": "上海交通大学",
                "level": "985",
                "location": "上海",
                "website": "https://www.sjtu.edu.cn",
                "highlights": ["985院校", "顶尖理工科", "校友资源丰富", "研究实力强"]
            },
            {
                "name": "清华大学",
                "level": "985",
                "location": "北京",
                "website": "https://www.tsinghua.edu.cn",
                "highlights": ["国内顶尖", "国际知名", "资源丰富", "就业前景极佳"]
            },
            {
                "name": "北京大学",
                "level": "985",
                "location": "北京",
                "website": "https://www.pku.edu.cn",
                "highlights": ["国内顶尖", "学术自由", "历史悠久", "人文底蕴深厚"]
            }
        ]

        created_schools = []
        for school_data in schools_data:
            school = School(**school_data)
            db.add(school)
            db.flush()  # 获取ID
            created_schools.append(school)

        # 为南京大学创建项目
        nju_programs = [
            {
                "school_id": created_schools[0].id,
                "name": "商学院",
                "description": "南京大学商学院是国内领先的商学院之一，拥有优秀的师资力量和科研平台。",
                "requirements": ["GPA 3.5+", "英语六级500+", "有科研经历者优先", "有实习经验加分"],
                "preferred_background": ["经济管理类", "数学统计类", "计算机类"],
                "material_order": ["申请表", "个人陈述", "推荐信", "成绩单", "六级成绩", "竞赛奖项"],
                "ps_style": "balanced",
                "ps_tone": "formal"
            },
            {
                "school_id": created_schools[0].id,
                "name": "计算机科学与技术系",
                "description": "南京大学计算机系在人工智能、软件工程等领域处于国内领先地位。",
                "requirements": ["GPA 3.6+", "英语六级500+", "有编程竞赛经历加分", "有科研论文加分"],
                "preferred_background": ["计算机类", "数学类", "电子信息类"],
                "material_order": ["申请表", "个人陈述", "推荐信", "成绩单", "六级成绩", "竞赛证书", "科研论文"],
                "ps_style": "academic",
                "ps_tone": "formal"
            }
        ]

        for program_data in nju_programs:
            program = SchoolProgram(**program_data)
            db.add(program)

        # 为复旦大学创建项目
        fudan_programs = [
            {
                "school_id": created_schools[1].id,
                "name": "管理学院",
                "description": "复旦大学管理学院是中国顶尖的商学院之一，享有极高的声誉。",
                "requirements": ["GPA 3.6+", "英语六级550+", "有实习经验者优先", "有领导经历加分"],
                "preferred_background": ["经济管理类", "数学统计类"],
                "material_order": ["申请表", "个人陈述", "推荐信", "成绩单", "六级成绩", "实习证明"],
                "ps_style": "balanced",
                "ps_tone": "warm"
            },
            {
                "school_id": created_schools[1].id,
                "name": "计算机学院",
                "description": "复旦大学计算机学院在数据库、人工智能等领域具有国际影响力。",
                "requirements": ["GPA 3.6+", "英语六级550+", "有科研或竞赛经历"],
                "preferred_background": ["计算机类", "数学类"],
                "material_order": ["申请表", "个人陈述", "推荐信", "成绩单", "六级成绩", "成果证明"],
                "ps_style": "academic",
                "ps_tone": "formal"
            }
        ]

        for program_data in fudan_programs:
            program = SchoolProgram(**program_data)
            db.add(program)

        # 为上海交通大学创建项目
        sjtu_programs = [
            {
                "school_id": created_schools[2].id,
                "name": "安泰经济与管理学院",
                "description": "上海交大安泰经管学院是国内顶尖的商学院之一，在全球排名前列。",
                "requirements": ["GPA 3.7+", "英语六级550+", "有实习经验", "有研究经历加分"],
                "preferred_background": ["经济管理类", "数学统计类", "工程类"],
                "material_order": ["申请表", "个人陈述", "推荐信", "成绩单", "六级成绩", "获奖证书"],
                "ps_style": "balanced",
                "ps_tone": "formal"
            }
        ]

        for program_data in sjtu_programs:
            program = SchoolProgram(**program_data)
            db.add(program)

        db.commit()

        print("✅ 数据库初始化完成！")
        print(f"✅ 创建了 {len(created_schools)} 所学校")
        print(f"✅ 创建了 5 个学院项目")
        print(f"✅ 创建了演示用户: demo / demo123")

    except Exception as e:
        db.rollback()
        print(f"❌ 初始化失败: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    init_db()
