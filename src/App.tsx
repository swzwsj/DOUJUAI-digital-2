import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Lock, Heart, FileCheck, HelpCircle, ArrowUpRight, Flame, Sparkles, MessageSquare } from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCarousel from './components/FeaturedCarousel';
import GallerySection from './components/GallerySection';
import LeaderboardSection from './components/LeaderboardSection';
import ContestSection from './components/ContestSection';
import RegistrationForm from './components/RegistrationForm';
import DetailModal from './components/DetailModal';
import LicensingModal from './components/LicensingModal';
import MyDashboard from './components/MyDashboard';

import { INITIAL_ACTORS, CONTEST_ITEMS } from './data';
import { Actor, ContestItem, Booking, Application, ContestSignup } from './types';

// Import local image assets statically for prefilled states
import suQingyiAvatar from './assets/images/su_qingyi_avatar_1782459087312.jpg';
import chuXinglanAvatar from './assets/images/chu_xinglan_avatar_1782459103543.jpg';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Core platform states
  const [actors, setActors] = useState<Actor[]>(() => {
    const saved = localStorage.getItem('actors_db');
    return saved ? JSON.parse(saved) : INITIAL_ACTORS;
  });

  const [contestItems, setContestItems] = useState<ContestItem[]>(() => {
    const saved = localStorage.getItem('contest_items_db');
    return saved ? JSON.parse(saved) : CONTEST_ITEMS;
  });

  // User interactions & bookings state
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('bookings_db');
    if (saved) return JSON.parse(saved);
    // Prefill with one beautiful mock active contract to look high-fidelity
    return [
      {
        id: "BK-001",
        bookingId: "BK-HENGDIAN-902",
        actorId: "ACT-001",
        actorName: "苏清漪 (Su Qingyi)",
        actorAvatar: suQingyiAvatar,
        licenseType: "annual",
        price: 158000,
        status: "active",
        date: "2026-06-20",
        duration: "平台标准年度授权 (签署日起共365自然日)",
        licenseNo: "LIC-701928"
      }
    ];
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('applications_db');
    if (saved) return JSON.parse(saved);
    // Prefill with one mock pending application to look realistic
    return [
      {
        id: "APP-001",
        name: "叶凡 (Ye Fan)",
        gender: "male",
        region: "mainland",
        height: 181,
        weight: 68,
        location: "浙江横店",
        tags: ["帅气少侠", "修仙狂魔"],
        cooperationIntent: ["可接短剧", "平面拍摄"],
        avatar: chuXinglanAvatar,
        status: "pending",
        date: "2026-06-25"
      }
    ];
  });

  const [contestSignups, setContestSignups] = useState<ContestSignup[]>(() => {
    const saved = localStorage.getItem('contest_signups_db');
    if (saved) return JSON.parse(saved);
    // Prefill with one mock signup
    return [
      {
        id: "SIGN-001",
        contestId: "CONTEST-HENGDIAN-2026",
        contestTitle: "首届横店短片演员挑战赛",
        actorName: "林见鹿",
        contact: "138-xxxx-8090",
        videoUrl: "https://example.com/demo.mp4",
        roleType: "清纯校园",
        experience: "常驻平面拍摄，想通过大赛对接短剧资源。",
        status: "pending",
        date: "2026-06-24"
      }
    ];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites_db');
    return saved ? JSON.parse(saved) : ["ACT-001", "ACT-003"];
  });

  // Modal view states
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [isLicensingOpen, setIsLicensingOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  // Synchronize with local storage
  useEffect(() => {
    // Self-healing migration: if the cache has generic Unsplash URLs for actor avatars, reset them to INITIAL_ACTORS
    const needsReset = actors.some(a => a.avatar.startsWith('https://images.unsplash.com'));
    if (needsReset) {
      setActors(INITIAL_ACTORS);
      setContestItems(CONTEST_ITEMS);
    }
  }, [actors, contestItems]);

  useEffect(() => {
    localStorage.setItem('actors_db', JSON.stringify(actors));
  }, [actors]);

  useEffect(() => {
    localStorage.setItem('contest_items_db', JSON.stringify(contestItems));
  }, [contestItems]);

  useEffect(() => {
    localStorage.setItem('bookings_db', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('applications_db', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('contest_signups_db', JSON.stringify(contestSignups));
  }, [contestSignups]);

  useEffect(() => {
    localStorage.setItem('favorites_db', JSON.stringify(favorites));
  }, [favorites]);

  // Actions
  const handleVote = (itemId: string) => {
    setContestItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, votes: item.votes + 1 } : item
      )
    );
  };

  const handleSignup = (signupData: Omit<ContestSignup, 'id' | 'date' | 'status'>) => {
    const newSignup: ContestSignup = {
      ...signupData,
      id: `SIGN-${Date.now()}`,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setContestSignups(prev => [newSignup, ...prev]);
  };

  const handleRegister = (appData: Omit<Application, 'id' | 'status' | 'date'>) => {
    const newApp: Application = {
      ...appData,
      id: `APP-${Date.now()}`,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setApplications(prev => [newApp, ...prev]);

    // Also temporarily seed to actor database to make the prototype show instantly!
    const newActor: Actor = {
      id: `ACT-${Math.floor(100 + Math.random() * 900)}`,
      name: appData.name,
      avatar: appData.avatar,
      coverPhoto: appData.avatar,
      gender: appData.gender,
      region: appData.region as any,
      tags: appData.tags,
      height: appData.height,
      weight: appData.weight,
      location: appData.location,
      licensingPrice: 125000,
      isExclusive: false,
      genres: appData.cooperationIntent,
      videoSampleUrl: "https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-beautiful-young-woman-with-long-hair-39845-large.mp4",
      media: [appData.avatar],
      bio: "新入库注册演员，档案肖像数字防伪链路初审中。支持微短剧、AR数字分身训练、商业平面拍摄。",
      rating: 4.5,
      cooperationIntent: appData.cooperationIntent,
      earnings: {
        total: 0,
        monthly: 0,
        yearly: 0,
        trend: 'stable',
        rank: actors.length + 1
      }
    };
    setActors(prev => [...prev, newActor]);
  };

  const handleAddBooking = (bookingData: Omit<Booking, 'id' | 'bookingId' | 'date' | 'licenseNo'>) => {
    const randomLicNo = `LIC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: Booking = {
      ...bookingData,
      id: `BK-${Date.now()}`,
      bookingId: `BK-HENGDIAN-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      licenseNo: randomLicNo,
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  // Cancellations/Withdrawals on Dashboard
  const handleCancelBooking = (id: string) => {
    if (confirm("确认解约/撤销该肖像确权授权合作？已支付的信托托管资金将全额退还。")) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleCancelApplication = (id: string) => {
    if (confirm("确认撤回演员数字入库初审申报？")) {
      setApplications(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleCancelSignup = (id: string) => {
    if (confirm("确认撤消横店首届挑战赛报名申请？")) {
      setContestSignups(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleToggleFavorite = (actorId: string) => {
    setFavorites(prev =>
      prev.includes(actorId) ? prev.filter(id => id !== actorId) : [...prev, actorId]
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col font-sans selection:bg-amber-500/30 selection:text-[#E3B341]">
      
      {/* Premium Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSearchQuery(''); // Reset search on tab switch
        }}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Main content body */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero
                onFindActors={() => setActiveTab('gallery')}
                onOpenRegister={() => setIsRegisterOpen(true)}
              />
              
              <FeaturedCarousel
                actors={actors}
                onSelectActor={setSelectedActor}
              />

              <LeaderboardSection
                actors={actors}
                onSelectActor={setSelectedActor}
              />

              {/* Protection Section (四宫格) */}
              <section className="bg-[#0F0F0F] py-16 border-b border-white/5" id="protection-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-12" id="protection-header">
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-2 font-display">SAFEGUARDS</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">平台四重数字确权安全保障</h3>
                    <p className="text-xs text-[#AFAFAF] mt-1">
                      首创AI+Web3双轨加密版权，确保正版版权授权，规避法律及搬运纠纷风险
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="protection-grid">
                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all text-center sm:text-left shadow-lg">
                      <div className="inline-flex p-3 rounded-xl bg-amber-500/10 text-amber-400 mb-4">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-sans">版权真实确权</h4>
                      <p className="text-xs text-[#AFAFAF] mt-2 leading-relaxed">
                        100%入库演员实名认证，由司法链及电子合同全程确权归档，彻底杜绝冒用肖像隐患。
                      </p>
                    </div>

                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all text-center sm:text-left shadow-lg">
                      <div className="inline-flex p-3 rounded-xl bg-amber-500/10 text-amber-400 mb-4">
                        <Lock className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-sans">肖像安全防护</h4>
                      <p className="text-xs text-[#AFAFAF] mt-2 leading-relaxed">
                        生成式AI作品注入数字防伪水印与防抹水印。任何搬运侵权一秒检测并触发存证维权。
                      </p>
                    </div>

                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all text-center sm:text-left shadow-lg">
                      <div className="inline-flex p-3 rounded-xl bg-amber-500/10 text-amber-400 mb-4">
                        <FileCheck className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-sans">信托双向托管</h4>
                      <p className="text-xs text-[#AFAFAF] mt-2 leading-relaxed">
                        交易资金入驻华夏银行信托托管专户，依剧目摄制交付进度三期划账，全面担保资金。
                      </p>
                    </div>

                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all text-center sm:text-left shadow-lg">
                      <div className="inline-flex p-3 rounded-xl bg-amber-500/10 text-amber-400 mb-4">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white font-sans">专业技术加持</h4>
                      <p className="text-xs text-[#AFAFAF] mt-2 leading-relaxed">
                        配套高像素动捕点阵及AI拟真声音驱动集。满足大片面捕建模、高帧生成等全维度应用。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GallerySection
                actors={actors}
                onSelectActor={setSelectedActor}
                initialSearchQuery={searchQuery}
              />
            </motion.div>
          )}

          {activeTab === 'contest' && (
            <motion.div
              key="contest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContestSection
                contestItems={contestItems}
                onVote={handleVote}
                onSignup={handleSignup}
              />
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MyDashboard
                bookings={bookings}
                applications={applications}
                contestSignups={contestSignups}
                onCancelBooking={handleCancelBooking}
                onCancelApplication={handleCancelApplication}
                onCancelSignup={handleCancelSignup}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 py-10 border-t border-zinc-900 text-center text-xs text-zinc-500" id="platform-footer">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-amber-400 font-bold">DOUJU</span>
            <span>·</span>
            <span>让肖像资产数字化，连接商业无限可能</span>
          </div>
          <p className="max-w-2xl mx-auto leading-relaxed">
            合作渠道：横店影视产业实验区首发确权合作中心 | 华夏商业银行信托托管合规合作银行 | DOUJU数字安全链提供防伪标识生成。
          </p>
          <div className="pt-4 border-t border-zinc-900/40 text-[10px] text-zinc-600 font-mono">
            © 2026 ACTOR PORTRAIT DIGITAL ASSETS PLATFORM. ALL RIGHTS RESERVED. (HIGH FIDELITY PROTO)
          </div>
        </div>
      </footer>

      {/* Interactive Modals Portal */}
      <AnimatePresence>
        {/* Registration Form */}
        {isRegisterOpen && (
          <RegistrationForm
            onClose={() => setIsRegisterOpen(false)}
            onRegister={handleRegister}
          />
        )}

        {/* Actor Detail Modal */}
        {selectedActor && !isLicensingOpen && (
          <DetailModal
            actor={selectedActor}
            onClose={() => setSelectedActor(null)}
            onStartLicensing={() => setIsLicensingOpen(true)}
            isFavorited={favorites.includes(selectedActor.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* Licensing Step-by-Step Wizard Modal */}
        {selectedActor && isLicensingOpen && (
          <LicensingModal
            actor={selectedActor}
            onClose={() => {
              setIsLicensingOpen(false);
              setSelectedActor(null);
            }}
            onAddBooking={handleAddBooking}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
