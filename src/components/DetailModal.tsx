import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, MapPin, Download, CheckCircle, ShieldCheck, Zap, Info, Play, Pause, Heart } from 'lucide-react';
import { Actor } from '../types';

interface DetailModalProps {
  actor: Actor | null;
  onClose: () => void;
  onStartLicensing: (actor: Actor) => void;
  isFavorited: boolean;
  onToggleFavorite: (actorId: string) => void;
}

export default function DetailModal({
  actor,
  onClose,
  onStartLicensing,
  isFavorited,
  onToggleFavorite,
}: DetailModalProps) {
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'video' | 'card'>('photos');
  const [selectedPhoto, setSelectedPhoto] = useState<string>('');
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  if (!actor) return null;

  // Initialize selected photo if empty
  const defaultPhoto = selectedPhoto || actor.avatar;

  const handleDownloadCard = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const getRegionLabel = (region: string) => {
    switch (region) {
      case 'mainland': return '大陆地区';
      case 'hongkong_taiwan': return '中国港台';
      case 'overseas': return '海外地区';
      default: return region;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" id="detail-modal-overlay">
      {/* Background overlay */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-zinc-950 rounded-3xl border border-zinc-800/80 w-full max-w-5xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 grid grid-cols-1 md:grid-cols-12"
        id="detail-modal-container"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all shadow-md"
          id="btn-close-modal"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* LEFT PANEL: Media Section (md:col-span-6) */}
        <div className="md:col-span-6 border-b md:border-b-0 md:border-r border-zinc-900 flex flex-col h-full bg-zinc-950" id="detail-modal-left">
          {/* Main Media Display */}
          <div className="relative aspect-[3/4] w-full bg-black flex items-center justify-center overflow-hidden">
            {activeMediaTab === 'photos' && (
              <img
                src={defaultPhoto}
                alt={actor.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}

            {activeMediaTab === 'video' && (
              <div className="w-full h-full relative">
                <video
                  src={actor.videoSampleUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  id="modal-actor-video"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-black/60 text-white backdrop-blur-sm pointer-events-none">
                    {isVideoPlaying ? (
                      <Pause className="h-6 w-6 fill-white" />
                    ) : (
                      <Play className="h-6 w-6 fill-white ml-0.5" />
                    )}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-2.5 rounded-xl text-center">
                  <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                    [ Demo Player ] 真实5秒肖像视频循环测试样片
                  </p>
                </div>
              </div>
            )}

            {activeMediaTab === 'card' && (
              <div className="w-full h-full relative p-6 bg-gradient-to-tr from-zinc-950 to-zinc-900 flex flex-col justify-between border-2 border-dashed border-zinc-800 rounded-3xl m-4" id="modal-actor-compcard">
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div>
                      <h5 className="text-amber-400 font-bold text-lg font-mono tracking-tight">COMP CARD</h5>
                      <p className="text-[9px] text-zinc-500 font-mono">PORTRAIT DIGITAL ID: {actor.id}</p>
                    </div>
                    <span className="text-white text-xs px-2.5 py-1 bg-zinc-800 rounded-lg">DOUJU</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <img
                      src={actor.avatar}
                      alt="avatar"
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[4/5] object-cover rounded-xl border border-zinc-800"
                    />
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <p className="text-zinc-500 text-[10px] font-mono uppercase">姓名</p>
                        <p className="text-sm font-bold text-white mt-0.5">{actor.name.split(' ')[0]}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-[10px] font-mono uppercase">身高 / 体重</p>
                        <p className="text-sm font-bold text-white mt-0.5">{actor.height}cm / {actor.weight}kg</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-[10px] font-mono uppercase">三围参数</p>
                        <p className="text-sm font-bold text-white mt-0.5">{actor.measurements || '暂无说明'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800 pt-3.5 mt-4">
                  <div>
                    <p className="text-[9px] text-zinc-500">授权保障渠道</p>
                    <p className="text-[10px] font-bold text-amber-500/90 font-mono">SECURE RIGHTS CONFIRMED</p>
                  </div>
                  <ShieldCheck className="h-6 w-6 text-emerald-500" />
                </div>
              </div>
            )}
          </div>

          {/* Switchable Media Tabs & Thumbnail selector */}
          <div className="p-4 bg-zinc-950 flex flex-col gap-3.5" id="detail-modal-media-tabs">
            <div className="grid grid-cols-3 p-1 bg-zinc-900 rounded-2xl border border-zinc-800 text-xs text-center font-medium">
              <button
                onClick={() => setActiveMediaTab('photos')}
                className={`py-1.5 rounded-xl transition-all ${
                  activeMediaTab === 'photos' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                形象照
              </button>
              <button
                onClick={() => setActiveMediaTab('video')}
                className={`py-1.5 rounded-xl transition-all ${
                  activeMediaTab === 'video' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                视频作品 (5s)
              </button>
              <button
                onClick={() => setActiveMediaTab('card')}
                className={`py-1.5 rounded-xl transition-all ${
                  activeMediaTab === 'card' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                模卡预览
              </button>
            </div>

            {/* Thumbnail selector when 'photos' is selected */}
            {activeMediaTab === 'photos' && (
              <div className="flex gap-2.5 overflow-x-auto py-1 scrollbar-none" id="detail-photos-thumbnails">
                <button
                  onClick={() => setSelectedPhoto(actor.avatar)}
                  className={`relative h-14 w-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    defaultPhoto === actor.avatar ? 'border-[#E3B341]' : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <img src={actor.avatar} alt="thumb" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                </button>
                {actor.media.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhoto(img)}
                    className={`relative h-14 w-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      defaultPhoto === img ? 'border-[#E3B341]' : 'border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <img src={img} alt="thumb" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Details & Collaboration Options (md:col-span-6) */}
        <div className="md:col-span-6 p-6 lg:p-8 flex flex-col justify-between bg-zinc-950/40" id="detail-modal-right">
          
          {/* Main Info Box */}
          <div id="modal-right-info">
            {/* Header: Exclusive & Region tags */}
            <div className="flex items-center gap-2 mb-3">
              {actor.isExclusive && (
                <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  平台独家签约
                </span>
              )}
              <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] px-2 py-0.5 rounded-md">
                地区: {getRegionLabel(actor.region)}
              </span>
              <span className="text-zinc-600 text-[10px] font-mono ml-auto">
                编号: {actor.id}
              </span>
            </div>

            {/* Stage name and Rating */}
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-2xl font-black text-white">{actor.name}</h3>
              <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-xl">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 font-mono">{actor.rating}</span>
              </div>
            </div>

            {/* Key parameters block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/60 mb-6 text-center" id="actor-stats-box">
              <div className="border-r border-zinc-800 p-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-mono">身高</span>
                <strong className="text-sm text-white font-mono mt-0.5 block">{actor.height} <span className="text-[10px] text-zinc-400 font-normal">cm</span></strong>
              </div>
              <div className="sm:border-r border-zinc-800 p-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-mono">体重</span>
                <strong className="text-sm text-white font-mono mt-0.5 block">{actor.weight} <span className="text-[10px] text-zinc-400 font-normal">kg</span></strong>
              </div>
              <div className="border-r border-zinc-800 p-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-mono">三围尺寸</span>
                <strong className="text-xs text-white font-mono mt-1.5 block leading-none">{actor.measurements || 'N/A'}</strong>
              </div>
              <div className="p-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-mono">常驻地</span>
                <strong className="text-xs text-white mt-1.5 block leading-none flex items-center justify-center gap-0.5">
                  <MapPin className="h-3 w-3 text-amber-500/80 shrink-0" />
                  <span className="truncate">{actor.location}</span>
                </strong>
              </div>
            </div>

            {/* Cooperation Checklist (intent) */}
            <div className="mb-6" id="cooperation-intent-section">
              <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-amber-500" />
                <span>授权与合作意向分类</span>
              </h5>
              <div className="grid grid-cols-2 gap-2.5">
                {actor.cooperationIntent.map((intent, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-zinc-900/40 border border-zinc-800/80 px-3.5 py-2 rounded-xl text-xs text-zinc-300"
                  >
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span>{intent}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed bio summary */}
            <div className="mb-6" id="actor-bio-section">
              <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">艺人介绍</h5>
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-900 text-xs text-zinc-400 leading-relaxed">
                {actor.bio}
              </div>
            </div>
          </div>

          {/* Pricing and Action Bar */}
          <div className="pt-5 border-t border-zinc-900" id="modal-right-footer">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">参考授权价</p>
                <p className="text-xl font-black text-amber-400 font-mono mt-1">
                  ￥{actor.licensingPrice.toLocaleString()}<span className="text-xs text-zinc-400 font-normal">/年 (包含确权保障)</span>
                </p>
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>正版版权链条</span>
                </span>
                <span className="text-[9px] text-[#AFAFAF] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded mt-0.5">
                  智能审计链
                </span>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Favorite toggle */}
              <button
                onClick={() => onToggleFavorite(actor.id)}
                className={`sm:col-span-2 p-3.5 rounded-2xl border flex items-center justify-center transition-all ${
                  isFavorited
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 hover:bg-rose-500/20'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
                title={isFavorited ? '取消收藏' : '加入收藏'}
                id="btn-toggle-favorite"
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
              </button>

              {/* Download Compcard */}
              <button
                onClick={handleDownloadCard}
                className="sm:col-span-4 flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white p-3.5 rounded-2xl text-xs font-semibold transition-all relative"
                id="btn-download-compcard"
              >
                <Download className="h-4 w-4" />
                <span>{downloadSuccess ? '已下载到剪贴' : '下载模卡'}</span>
                {downloadSuccess && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-black font-extrabold text-[10px] px-2.5 py-1 rounded-md shadow-lg animate-bounce z-20 whitespace-nowrap">
                    高清模卡.PDF 模拟保存成功!
                  </span>
                )}
              </button>

              {/* Instant licensing */}
              <button
                onClick={() => onStartLicensing(actor)}
                className="sm:col-span-6 flex items-center justify-center gap-2 bg-[#E3B341] hover:bg-amber-500 text-black p-3.5 rounded-2xl text-xs font-bold shadow-[0_4px_16px_rgba(227,179,65,0.2)] hover:shadow-[0_6px_22px_rgba(227,179,65,0.35)] transition-all duration-300 transform hover:-translate-y-0.5"
                id="btn-instant-licensing"
              >
                <Zap className="h-4 w-4 fill-black" />
                <span>立即预约授权合作</span>
              </button>
            </div>

            {/* Tip detail footer */}
            <div className="flex items-center gap-1.5 mt-4 text-[9px] text-zinc-500 justify-center">
              <Info className="h-3 w-3 shrink-0" />
              <span>本授权通过数字智能确权合约签署，由平台托管保障肖像使用合规合规审计。</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
