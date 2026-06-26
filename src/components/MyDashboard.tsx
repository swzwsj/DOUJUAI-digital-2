import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, FileText, CheckCircle, Award, Hourglass, Trash2, ExternalLink, RefreshCw, Zap, ShieldAlert, X } from 'lucide-react';
import { Booking, Application, ContestSignup } from '../types';

interface MyDashboardProps {
  bookings: Booking[];
  applications: Application[];
  contestSignups: ContestSignup[];
  onCancelBooking?: (id: string) => void;
  onCancelApplication?: (id: string) => void;
  onCancelSignup?: (id: string) => void;
}

export default function MyDashboard({
  bookings,
  applications,
  contestSignups,
  onCancelBooking,
  onCancelApplication,
  onCancelSignup,
}: MyDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'applications' | 'contests'>('bookings');
  const [selectedBookingForCert, setSelectedBookingForCert] = useState<Booking | null>(null);

  const getLicenseTypeLabel = (type: string) => {
    switch (type) {
      case 'single': return '单次作品许可';
      case 'annual': return '年度标准许可';
      case 'buyout': return '独家垄断买断';
      default: return type;
    }
  };

  return (
    <section className="bg-[#0F0F0F] py-10 px-4 lg:px-8 max-w-7xl mx-auto" id="dashboard-section">
      {/* Title block */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4" id="dashboard-header">
        <div>
          <div className="flex items-center gap-2 mb-2 text-zinc-400">
            <Shield className="h-4.5 w-4.5 text-[#E3B341]" />
            <span className="text-xs uppercase font-mono tracking-wider">SECURE ACCOUNT PORTAL</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            DOUJU数智安全工作台
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            实时查看及管理您的肖像确权合同、肖像申报申请以及活动报名记录
          </p>
        </div>

        {/* Stats indicators */}
        <div className="flex gap-4 font-mono text-xs" id="dashboard-mini-stats">
          <div className="bg-zinc-950 px-4 py-2 rounded-2xl border border-zinc-900">
            <span className="text-zinc-600 block">生效授权合同</span>
            <strong className="text-amber-400 text-lg block mt-0.5">{bookings.length} 份</strong>
          </div>
          <div className="bg-zinc-950 px-4 py-2 rounded-2xl border border-zinc-900">
            <span className="text-zinc-600 block">入库/大赛申请</span>
            <strong className="text-white text-lg block mt-0.5">{applications.length + contestSignups.length} 份</strong>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column Tabs (3 cols), Right Column Content (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="dashboard-main-layout">
        
        {/* LEFT Navigation Panel (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-zinc-950 rounded-2xl border border-zinc-900 p-4 space-y-2" id="dashboard-nav">
          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'bookings'
                ? 'bg-amber-500/10 text-[#E3B341] border border-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="h-4.5 w-4.5" />
              <span>我的肖像确权合同</span>
            </div>
            <span className="bg-zinc-900 px-2 py-0.5 rounded-md font-mono text-[10px] text-zinc-500">
              {bookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('applications')}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'applications'
                ? 'bg-amber-500/10 text-[#E3B341] border border-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle className="h-4.5 w-4.5" />
              <span>人像入库申报进度</span>
            </div>
            <span className="bg-zinc-900 px-2 py-0.5 rounded-md font-mono text-[10px] text-zinc-500">
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('contests')}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'contests'
                ? 'bg-amber-500/10 text-[#E3B341] border border-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Award className="h-4.5 w-4.5" />
              <span>演员挑战赛报名</span>
            </div>
            <span className="bg-zinc-900 px-2 py-0.5 rounded-md font-mono text-[10px] text-zinc-500">
              {contestSignups.length}
            </span>
          </button>
        </div>

        {/* RIGHT Information Panel (lg:col-span-9) */}
        <div className="lg:col-span-9" id="dashboard-content-area">
          <AnimatePresence mode="wait">
            
            {/* SUB TAB 1: PORTRAIT BOOKINGS */}
            {activeSubTab === 'bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between" id="bookings-panel-header">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">肖像安全托管订单 ({bookings.length})</h4>
                  <span className="text-[10px] text-zinc-500 font-mono">SECURED BY PLATFORM BLOCKCHAIN</span>
                </div>

                {bookings.length === 0 ? (
                  <div className="bg-zinc-950 border border-zinc-900 py-16 text-center rounded-2xl" id="bookings-empty">
                    <ShieldAlert className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
                    <p className="text-zinc-400 font-semibold text-xs">暂未签署任何肖像确权合同</p>
                    <p className="text-zinc-600 text-[11px] mt-1 max-w-sm mx-auto">
                      您可以前往“演员片库”筛选演员，并点击“立即预约授权合作”完成签署，资金由平台进行托管。
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="bookings-grid">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl hover:border-zinc-800 transition-all flex flex-col justify-between h-48 group"
                        id={`dashboard-booking-card-${booking.id}`}
                      >
                        <div>
                          {/* Top row */}
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] text-zinc-500 font-mono">许可编号: {booking.licenseNo}</span>
                            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              已生效
                            </span>
                          </div>

                          {/* Actor avatar, name & price */}
                          <div className="flex items-center gap-3.5 mt-4">
                            <div className="h-10 w-10 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                              <img src={booking.actorAvatar} alt={booking.actorName} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-bold text-white truncate">{booking.actorName}</h5>
                              <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                                {getLicenseTypeLabel(booking.licenseType)} · {booking.duration.split(' ')[0]}
                              </p>
                            </div>
                            <div className="text-right font-mono">
                              <p className="text-xs font-bold text-emerald-400">￥{booking.price.toLocaleString()}</p>
                              <p className="text-[9px] text-zinc-600">已汇至托管</p>
                            </div>
                          </div>
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-zinc-900">
                          <button
                            onClick={() => setSelectedBookingForCert(booking)}
                            className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
                            id={`btn-view-cert-${booking.id}`}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>查看电子证书</span>
                          </button>

                          {onCancelBooking && (
                            <button
                              onClick={() => onCancelBooking(booking.id)}
                              className="text-[10px] text-zinc-600 hover:text-rose-500 p-1.5 rounded-lg hover:bg-zinc-900 transition-all flex items-center gap-1"
                              id={`btn-cancel-booking-${booking.id}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>撤回</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* SUB TAB 2: ACTOR APPLICATIONS */}
            {activeSubTab === 'applications' && (
              <motion.div
                key="applications"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between" id="applications-panel-header">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">入库申报进度 ({applications.length})</h4>
                  <span className="text-[10px] text-zinc-500 font-mono">AUTOMATED RIGHTS AUDITING</span>
                </div>

                {applications.length === 0 ? (
                  <div className="bg-zinc-950 border border-zinc-900 py-16 text-center rounded-2xl" id="applications-empty">
                    <Hourglass className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
                    <p className="text-zinc-400 font-semibold text-xs">暂无入库申报档案</p>
                    <p className="text-zinc-600 text-[11px] mt-1 max-w-sm mx-auto">
                      如果您是职业演员或经纪公司，请点击右上角“申请入库”填写真实信息申报建立数字安全资产。
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3" id="applications-list">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl hover:border-zinc-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        id={`dashboard-app-row-${app.id}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                            <img src={app.avatar} alt={app.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <div className="flex items-baseline gap-2">
                              <h5 className="text-sm font-bold text-white">{app.name}</h5>
                              <span className="text-[10px] text-zinc-500 font-mono">{app.gender === 'male' ? '男' : '女'} · {app.height}cm · {app.location}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {app.tags.map((tag, tIdx) => (
                                <span key={tIdx} className="text-[9px] text-amber-500/80 bg-amber-500/5 border border-amber-500/10 px-1.5 py-0.2 rounded font-mono">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-zinc-900 pt-3 sm:pt-0" id={`dashboard-app-status-row-${app.id}`}>
                          <div className="text-right">
                            <span className="text-[10px] text-zinc-500 font-mono block">提交时间: {app.date}</span>
                            <div className="flex items-center gap-1.5 mt-1 justify-end">
                              <RefreshCw className="h-3 w-3 text-amber-500 animate-spin-slow" />
                              <span className="text-xs text-amber-400 font-bold font-mono">数字校验初审中</span>
                            </div>
                          </div>

                          {onCancelApplication && (
                            <button
                              onClick={() => onCancelApplication(app.id)}
                              className="text-zinc-600 hover:text-rose-500 p-1 rounded hover:bg-zinc-900 transition-all"
                              id={`btn-cancel-app-${app.id}`}
                              title="撤销申报"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* SUB TAB 3: CONTEST SIGNUPS */}
            {activeSubTab === 'contests' && (
              <motion.div
                key="contests"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between" id="contests-panel-header">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">大赛报名历史 ({contestSignups.length})</h4>
                  <span className="text-[10px] text-zinc-500 font-mono">OFFICIAL CONTEST PARTICIPATION</span>
                </div>

                {contestSignups.length === 0 ? (
                  <div className="bg-zinc-950 border border-zinc-900 py-16 text-center rounded-2xl" id="contests-empty">
                    <Award className="h-8 w-8 text-zinc-600 mx-auto mb-3" />
                    <p className="text-zinc-400 font-semibold text-xs">暂无大赛报名历史</p>
                    <p className="text-zinc-600 text-[11px] mt-1 max-w-sm mx-auto">
                      您可以前往“演员大赛”板块下的“横店入驻邀请及报名”栏目，填写表单并立即提交。
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3" id="contest-signups-list">
                    {contestSignups.map((signup) => (
                      <div
                        key={signup.id}
                        className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl hover:border-zinc-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        id={`dashboard-signup-row-${signup.id}`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                            <Award className="h-5 w-5" />
                          </div>
                          <div>
                            <h5 className="text-sm font-bold text-white">{signup.contestTitle}</h5>
                            <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                              参赛人: <span className="text-white font-sans">{signup.actorName}</span> · 预备角色: <span className="text-white font-sans">{signup.roleType}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-zinc-900 pt-3 sm:pt-0" id={`dashboard-signup-status-row-${signup.id}`}>
                          <div className="text-right">
                            <span className="text-[10px] text-zinc-500 font-mono block">申报日期: {signup.date}</span>
                            <div className="flex items-center gap-1.5 mt-1 justify-end">
                              <RefreshCw className="h-3 w-3 text-amber-500 animate-spin" />
                              <span className="text-xs text-amber-400 font-bold font-mono">资格调度初筛中</span>
                            </div>
                          </div>

                          {onCancelSignup && (
                            <button
                              onClick={() => onCancelSignup(signup.id)}
                              className="text-zinc-600 hover:text-rose-500 p-1 rounded hover:bg-zinc-900 transition-all"
                              id={`btn-cancel-signup-${signup.id}`}
                              title="撤消报名"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* POPUP MODAL: Certificate Detailed Inspection */}
      <AnimatePresence>
        {selectedBookingForCert && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4 overflow-y-auto" id="dashboard-cert-modal-overlay">
            {/* Background overlay */}
            <div onClick={() => setSelectedBookingForCert(null)} className="fixed inset-0 bg-black/95 backdrop-blur-md" />

            {/* Certificate Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-zinc-950 border-4 border-double border-amber-500/40 rounded-3xl w-full max-w-xl p-6 sm:p-8 z-10 shadow-2xl text-center"
              id="dashboard-cert-card"
            >
              <button
                onClick={() => setSelectedBookingForCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-white transition-all border border-zinc-900"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="inline-flex p-2 bg-amber-500/10 rounded-2xl text-amber-400 mb-2.5">
                <Award className="h-8 w-8" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-white tracking-widest uppercase font-mono">
                肖像数字资产使用许可证
              </h4>
              <p className="text-[9px] text-zinc-500 font-mono tracking-wider mt-1 uppercase mb-6">
                PORTRAIT DIGITAL ASSET LICENSE CERTIFICATE
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-left bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/60 mb-6">
                <div className="space-y-2 border-r border-zinc-800/80 pr-2">
                  <div>
                    <span className="text-zinc-500 text-[9px] block">许可证号</span>
                    <strong className="text-white">{selectedBookingForCert.licenseNo}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[9px] block">授权人 (演员)</span>
                    <strong className="text-amber-400">{selectedBookingForCert.actorName}</strong>
                  </div>
                </div>
                <div className="space-y-2 pl-4">
                  <div>
                    <span className="text-zinc-500 text-[9px] block">许可性质</span>
                    <strong className="text-white">{getLicenseTypeLabel(selectedBookingForCert.licenseType)}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[9px] block">信托托管金</span>
                    <strong className="text-emerald-400">￥{selectedBookingForCert.price.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              <div className="text-[9px] text-zinc-500 font-mono text-center">
                数字签名: SHA256:0x{Array.from({ length: 24 }, (_, i) => ((i * 3 + 7) % 16).toString(16)).join('').toUpperCase()}
              </div>

              <button
                onClick={() => setSelectedBookingForCert(null)}
                className="mt-6 w-full bg-[#E3B341] hover:bg-amber-500 text-black py-2 rounded-xl text-xs font-bold transition-all"
              >
                确认并关闭
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
