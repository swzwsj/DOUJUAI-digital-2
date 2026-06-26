import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Heart, CheckCircle, Flame, Send, Star, Compass, MapPin, Sparkles, UserCheck } from 'lucide-react';
import { ContestItem, ContestSignup } from '../types';

interface ContestSectionProps {
  contestItems: ContestItem[];
  onVote: (itemId: string) => void;
  onSignup: (signup: Omit<ContestSignup, 'id' | 'date' | 'status'>) => void;
}

export default function ContestSection({ contestItems, onVote, onSignup }: ContestSectionProps) {
  const [activeTab, setActiveTab] = useState<'results' | 'invite'>('results');
  const [votedItems, setVotedItems] = useState<string[]>([]);
  
  // Tab 2 Sign-up form states
  const [formData, setFormData] = useState({
    actorName: '',
    contact: '',
    roleType: '古装仙侠',
    videoUrl: '',
    experience: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleVoteClick = (itemId: string) => {
    if (votedItems.includes(itemId)) return;
    setVotedItems([...votedItems, itemId]);
    onVote(itemId);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.actorName || !formData.contact) return;
    
    onSignup({
      contestId: "CONTEST-HENGDIAN-2026",
      contestTitle: "首届横店短片演员挑战赛",
      actorName: formData.actorName,
      contact: formData.contact,
      roleType: formData.roleType,
      videoUrl: formData.videoUrl || 'https://example.com/mock-video.mp4',
      experience: formData.experience,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        actorName: '',
        contact: '',
        roleType: '古装仙侠',
        videoUrl: '',
        experience: '',
      });
    }, 4000);
  };

  return (
    <section className="bg-[#0F0F0F] py-10 px-4 lg:px-8 max-w-7xl mx-auto" id="contest-section">
      
      {/* Contest Banner Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-10 mb-10 shadow-xl" id="contest-banner">
        {/* Abstract design */}
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-4 animate-pulse">
            <Flame className="h-3.5 w-3.5" />
            <span>热烈进行中 · 官方扶持计划</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            首届横店短片演员挑战赛
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-3.5 leading-relaxed">
            横店影视城联合DOUJU官方主办。为全行业精选最契合短剧、短片、出海商业剧作的优秀面孔。
            获奖者不仅可获得 <strong className="text-amber-400">￥100,000</strong> 现金大奖，更将直接录入官方精品肖像库，获推100部爆款短剧免费肖像实拍与宣发。
          </p>

          {/* Key prizes or rewards */}
          <div className="grid grid-cols-3 gap-3.5 max-w-md mt-6 pt-6 border-t border-zinc-900 text-center sm:text-left">
            <div>
              <p className="text-[10px] text-zinc-500 font-mono">最高大奖</p>
              <p className="text-sm font-black text-amber-400 font-mono mt-0.5">￥10W 现金</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 font-mono">专属权益</p>
              <p className="text-sm font-black text-white mt-0.5">免费高清模模卡</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 font-mono">官方宣发</p>
              <p className="text-sm font-black text-white mt-0.5">横店百部推介</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-zinc-900 mb-8" id="contest-tabs">
        <button
          onClick={() => setActiveTab('results')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'results'
              ? 'border-[#E3B341] text-[#E3B341]'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
          id="btn-tab-contest-results"
        >
          <Award className="h-4 w-4" />
          <span>COS大赛成果展示</span>
        </button>
        <button
          onClick={() => setActiveTab('invite')}
          className={`px-5 py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'invite'
              ? 'border-[#E3B341] text-[#E3B341]'
              : 'border-transparent text-zinc-500 hover:text-zinc-300'
          }`}
          id="btn-tab-contest-invite"
        >
          <Compass className="h-4 w-4" />
          <span>横店入驻邀请及报名</span>
        </button>
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'results' ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            id="contest-results-panel"
          >
            {contestItems.map((item) => {
              const hasVoted = votedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden hover:border-zinc-800 transition-all shadow-md group"
                  id={`contest-item-card-${item.id}`}
                >
                  {/* Photo area with role */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-zinc-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-[9px] text-zinc-300 px-2 py-0.5 rounded-md">
                      作品分类: {item.category === 'cos' ? 'Cosplay' : item.category === 'short_drama' ? '微电影/短剧' : '现代商业'}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-4" id={`contest-item-content-${item.id}`}>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                    
                    {/* Actor avatar and Name details */}
                    <div className="flex items-center gap-2.5 mt-3.5 pb-3.5 border-b border-zinc-900">
                      <div className="h-7 w-7 rounded-full overflow-hidden bg-zinc-800">
                        <img src={item.actorAvatar} alt={item.actorName} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{item.actorName}</p>
                        <p className="text-[10px] text-zinc-500 truncate">参赛身份 / 扮演: {item.role}</p>
                      </div>
                    </div>

                    {/* Vote section */}
                    <div className="flex items-center justify-between mt-3.5" id={`contest-item-votes-${item.id}`}>
                      <div>
                        <p className="text-[9px] text-zinc-500 font-mono">当前总票数</p>
                        <p className="text-xs font-bold text-white font-mono mt-0.5 flex items-center gap-1">
                          <Flame className="h-3 w-3 text-amber-500" />
                          <span>{item.votes.toLocaleString()}</span>
                        </p>
                      </div>

                      {/* Vote Button */}
                      <button
                        onClick={() => handleVoteClick(item.id)}
                        disabled={hasVoted}
                        className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                          hasVoted
                            ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                            : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white hover:border-zinc-700'
                        }`}
                        id={`btn-vote-${item.id}`}
                      >
                        <Heart className={`h-3.5 w-3.5 ${hasVoted ? 'fill-rose-500 text-rose-500' : 'text-zinc-400 group-hover:text-white'}`} />
                        <span>{hasVoted ? '已投票' : '投一票'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            id="contest-invite-panel"
          >
            {/* Left Col: Explaining Benefits (6 cols) */}
            <div className="lg:col-span-5 space-y-6" id="contest-invite-benefits">
              <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900" id="benefits-residency">
                <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                  <Sparkles className="h-4.5 w-4.5 text-amber-500" />
                  <span>横店实拍入驻专属权益</span>
                </h4>
                
                <ul className="space-y-4 text-xs text-zinc-400">
                  <li className="flex gap-2.5">
                    <div className="p-1 rounded bg-amber-500/10 text-amber-400 shrink-0 h-fit">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">免费实拍形象模卡</strong>
                      <span className="leading-relaxed">签约模特由官方资深摄影团队在横店进行全套多景别形象照、动作短视频实拍，免费交付。</span>
                    </div>
                  </li>
                  <li className="flex gap-2.5">
                    <div className="p-1 rounded bg-amber-500/10 text-amber-400 shrink-0 h-fit">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">全链版权确权</strong>
                      <span className="leading-relaxed">提供合规可靠的肖像授权防伪数字标识，规避由于非法搬运、非法AI训练所带来的维权风险。</span>
                    </div>
                  </li>
                  <li className="flex gap-2.5">
                    <div className="p-1 rounded bg-amber-500/10 text-amber-400 shrink-0 h-fit">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block mb-0.5">爆款影视直推</strong>
                      <span className="leading-relaxed">录入平台优质演员片库后，肖像资产自动入驻横店及各影视公司采购系统，实现零成本曝光接通。</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 text-center" id="benefits-address">
                <p className="text-zinc-500 text-[10px] font-mono uppercase">线下服务中心</p>
                <p className="text-sm font-bold text-white mt-1">横店影视产业实验区 · DOUJU数字中心</p>
                <div className="flex items-center gap-1 text-[11px] text-zinc-400 justify-center mt-2.5">
                  <MapPin className="h-3.5 w-3.5 text-[#E3B341]" />
                  <span>浙江省东阳市横店镇万盛北街18号</span>
                </div>
              </div>
            </div>

            {/* Right Col: Instant Registration Form (7 cols) */}
            <div className="lg:col-span-7 bg-zinc-950 p-6 rounded-2xl border border-zinc-900" id="contest-registration-form-container">
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-amber-500" />
                <span>立即在线申请报名 / 入驻邀请</span>
              </h4>
              <p className="text-xs text-zinc-500 mb-6">
                填写基本联络信息，初审通过后工作人员将在24小时内联系您沟通实拍和协议录入
              </p>

              {isSubmitted ? (
                <div className="py-12 text-center" id="signup-success">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 animate-pulse" />
                  </div>
                  <h5 className="text-base font-bold text-white">报名提交成功！</h5>
                  <p className="text-xs text-zinc-500 mt-2 max-w-sm mx-auto leading-relaxed">
                    初核申请已保存至您的“个人中心 - 我的大赛”。官方经纪助理将在24小时内进行电话初核，并帮您安排后续实拍计划！
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4" id="form-contest-signup">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5 font-medium">真实艺名/真实姓名 <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="请输入名字"
                        value={formData.actorName}
                        onChange={(e) => setFormData({ ...formData, actorName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E3B341]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5 font-medium">联系方式 (微信或手机) <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="请输入联络电话"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E3B341]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5 font-medium">理想/擅长角色类型</label>
                    <select
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-1 focus:ring-[#E3B341] appearance-none"
                    >
                      <option value="古装仙侠">古装仙侠 (神仙、豪侠、小生)</option>
                      <option value="都市职场">都市职场 (精英、高管、总裁)</option>
                      <option value="清纯校园">清纯校园 (初恋、校花、学长)</option>
                      <option value="二次元COS">二次元COS (国漫、游戏二次元角色)</option>
                      <option value="欧美科幻">欧美科幻 (硬汉、动作、出海外模)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5 font-medium">短视频作品或往期作品样片链接 (如有)</label>
                    <input
                      type="url"
                      placeholder="https://example.com/your-video.mp4"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E3B341]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5 font-medium">个人拍摄及表演经验说明 (选填)</label>
                    <textarea
                      rows={3}
                      placeholder="请简要说明您有无影视作品经验、或有无担任过特约演员、平面模特..."
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#E3B341] resize-none"
                    />
                  </div>

                  {/* Submission Row */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 bg-[#E3B341] hover:bg-amber-500 text-black p-3 rounded-xl text-xs font-semibold shadow-[0_4px_12px_rgba(227,179,65,0.15)] transition-all"
                    id="btn-submit-contest-signup"
                  >
                    <Send className="h-4 w-4" />
                    <span>立即提交参赛报名</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
