'use client';

import { useState } from 'react';
import { FileText, GraduationCap, Sparkles, Download, Upload } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">保研申请助手</h1>
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
              材料生成
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
                上传简历，选择目标学校，自动生成个人陈述、推荐信、研究计划书等专业申请材料
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <FeatureCard
                icon={<Upload className="w-6 h-6" />}
                title="上传材料"
                description="上传简历、成绩单、获奖证书等基础材料"
              />
              <FeatureCard
                icon={<GraduationCap className="w-6 h-6" />}
                title="选择学校"
                description="从热门学校库中选择目标项目"
              />
              <FeatureCard
                icon={<Sparkles className="w-6 h-6" />}
                title="智能生成"
                description="AI自动生成PS、推荐信、研究计划等"
              />
              <FeatureCard
                icon={<Download className="w-6 h-6" />}
                title="一键下载"
                description="自动整合，下载完整申请材料包"
              />
            </div>

            <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg">
              开始使用
            </button>
          </div>
        )}

        {activeTab === 'generate' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">生成申请材料</h2>
            <p className="text-gray-600 mb-8">请先上传简历，然后选择目标学校和需要生成的材料类型</p>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-8">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">拖拽文件到此处，或点击上传</p>
              <p className="text-gray-400 text-sm">支持 PDF、Word、图片格式</p>
              <input type="file" className="hidden" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <MaterialCard
                title="个人陈述 (PS)"
                options={['300字', '500字', '800字', '1000字']}
              />
              <MaterialCard
                title="推荐信"
                options={['教授', '导师', '实习主管']}
              />
              <MaterialCard
                title="研究计划书"
                options={['学术型', '应用型', '综合型']}
              />
              <MaterialCard
                title="个人介绍PPT"
                options={['简约风格', '学术风格', '创意风格']}
              />
            </div>

            <button className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              生成材料
            </button>
          </div>
        )}

        {activeTab === 'schools' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">热门学校项目库</h2>
            <div className="space-y-4">
              <SchoolCard
                name="南京大学商学院"
                highlights={['985院校', 'A+学科', '地理位置优越']}
                requirements={['GPA 3.5+', '英语六级500+', '有科研经历者优先']}
              />
              <SchoolCard
                name="复旦大学管理学院"
                highlights={['知名商学院', '国际交流项目', '就业前景好']}
                requirements={['GPA 3.6+', '英语六级550+', '有实习经验者优先']}
              />
              <SchoolCard
                name="上海交通大学安泰经管学院"
                highlights={['顶尖商学院', '校友资源丰富', '研究实力强']}
                requirements={['GPA 3.7+', '英语六级550+', '有科研或实习经历']}
              />
              <SchoolCard
                name="清华大学五道口金融学院"
                highlights={['国内顶尖', '金融领袖摇篮', '资源丰富']}
                requirements={['GPA 3.8+', '英语六级600+', '需有突出成就']}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4 text-indigo-600">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function MaterialCard({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="border rounded-lg p-4 hover:border-indigo-500 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-indigo-100 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function SchoolCard({ name, highlights, requirements }: { name: string; highlights: string[]; requirements: string[] }) {
  return (
    <div className="border rounded-lg p-6 hover:border-indigo-500 transition-colors cursor-pointer">
      <h3 className="font-bold text-xl mb-3">{name}</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">项目亮点：</p>
        <div className="flex flex-wrap gap-2">
          {highlights.map((highlight) => (
            <span key={highlight} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
              {highlight}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">申请要求：</p>
        <ul className="text-sm text-gray-700 space-y-1">
          {requirements.map((req) => (
            <li key={req}>• {req}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
