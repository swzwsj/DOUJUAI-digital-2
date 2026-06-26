import { useState, ChangeEvent } from 'react';
import { Search, Plus, User, Sparkles, Film, Database, Award, Info } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRegister: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function Header({
  activeTab,
  setActiveTab,
  onOpenRegister,
  onSearch,
  searchQuery,
}: HeaderProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    onSearch(e.target.value);
  };

  const navItems = [
    { id: 'home', label: '首页', icon: Film },
    { id: 'gallery', label: '演员片库', icon: Database },
    { id: 'contest', label: '演员大赛', icon: Award },
    { id: 'dashboard', label: '我的主页', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3.5 flex items-center justify-between transition-all">
      {/* Left: Logo */}
      <div 
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-2.5 cursor-pointer group"
        id="header-logo-container"
      >
        <div className="bg-gradient-to-tr from-[#E3B341] to-amber-500 p-2 rounded-xl text-black shadow-[0_0_15px_rgba(227,179,65,0.25)] group-hover:shadow-[0_0_20px_rgba(227,179,65,0.45)] transition-all duration-300">
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-white via-zinc-100 to-amber-200 bg-clip-text text-transparent tracking-tight">
            DOUJU
          </h1>
          <p className="text-[10px] text-[#AFAFAF] font-mono tracking-wider uppercase">
            Actor Portrait Digital Assets
          </p>
        </div>
      </div>

      {/* Center: Navigation */}
      <nav className="hidden md:flex items-center gap-1.5" id="header-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]'
                  : 'text-[#AFAFAF] hover:text-white hover:bg-white/5'
              }`}
              id={`nav-item-${item.id}`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-[#E3B341]' : 'text-zinc-500'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right: Search, Call to Action, user profile */}
      <div className="flex items-center gap-3.5" id="header-actions">
        {/* Search Box */}
        <div className="relative hidden sm:block max-w-xs" id="header-search-box">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="搜演员 / 标签 / 类型..."
            value={localSearch}
            onChange={handleSearchChange}
            className="w-48 lg:w-64 pl-10 pr-4 py-1.5 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#E3B341]/50 focus:border-[#E3B341]/50 transition-all"
          />
        </div>

        {/* Apply/Register Button */}
        <button
          onClick={onOpenRegister}
          className="flex items-center gap-1.5 bg-[#E3B341] hover:bg-amber-500 text-black px-5 py-1.5 rounded-full text-xs font-semibold shadow-[0_4px_12px_rgba(227,179,65,0.2)] hover:shadow-[0_6px_16px_rgba(227,179,65,0.3)] transition-all duration-300"
          id="btn-apply-entry"
        >
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>申请入库</span>
        </button>

        {/* User Mini status or menu */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`p-2 rounded-xl border transition-all duration-200 ${
            activeTab === 'dashboard'
              ? 'bg-white/10 border-white/20 text-[#E3B341]'
              : 'bg-white/5 border-white/10 text-[#AFAFAF] hover:text-white'
          }`}
          title="个人中心"
          id="btn-user-dashboard"
        >
          <User className="h-4.5 w-4.5" />
        </button>
      </div>
    </header>
  );
}
