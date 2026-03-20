'use client';

import { useState } from 'react';
import { FileText, GraduationCap, Sparkles, Download, Upload, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const schools = [
    {
      id: 'nju',
      name: '南京大学',
      level: '985',
      location: '江苏南京',
      programs: [
        { id: 'nju-business', name: '商学院', highlights: ['985院校', 'A+学科', '地理位置优越'], requirements: ['GPA 3.5+', '英语六级500+', '有科研经历者优先'] },
        { id: 'nju-cs', name: '计算机科学与技术系', highlights: ['985院校', 'AI领域领先', '就业前景好'], requirements: ['GPA 3.6+', '英语六级500+', '有编程竞赛加分'] }
      ]
    },
    {
      id: 'fudan',
      name: '复旦大学',
      level: '985',
      location: '上海',
      programs: [
        { id: 'fudan-management', name: '管理学院', highlights: ['顶尖商学院', '国际交流项目', '就业前景好'], requirements: ['GPA 3.6+', '英语六级550+', '有实习经验优先'] },
        { id: 'fudan-cs', name: '计算机学院', highlights: ['数据库领域领先', '人工智能强', '国际影响力大'], requirements: ['GPA 3.6+', '英语六级550+', '有科研或竞赛经历'] }
      ]
    },
    {
      id: 'sjtu',
      name: '上海交通大学',
      level: '985',
      location: '上海',
      programs: [
        { id: 'sjtu-acem', name: '安泰经济与管理学院', highlights: ['全球排名前列', '校友资源丰富', '研究实力强'], requirements: ['GPA 3.7+', '英语六级550+', '有实习和研究经历'] }
      ]
    },
    {
      id: 'tsinghua',
      name: '清华大学',
      level: '985',
      location: '北京',
      programs: [
        { id: 'tsinghua-finance', name: '五道口金融学院', highlights: ['国内顶尖', '金融领袖摇篮', '资源极其丰富'], requirements: ['GPA 3.8+', '英语六级600+', '需有突出成就'] }
      ]
    },
    {
      id: 'pku',
      name: '北京大学',
      level: '985',
      location: '北京',
      programs: [
        { id: 'pku-econ', name: '经济学院', highlights: ['国内顶尖', '学术自由', '人文底蕴深厚'], requirements: ['GPA 3.7+', '英语六级550+', '综合素质高'] }
      ]
    }
  ];

  const materialTypes = [
    { id: 'ps', name: '个人陈述', wordCounts: ['300字', '500字', '800字', '1000字'] },
    { id: 'recommendation', name: '推荐信', types: ['教授', '导师', '实习主管'] },
    { id: 'research', name: '研究计划书', types: ['学术型', '应用型', '综合型'] },
    { id: 'ppt', name: '个人介绍PPT', styles: ['简约风格', '学术风格', '创意风格'] }
  ];

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const generateMaterials = async () => {
    if (!uploadedFile) {
      alert('请先上传简历');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent({});

    // 模拟AI生成
    for (const material of selectedMaterials) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGeneratedContent(prev => ({
        ...prev,
        [material]: generateSampleContent(material, selectedSchool!, selectedProgram!)
      }));
    }

    setIsGenerating(false);
  };

  const generateSampleContent = (materialType: string, schoolId: string, programId: string) => {
    const school = schools.find(s => s.id === schoolId);
    const program = school?.programs.find(p => p.id === programId);

    switch (materialType) {
      case 'ps':
        return `【个人陈述 - 800字】

尊敬的${school?.name}${program?.name}招生委员会：

您好！我是一名对${program?.name}充满热情的学子。在大学四年的学习中，我始终保持优异的成绩，GPA达到3.6，并在多门专业课程中名列前茅。这些课程为我打下了坚实的理论基础，也培养了我独立思考和解决问题的能力。

在科研方面，我曾参与人工智能相关的研究项目，负责数据分析和模型优化工作。这段经历让我深入了解了科研的过程和方法，也让我更加明确了自己的学术兴趣——在AI领域深入研究。

${school?.name}${program?.name}作为${school?.level}院校，在${program?.highlights.join('、')}方面具有显著优势，这正是我所向往的。我相信我的学术背景和科研经历与贵项目的培养目标高度契合。

如果我有幸加入贵项目，我计划在人工智能与交叉学科应用方向进行深入研究，希望能够为该领域的发展贡献自己的力量。

感谢您考虑我的申请！

申请人：张三`;

      case 'recommendation':
        return `【推荐信】

尊敬的招生委员会：

我是张三同学的导师李教授，很荣幸为张三同学撰写这封推荐信，支持他申请贵校${school?.name}${program?.name}项目。

我与张三同学相识于2023年，当时他选修我的《机器学习》课程。在该课程中，他表现出了卓越的学习能力和深入的思考能力，课程成绩为95分，名列班级前5%。

在科研方面，张三同学曾参与我指导的AI图像识别研究项目。在这个项目中，他负责模型架构设计和性能优化，表现出了出色的研究能力和创新精神。特别是在模型轻量化问题上，他提出了创新的剪枝算法，使模型大小减少50%，准确率仅下降1%，为项目的顺利完成做出了重要贡献。

除了学术能力，张三同学还具有良好的品格和强烈的责任感。他乐于助人，经常主动帮助同学解决学习中的困难。在团队合作中，他总是能够积极沟通，协调各方，确保项目的顺利进行。

基于我对张三同学的深入了解，我相信他完全有能力胜任贵项目的学习要求。${school?.name}${program?.name}作为国内顶尖的项目，能够为他提供更好的发展平台。

我毫无保留地推荐张三同学加入贵项目，并相信他将在未来的学习中取得更加卓越的成绩。

李教授
计算机学院
联系方式：li.prof@university.edu.cn`;

      case 'research':
        return `【研究计划书】

一、研究背景与意义

随着人工智能技术的快速发展，深度学习在计算机视觉、自然语言处理等领域取得了突破性进展。然而，现有的模型在可解释性、计算效率等方面仍存在挑战。${school?.name}${program?.name}在该领域具有深厚的研究基础和丰富的学术资源，为学生提供了良好的研究平台。

二、文献综述

近年来，国内外学者在深度学习优化领域进行了大量研究。LeCun等人（2015）提出了卷积神经网络架构，为深度学习的发展奠定了基础。随后，Vaswani等人（2017）提出了Transformer架构，在自然语言处理领域取得了革命性突破。然而，目前仍存在模型可解释性差、计算资源需求高等问题亟待解决。

三、研究问题

基于上述分析，本计划书拟研究以下核心问题：
1. 如何提高深度学习模型的可解释性？
2. 如何在保持性能的同时降低模型复杂度？
3. 如何将轻量化模型应用于边缘计算场景？

四、研究方法

本研究将采用以下方法：
1. 文献研究法：系统梳理相关文献，明确研究现状
2. 实验研究法：设计对比实验，验证研究假设
3. 模型分析法：深入分析模型内部结构和工作机制
4. 案例验证法：在实际应用场景中验证模型效果

五、研究计划

第一学期：完成文献综述，构建基础模型框架
第二学期：设计实验方案，开展模型优化研究
第三学期：进行实验验证，分析研究结果
第四学期：撰写研究论文，准备毕业答辩

六、预期成果

1. 发表高水平学术论文1-2篇
2. 提出可解释深度学习的新方法
3. 开发轻量化模型原型系统
4. 为AI领域的发展做出理论贡献

七、研究基础

在本科阶段，我已经学习过机器学习、深度学习、计算机视觉等相关课程，具备了扎实的理论基础。同时，我曾参与AI相关科研项目，掌握了PyTorch、TensorFlow等深度学习框架，积累了初步的研究经验。这些经历为本研究奠定了良好的基础。

申请人：张三
日期：2026年3月20日`;

      case 'ppt':
        return `【个人介绍PPT内容大纲】

第1页：封面
- 标题：张三的个人介绍
- 副标题：申请${school?.name}${program?.name}
- 照片和基本信息

第2页：教育背景
- 本科学校：示例大学
- 专业：计算机科学与技术
- GPA：3.6/4.0
- 主修课程：机器学习、深度学习、数据结构与算法等

第3页：学术成就
- 专业排名：前10%
- 获得奖学金：国家奖学金（2024）、校级一等奖学金（2023、2024）
- 英语水平：CET-6 520分，IELTS 7.0

第4页：科研经历
- 项目一：AI图像识别系统
  - 角色：核心开发者
  - 成果：发表论文一篇，系统上线运行
- 项目二：推荐算法优化
  - 角色：算法负责人
  - 成果：点击率提升15%

第5页：竞赛与实习
- 竞赛：ACM程序设计竞赛省级一等奖、数学建模竞赛国家二等奖
- 实习：某互联网公司AI实验室，参与推荐系统开发

第6页：个人技能
- 编程语言：Python、C++、Java
- 框架：PyTorch、TensorFlow、Flask
- 工具：Git、Docker、Linux
- 语言：中文（母语）、英语（流利）

第7页：申请动机
- 为什么选择${school?.name}${program?.name}？
  - ${program?.highlights[0]}
  - 优秀的研究团队和导师
  - 良好的学术氛围

第8页：未来规划
- 短期目标：深入研究XX领域，发表高质量论文
- 长期目标：成为AI领域的专业研究者
- 职业规划：进入知名高校或科技公司从事AI研发

第9页：感谢
- 感谢您的审阅
- 期待能加入${school?.name}${program?.name}
- 联系方式：zhangsan@email.com，手机：13800138000

第10页：Q&A
- 欢迎提问
- 谢谢大家！`;

      default:
        return '';
    }
  };

  const downloadContent = (materialType: string) => {
    const content = generatedContent[materialType];
    if (!content) return;

    const materialName = materialTypes.find(m => m.id === materialType)?.name || materialType;
    const filename = `${materialName}_${selectedSchool}.txt`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">保研申请助手</h1>
              <p className="text-xs text-gray-500">智能生成申请材料</p>
            </div>
          </div>
          <nav className="flex gap-6">
            <button
              onClick={() => setActiveTab('home')}
              className={`font-medium ${activeTab === 'home' ? 'text-indigo-600' : 'text-gray-600'}`}
            >
              首页
            </button>
            <button
              onClick={() => setActiveTab('generate')}
              className={`font-medium ${activeTab === 'generate' ? 'text-indigo-600' : 'text-gray-600'}`}
            >
              生成材料
            </button>
            <button
              onClick={() => setActiveTab('schools')}
              className={`font-medium ${activeTab === 'schools' ? 'text-indigo-600' : 'text-gray-600'}`}
            >
              学校库
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="text-center">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                智能生成保研申请材料
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                上传简历，选择目标学校，AI自动生成个人陈述、推荐信、研究计划书等专业申请材料
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <FeatureCard
                icon={<Upload className="w-6 h-6" />}
                title="上传材料"
                description="上传简历、成绩单、获奖证书等基础材料"
                color="indigo"
              />
              <FeatureCard
                icon={<GraduationCap className="w-6 h-6" />}
                title="选择学校"
                description="从热门学校库中选择目标项目"
                color="blue"
              />
              <FeatureCard
                icon={<Sparkles className="w-6 h-6" />}
                title="智能生成"
                description="AI自动生成PS、推荐信、研究计划等"
                color="purple"
              />
              <FeatureCard
                icon={<Download className="w-6 h-6" />}
                title="一键下载"
                description="自动整合，下载完整申请材料包"
                color="green"
              />
            </div>

            <button
              onClick={() => setActiveTab('generate')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
            >
              开始使用
            </button>
          </div>
        )}

        {activeTab === 'generate' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* 文件上传 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-indigo-600" />
                  第一步：上传简历
                </h3>
                <div
                  className={`border-2 rounded-lg p-8 text-center transition-colors ${
                    uploadedFile
                      ? 'border-green-500 bg-green-50'
                      : 'border-dashed border-gray-300 hover:border-indigo-500'
                  }`}
                >
                  {uploadedFile ? (
                    <div className="text-green-600">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-3" />
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">点击或拖拽文件到此处</p>
                      <p className="text-gray-400 text-sm mb-4">支持 PDF、Word、图片格式</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors"
                      >
                        选择文件
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* 选择学校 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  第二步：选择学校项目
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">选择学校</label>
                    <select
                      value={selectedSchool || ''}
                      onChange={(e) => {
                        setSelectedSchool(e.target.value);
                        setSelectedProgram(null);
                      }}
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">请选择学校</option>
                      {schools.map(school => (
                        <option key={school.id} value={school.id}>{school.name}</option>
                      ))}
                    </select>
                  </div>

                  {selectedSchool && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">选择项目</label>
                      <select
                        value={selectedProgram || ''}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">请选择项目</option>
                        {schools.find(s => s.id === selectedSchool)?.programs.map(program => (
                          <option key={program.id} value={program.id}>{program.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedProgram && (() => {
                    const school = schools.find(s => s.id === selectedSchool);
                    const program = school?.programs.find(p => p.id === selectedProgram);
                    if (!program) return null;
                    return (
                      <div className="bg-gray-50 rounded-lg p-4 mt-4">
                        <h4 className="font-semibold text-sm mb-2">{program.name}信息</h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">项目亮点：</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {program.highlights.map(h => (
                                <span key={h} className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-xs">
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">申请要求：</span>
                            <ul className="mt-1 space-y-1">
                              {program.requirements.map(req => (
                                <li key={req} className="text-gray-700">• {req}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* 选择材料类型 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  第三步：选择需要生成的材料
                </h3>
                <div className="space-y-3">
                  {materialTypes.map(material => (
                    <MaterialCard
                      key={material.id}
                      id={material.id}
                      name={material.name}
                      selected={selectedMaterials.includes(material.id)}
                      onToggle={() => toggleMaterial(material.id)}
                    >
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-2">
                          {(material.wordCounts || material.types || material.styles)?.map(option => (
                            <span
                              key={option}
                              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                            >
                              {option}
                            </span>
                          ))}
                        </div>
                      </div>
                    </MaterialCard>
                  ))}
                </div>
              </div>

              {/* 生成按钮 */}
              <button
                onClick={generateMaterials}
                disabled={!uploadedFile || !selectedSchool || !selectedProgram || selectedMaterials.length === 0 || isGenerating}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    开始生成材料
                  </>
                )}
              </button>
            </div>

            {/* 右侧：生成的材料 */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-indigo-600" />
                  生成的材料
                </h3>

                {generatedContent && Object.keys(generatedContent).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(generatedContent).map(([materialId, content]) => {
                      const materialName = materialTypes.find(m => m.id === materialId)?.name || materialId;
                      return (
                        <div key={materialId} className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-2 flex items-center justify-between">
                            <span className="font-medium">{materialName}</span>
                            <button
                              onClick={() => downloadContent(materialId)}
                              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                            >
                              下载
                            </button>
                          </div>
                          <div className="p-4 max-h-64 overflow-y-auto">
                            <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans">
                              {content}
                            </pre>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>生成的材料将显示在这里</p>
                  </div>
                )}

                {generatedContent && Object.keys(generatedContent).length > 0 && (
                  <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    下载全部材料
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schools' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">热门学校项目库</h2>
            <div className="space-y-6">
              {schools.map(school => (
                <div key={school.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xl">{school.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-xs font-medium">
                          {school.level}
                        </span>
                        <span className="text-sm text-gray-600">{school.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {school.programs.map(program => (
                      <div key={program.id} className="border-l-4 border-indigo-500 pl-4">
                        <h4 className="font-semibold text-lg">{program.name}</h4>
                        <div className="mt-3 grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-2">项目亮点：</p>
                            <div className="flex flex-wrap gap-1">
                              {program.highlights.map(h => (
                                <span key={h} className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-2">申请要求：</p>
                            <ul className="space-y-1">
                              {program.requirements.map(req => (
                                <li key={req} className="text-gray-700">• {req}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  const colorClasses = {
    indigo: 'hover:shadow-indigo-200',
    blue: 'hover:shadow-blue-200',
    purple: 'hover:shadow-purple-200',
    green: 'hover:shadow-green-200',
  };
  const textColors = {
    indigo: 'text-indigo-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
  };

  return (
    <div className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className={`flex justify-center mb-4 ${textColors[color as keyof typeof textColors]}`}>{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function MaterialCard({ id, name, selected, onToggle, children }: { id: string; name: string; selected: boolean; onToggle: () => void; children?: React.ReactNode }) {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${selected ? 'ring-2 ring-indigo-600 bg-indigo-50' : 'hover:border-indigo-500'}`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggle}
            className="w-5 h-5 text-indigo-600"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="font-semibold">{name}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
