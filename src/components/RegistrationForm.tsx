import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, FileText, Upload, Sparkles, Send } from 'lucide-react';
import { Application } from '../types';

interface RegistrationFormProps {
  onClose: () => void;
  onRegister: (app: Omit<Application, 'id' | 'status' | 'date'>) => void;
}

export default function RegistrationForm({ onClose, onRegister }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'female' as 'male' | 'female',
    region: 'mainland',
    height: 168,
    weight: 48,
    measurements: '84-60-88',
    location: '浙江横店',
    tagsInput: '古装仙侠, 短剧女神',
    cooperationIntent: [] as string[],
    videoUrl: '',
    bio: '',
    avatarUrl: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const intents = ['可接短剧', '商业代言', 'AI训练', '平面拍摄', '游戏脸型建模', '短视频定制'];

  const handleIntentChange = (intent: string) => {
    if (formData.cooperationIntent.includes(intent)) {
      setFormData({
        ...formData,
        cooperationIntent: formData.cooperationIntent.filter((item) => item !== intent),
      });
    } else {
      setFormData({
        ...formData,
        cooperationIntent: [...formData.cooperationIntent, intent],
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    // Split tags
    const tagsArray = formData.tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');

    // Set a premium random portrait from Unsplash if they didn't provide any, so that it looks incredibly authentic!
    const defaultAvatar = formData.avatarUrl || (
      formData.gender === 'female' 
        ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80"
    );

    onRegister({
      name: formData.name,
      gender: formData.gender,
      region: formData.region,
      height: Number(formData.height),
      weight: Number(formData.weight),
      location: formData.location,
      tags: tagsArray,
      cooperationIntent: formData.cooperationIntent.length > 0 ? formData.cooperationIntent : ['可接短剧', '平面拍摄'],
      avatar: defaultAvatar,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="registration-form-overlay">
      {/* Background Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative bg-zinc-950 border border-zinc-800/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 p-6 sm:p-8"
        id="registration-modal-card"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-900 border border-zinc-900 text-zinc-500 hover:text-white transition-all"
          id="btn-close-register"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center" id="registration-success">
            <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 animate-pulse" />
            </div>
            <h4 className="text-lg font-black text-white">申请加入DOUJU片库提交成功！</h4>
            <p className="text-xs text-zinc-500 mt-2 max-w-sm mx-auto leading-relaxed">
              您的档案已经自动创建并提交平台数字版权局。我们将对您的姓名、独家关系进行数字验证。请前往“个人主页”查看状态。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" id="form-registration">
            {/* Header Title */}
            <div className="border-b border-zinc-900 pb-4 mb-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>REAL PORTRAIT VERIFICATION</span>
              </div>
              <h3 className="text-xl font-bold text-white">申请演员肖像数字确权入库</h3>
              <p className="text-xs text-zinc-500 mt-1">
                请输入您的真实职业档案，完成入库并实现数字化安全授权
              </p>
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">真实姓名/艺名 <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="如: 楚霸总、林初恋"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E3B341]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">主要常驻工作地 <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="如: 浙江横店、上海、北京"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E3B341]"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">性别 <span className="text-rose-500">*</span></label>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'male' })}
                    className={`py-2 rounded-xl border font-semibold ${
                      formData.gender === 'male'
                        ? 'bg-[#E3B341] text-black border-amber-500'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    男演员 / 模特
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: 'female' })}
                    className={`py-2 rounded-xl border font-semibold ${
                      formData.gender === 'female'
                        ? 'bg-[#E3B341] text-black border-amber-500'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    女演员 / 模特
                  </button>
                </div>
              </div>

              {/* Region */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">所属地区 <span className="text-rose-500">*</span></label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-[#E3B341]"
                >
                  <option value="mainland">大陆常驻</option>
                  <option value="hongkong_taiwan">港澳台常驻</option>
                  <option value="overseas">海外常驻</option>
                </select>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:col-span-2">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-medium">身高 (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-medium">体重 (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-medium">三围尺寸 (选填)</label>
                  <input
                    type="text"
                    placeholder="如: 84-60-88"
                    value={formData.measurements}
                    onChange={(e) => setFormData({ ...formData, measurements: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Tags Input */}
              <div className="sm:col-span-2">
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">自荐分类标签 (英文或中文逗号隔开)</label>
                <input
                  type="text"
                  placeholder="如: 古装美男, 低沉烟嗓, 常驻横店"
                  value={formData.tagsInput}
                  onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1"
                />
              </div>

              {/* Photo Input URL */}
              <div className="sm:col-span-2">
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">形象照/头像图片链接 (选填，不填则默认随机生成精品头像)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1"
                />
              </div>

              {/* Cooperation checkboxes */}
              <div className="sm:col-span-2">
                <label className="block text-xs text-zinc-400 mb-2 font-medium">意向合作类型 (可多选)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {intents.map((intent) => {
                    const isChecked = formData.cooperationIntent.includes(intent);
                    return (
                      <button
                        key={intent}
                        type="button"
                        onClick={() => handleIntentChange(intent)}
                        className={`py-2 px-3 text-left rounded-xl border text-[11px] font-semibold flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-amber-500/10 text-[#E3B341] border-[#E3B341]'
                            : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <span>{intent}</span>
                        {isChecked && <div className="h-1.5 w-1.5 rounded-full bg-[#E3B341]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bio/Intro */}
              <div className="sm:col-span-2">
                <label className="block text-xs text-zinc-400 mb-1.5 font-medium">个人代表作 / 简短自荐说明</label>
                <textarea
                  rows={2}
                  placeholder="请输入您的戏路自勉及往期出圈代表作，如：曾在横店参演多部短剧，擅长扮演高雅贵妇、豪爽御姐等..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-[#E3B341] resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-zinc-900 flex justify-end gap-3" id="registration-action-buttons">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-400 hover:text-white transition-all font-semibold"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 bg-[#E3B341] hover:bg-amber-500 text-black px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-[0_4px_12px_rgba(227,179,65,0.15)]"
                id="btn-submit-registration"
              >
                <Send className="h-4 w-4" />
                <span>立即提交入库初审</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
