import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, Cpu, Coins } from 'lucide-react';

interface HeroProps {
  onFindActors: () => void;
  onOpenRegister: () => void;
}

export default function Hero({ onFindActors, onOpenRegister }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#0F0F0F] py-12 sm:py-16" id="hero-section">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#E3B341]/10 via-amber-600/5 to-transparent rounded-full blur-[100px]" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-[#E3B341]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[90px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-amber-400 mb-6 font-display"
          id="hero-badge"
        >
          <Sparkles className="h-3 w-3" />
          <span>全新上线 · AI时代真实演员肖像确权确数平台</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] font-sans"
          id="hero-heading"
        >
          让肖像资产数字化
          <span className="block mt-2 bg-gradient-to-r from-amber-400 via-amber-200 to-white bg-clip-text text-transparent">
            连接商业无限可能
          </span>
        </motion.h2>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#AFAFAF] text-sm sm:text-base max-w-2xl mx-auto mt-6 leading-relaxed"
          id="hero-subheading"
        >
          DOUJU提供真实演员肖像资产一站式合规确权、高保真AI训练集建设、授权确权流与结算服务。全面为微短剧、漫剧、互动影游及AI虚拟人赋能，重构数字生产力。
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          id="hero-cta-container"
        >
          <button
            onClick={onFindActors}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E3B341] hover:bg-amber-500 text-black px-8 py-3 rounded-xl font-bold text-sm shadow-[0_4px_20px_rgba(227,179,65,0.25)] hover:shadow-[0_6px_25px_rgba(227,179,65,0.35)] transition-all duration-300"
            id="btn-find-actors"
          >
            <span>寻找演员</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onOpenRegister}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300"
            id="btn-apply-coop"
          >
            <span>申请合作入库</span>
          </button>
        </motion.div>

        {/* Interactive Stats Grid - Bento Box Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto p-6 rounded-2xl bg-[#1A1A1A] border border-white/5 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          id="hero-stats-grid"
        >
          <div className="text-center p-2 border-r border-white/5" id="stat-actors">
            <div className="flex justify-center mb-2">
              <div className="p-1.5 bg-[#E3B341]/15 rounded-lg text-[#E3B341]">
                <Cpu className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white font-display">1,200+</p>
            <p className="text-xs text-[#AFAFAF] mt-1">签约真人演员</p>
          </div>
          <div className="text-center p-2 md:border-r border-white/5" id="stat-earnings">
            <div className="flex justify-center mb-2">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400">
                <Coins className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white font-display">￥3.2亿</p>
            <p className="text-xs text-[#AFAFAF] mt-1">肖像授权成交额</p>
          </div>
          <div className="text-center p-2 border-r border-white/5" id="stat-protection">
            <div className="flex justify-center mb-2">
              <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white font-display">100%</p>
            <p className="text-xs text-[#AFAFAF] mt-1">版权数字确权率</p>
          </div>
          <div className="text-center p-2" id="stat-speed">
            <div className="flex justify-center mb-2">
              <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-white font-display">24H</p>
            <p className="text-xs text-[#AFAFAF] mt-1">模型驱动极速部署</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
