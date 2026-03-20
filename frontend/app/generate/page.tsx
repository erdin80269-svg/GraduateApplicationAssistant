'use client';

import { useState } from 'react';
import { FileText, Upload, Sparkles, Download, ChevronRight } from 'lucide-react';

export default function GeneratePage() {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [wordCount, setWordCount] = useState('800');
  const [psStyle, setPsStyle] = useState('balanced');
  const [recommenderType, setRecommenderType] = useState('professor');
  const [researchType, setResearchType] = useState('comprehensive');
  const [pptStyle, setPptStyle] = useState('minimal');

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">生成申请材料</h1>

        {/* 步骤指示器 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <StepItem number={1} label="上传材料" status="completed" />
            <ChevronRight className="w-6 h-6 text-gray-400" />
            <StepItem number={2} label="选择学校" status="completed" />
            <ChevronRight className="w-6 h-6 text-gray-400" />
            <StepItem number={3} label="生成文档" status="current" />
            <ChevronRight className="w-6 h-6 text-gray-400" />
            <StepItem number={4} label="下载材料" status="pending" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* 左侧：材料类型选择 */}
          <div className="md:col-span-2 space-y-4">
            <MaterialCard
              title="个人陈述"
              icon={<FileText className="w-5 h-5 text-indigo-600" />}
              selected={selectedMaterials.includes('ps')}
              onToggle={() => toggleMaterial('ps')}
            >
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">字数选择</label>
                  <div className="flex gap-2">
                    {['300', '500', '800', '1000'].map(count => (
                      <button
                        key={count}
                        onClick={() => setWordCount(count)}
                        className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                          wordCount === count
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {count}字
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">风格选择</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'academic', label: '学术型' },
                      { value: 'practical', label: '实践型' },
                      { value: 'balanced', label: '平衡型' }
                    ].map(style => (
                      <button
                        key={style.value}
                        onClick={() => setPsStyle(style.value)}
                        className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                          psStyle === style.value
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </MaterialCard>

            <MaterialCard
              title="推荐信"
              icon={<FileText className="w-5 h-5 text-indigo-600" />}
              selected={selectedMaterials.includes('recommendation_letter')}
              onToggle={() => toggleMaterial('recommendation_letter')}
            >
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">推荐人类型</label>
                <div className="flex gap-2">
                  {[
                    { value: 'professor', label: '教授' },
                    { value: 'mentor', label: '导师' },
                    { value: 'supervisor', label: '实习主管' }
                  ].map(type => (
                    <button
                      key={type.value}
                      onClick={() => setRecommenderType(type.value)}
                      className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                        recommenderType === type.value
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </MaterialCard>

            <MaterialCard
              title="研究计划书"
              icon={<FileText className="w-5 h-5 text-indigo-600" />}
              selected={selectedMaterials.includes('research_plan')}
              onToggle={() => toggleMaterial('research_plan')}
            >
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">研究类型</label>
                <div className="flex gap-2">
                  {[
                    { value: 'academic', label: '学术型' },
                    { value: 'applied', label: '应用型' },
                    { value: 'comprehensive', label: '综合型' }
                  ].map(type => (
                    <button
                      key={type.value}
                      onClick={() => setResearchType(type.value)}
                      className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                        researchType === type.value
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </MaterialCard>

            <MaterialCard
              title="个人介绍PPT"
              icon={<FileText className="w-5 h-5 text-indigo-600" />}
              selected={selectedMaterials.includes('ppt')}
              onToggle={() => toggleMaterial('ppt')}
            >
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">PPT风格</label>
                <div className="flex gap-2">
                  {[
                    { value: 'minimal', label: '简约风格' },
                    { value: 'academic', label: '学术风格' },
                    { value: 'creative', label: '创意风格' }
                  ].map(style => (
                    <button
                      key={style.value}
                      onClick={() => setPptStyle(style.value)}
                      className={`flex-1 py-2 rounded-lg text-sm transition-colors ${
                        pptStyle === style.value
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {style.label}
                    </button>
                    ))}
                  </div>
                </div>
              </MaterialCard>
            </MaterialCard>
          </div>

          {/* 右侧：生成按钮和总结 */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                智能生成
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">目标学校</span>
                  <span className="font-medium">南京大学商学院</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">已选材料</span>
                  <span className="font-medium">{selectedMaterials.length} 份</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">预计耗时</span>
                  <span className="font-medium">{selectedMaterials.length * 2} 分钟</span>
                </div>
              </div>
              <button
                onClick={() => {
                  // TODO: 调用生成API
                  alert(`生成材料: ${selectedMaterials.join(', ')}`);
                }}
                disabled={selectedMaterials.length === 0}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5 inline mr-2" />
                开始生成
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg mb-4">生成说明</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• AI将根据你的简历和学校要求生成内容</li>
                <li>• 生成完成后可预览和编辑</li>
                <li>• 支持重新生成和版本对比</li>
                <li>• 可一键下载所有材料</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MaterialCard({
  title,
  icon,
  selected,
  onToggle,
  children
}: {
  title: string;
  icon: React.ReactNode;
  selected: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all ${
        selected ? 'ring-2 ring-indigo-600' : 'hover:shadow-xl'
      }`}
      onClick={() => !selected && onToggle()}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="w-5 h-5 text-indigo-600"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {children}
    </div>
  );
}

function StepItem({ number, label, status }: { number: number; label: string; status: string }) {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'current':
        return 'text-indigo-600';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
          status === 'completed'
            ? 'bg-green-100 text-green-600'
            : status === 'current'
            ? 'bg-indigo-100 text-indigo-600'
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        {number}
      </div>
      <span className={`font-medium ${getStatusColor()}`}>{label}</span>
    </div>
  );
}
