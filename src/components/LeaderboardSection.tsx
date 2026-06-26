import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Award, DollarSign, Calendar } from 'lucide-react';
import { Actor } from '../types';

interface LeaderboardSectionProps {
  actors: Actor[];
  onSelectActor: (actor: Actor) => void;
}

type SortField = 'total' | 'monthly' | 'yearly';

export default function LeaderboardSection({ actors, onSelectActor }: LeaderboardSectionProps) {
  const [sortField, setSortField] = useState<SortField>('total');

  // Sorted list based on selected field
  const sortedActors = useMemo(() => {
    return [...actors].sort((a, b) => {
      const valA = a.earnings[sortField];
      const valB = b.earnings[sortField];
      return valB - valA;
    });
  }, [actors, sortField]);

  // Spotlight Actor (Top 1)
  const top1Actor = sortedActors[0];
  // Sublist (Rank 2 to 8)
  const listActors = sortedActors.slice(1);

  // Helper to render trend icon
  const renderTrend = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return (
          <span className="flex items-center gap-0.5 text-emerald-400 font-mono text-xs">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+15%</span>
          </span>
        );
      case 'down':
        return (
          <span className="flex items-center gap-0.5 text-rose-500 font-mono text-xs">
            <TrendingDown className="h-3.5 w-3.5" />
            <span>-3%</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-0.5 text-zinc-500 font-mono text-xs">
            <Minus className="h-3.5 w-3.5" />
            <span>持平</span>
          </span>
        );
    }
  };

  const formatPrice = (value: number) => {
    return `￥${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <section className="bg-[#0F0F0F] py-16 border-b border-white/5" id="leaderboard-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Sort tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" id="leaderboard-header">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2 font-display">
              <Trophy className="h-4 w-4" />
              <span>平台商业收益指数榜</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              肖像资产确权收益排行
            </h3>
            <p className="text-sm text-[#AFAFAF] mt-1">
              由实拍动捕、数字人授权与影视短剧等全谱系合作项目结算单自动统计生成，公开透明
            </p>
          </div>

          {/* Sort Buttons */}
          <div className="inline-flex p-1 bg-white/5 rounded-2xl border border-white/10" id="leaderboard-sort-tabs">
            <button
              onClick={() => setSortField('total')}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                sortField === 'total'
                  ? 'bg-[#E3B341] text-black shadow-sm'
                  : 'text-[#AFAFAF] hover:text-white'
              }`}
            >
              <Award className="h-3.5 w-3.5" />
              <span>累计授权总额</span>
            </button>
            <button
              onClick={() => setSortField('monthly')}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                sortField === 'monthly'
                  ? 'bg-[#E3B341] text-black shadow-sm'
                  : 'text-[#AFAFAF] hover:text-white'
              }`}
            >
              <DollarSign className="h-3.5 w-3.5" />
              <span>本月授权收益</span>
            </button>
            <button
              onClick={() => setSortField('yearly')}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                sortField === 'yearly'
                  ? 'bg-[#E3B341] text-black shadow-sm'
                  : 'text-[#AFAFAF] hover:text-white'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>年度授权收益</span>
            </button>
          </div>
        </div>

        {/* Dynamic Leaderboard Layout: Spotlight Top 1 + list Top 2-10 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="leaderboard-main-grid">
          
          {/* LEFT: Spotlight Rank 1 */}
          {top1Actor && (
            <motion.div
              layoutId="leaderboard-spotlight"
              className="lg:col-span-5 bg-gradient-to-b from-[#1A1A1A] to-[#111111] rounded-3xl border border-white/5 overflow-hidden relative shadow-[0_8px_32px_rgba(227,179,65,0.08)] flex flex-col cursor-pointer hover:border-[#E3B341]/40 transition-all duration-300 group"
              onClick={() => onSelectActor(top1Actor)}
              id="leaderboard-top1-spotlight"
            >
              {/* Golden Crown Ribbon */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-300 text-black text-xs font-black px-3 py-1.5 rounded-xl shadow-md font-display">
                <Crown className="h-3.5 w-3.5 fill-black" />
                <span>TOP 1 收益之星</span>
              </div>

              {/* Spotlight Portrait with nice proportions */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1A1A1A]">
                <img
                  src={top1Actor.coverPhoto || top1Actor.avatar}
                  alt={top1Actor.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
              </div>

              {/* Content Description */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors font-sans">
                      {top1Actor.name}
                    </h4>
                    {renderTrend(top1Actor.earnings.trend)}
                  </div>
                  
                  {/* Location & Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {top1Actor.tags.slice(0, 3).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-display"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[#AFAFAF] text-xs mt-4 leading-relaxed font-sans">
                    {top1Actor.bio}
                  </p>
                </div>

                {/* Performance details */}
                <div className="mt-8 pt-5 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-display">
                      {sortField === 'total' ? '累计数字收益' : sortField === 'monthly' ? '月度结算额' : '年度授权总金额'}
                    </span>
                    <p className="text-lg font-black text-amber-400 mt-1 font-display">
                      {formatPrice(top1Actor.earnings[sortField])}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-display">数字授权单价</span>
                    <p className="text-sm font-bold text-white mt-1.5 font-display">
                      ￥{top1Actor.licensingPrice.toLocaleString()}/年
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* RIGHT: Rank 2-8 Rows List */}
          <div className="lg:col-span-7 flex flex-col gap-3" id="leaderboard-rank-list">
            <AnimatePresence mode="popLayout">
              {listActors.map((actor, idx) => {
                const rank = idx + 2;
                // Calculate proportional bar percentage based on maximum (Top 1)
                const maxVal = top1Actor.earnings[sortField];
                const currentVal = actor.earnings[sortField];
                const percentage = maxVal > 0 ? (currentVal / maxVal) * 100 : 0;

                return (
                  <motion.div
                    key={actor.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    onClick={() => onSelectActor(actor)}
                    className="flex items-center justify-between bg-[#1A1A1A] hover:bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 cursor-pointer group transition-all"
                    id={`leaderboard-row-${actor.id}`}
                  >
                    {/* Left Rank and Avatar details */}
                    <div className="flex items-center gap-4 flex-1 pr-6">
                      {/* Rank Indicator */}
                      <div className="w-8 flex justify-center text-sm font-black font-display" id={`rank-number-${rank}`}>
                        {rank === 2 ? (
                          <span className="text-zinc-300 flex items-center justify-center bg-white/10 rounded-full h-6 w-6 border border-white/5 shadow-sm">2</span>
                        ) : rank === 3 ? (
                          <span className="text-amber-600 flex items-center justify-center bg-amber-500/10 rounded-full h-6 w-6 border border-amber-500/20 shadow-sm">3</span>
                        ) : (
                          <span className="text-zinc-600">{rank}</span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-zinc-900 shadow-inner">
                        <img
                          src={actor.avatar}
                          alt={actor.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Name, Tagline & Progress Bar */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <h5 className="text-sm font-bold text-white group-hover:text-[#E3B341] transition-colors truncate font-sans">
                            {actor.name.split(' ')[0]}
                          </h5>
                          <span className="text-[9px] text-zinc-500 font-display truncate">
                            {actor.tags[0]}
                          </span>
                        </div>

                        {/* Earnings Progress Bar */}
                        <div className="w-full bg-black/30 h-1.5 rounded-full mt-2 overflow-hidden relative" id={`progress-bar-${actor.id}`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8 }}
                            className="bg-gradient-to-r from-amber-500/80 to-amber-300 h-full rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Side Earnings */}
                    <div className="text-right flex flex-col items-end gap-1">
                      <p className="text-xs font-extrabold text-white font-display">
                        {formatPrice(actor.earnings[sortField])}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-[#AFAFAF] font-display">月增速</span>
                        {renderTrend(actor.earnings.trend)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
