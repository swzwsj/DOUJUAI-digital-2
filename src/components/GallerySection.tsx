import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Star, Play, MapPin, Users, SlidersHorizontal, Check } from 'lucide-react';
import { Actor } from '../types';

interface GallerySectionProps {
  actors: Actor[];
  onSelectActor: (actor: Actor) => void;
  initialSearchQuery?: string;
}

export default function GallerySection({
  actors,
  onSelectActor,
  initialSearchQuery = '',
}: GallerySectionProps) {
  // Filtering states
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedExclusive, setSelectedExclusive] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [hoveredActorId, setHoveredActorId] = useState<string | null>(null);

  // Filter lists
  const genderOptions = [
    { value: 'all', label: '性别: 全部' },
    { value: 'male', label: '男演员' },
    { value: 'female', label: '女演员' },
  ];

  const regionOptions = [
    { value: 'all', label: '地区: 全部' },
    { value: 'mainland', label: '大陆' },
    { value: 'hongkong_taiwan', label: '港澳台' },
    { value: 'overseas', label: '海外' },
  ];

  const genreOptions = [
    { value: 'all', label: '题材: 全部' },
    { value: '短剧', label: '短剧熟脸' },
    { value: '古装', label: '古装仙侠' },
    { value: '都市', label: '都市职场' },
    { value: '广告', label: '商业广告' },
    { value: '二次元', label: '二次元/Cosplay' },
  ];

  const exclusiveOptions = [
    { value: 'all', label: '合作: 全部' },
    { value: 'true', label: '独家签约' },
    { value: 'false', label: '非独家授权' },
  ];

  // Filtering Logic
  const filteredActors = useMemo(() => {
    return actors.filter((actor) => {
      const matchGender = selectedGender === 'all' || actor.gender === selectedGender;
      const matchRegion = selectedRegion === 'all' || actor.region === selectedRegion;
      const matchGenre = selectedGenre === 'all' || actor.genres.includes(selectedGenre);
      const matchExclusive =
        selectedExclusive === 'all' ||
        (selectedExclusive === 'true' ? actor.isExclusive : !actor.isExclusive);

      const matchSearch =
        searchQuery.trim() === '' ||
        actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        actor.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        actor.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
        actor.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchGender && matchRegion && matchGenre && matchExclusive && matchSearch;
    });
  }, [actors, selectedGender, selectedRegion, selectedGenre, selectedExclusive, searchQuery]);

  const getRegionLabel = (region: string) => {
    switch (region) {
      case 'mainland': return '大陆';
      case 'hongkong_taiwan': return '港台';
      case 'overseas': return '海外';
      default: return region;
    }
  };

  return (
    <section className="bg-[#0F0F0F] py-10 px-4 lg:px-8 max-w-7xl mx-auto" id="gallery-section">
      {/* Title block */}
      <div className="mb-8" id="gallery-header">
        <div className="flex items-center gap-2 mb-2 text-zinc-400">
          <SlidersHorizontal className="h-4 w-4 text-[#E3B341]" />
          <span className="text-xs uppercase font-mono tracking-wider">数字确权片库</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          真人演员数字肖像中心
        </h3>
        <p className="text-sm text-zinc-500 mt-1">
          多维度实时检索高清晰度肖像权，符合全球出海及短剧商用合规审计
        </p>
      </div>

      {/* Embedded Search and Filters Container */}
      <div className="bg-zinc-950 p-6 rounded-3xl border border-zinc-900 shadow-md mb-8 flex flex-col gap-5" id="gallery-filters-container">
        {/* Search Bar inside Gallery */}
        <div className="relative w-full" id="gallery-search-bar">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <input
            type="text"
            placeholder="在片库中搜名字、地区、爆款剧标签或特定合作意向..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#E3B341] focus:border-[#E3B341] transition-all"
          />
        </div>

        {/* Filter Rows */}
        <div className="flex flex-wrap gap-4 items-center text-xs" id="filter-rows">
          {/* Gender Select */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {genderOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedGender(opt.value)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  selectedGender === opt.value
                    ? 'bg-[#E3B341] text-black font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-800 hidden md:block" />

          {/* Region Select */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {regionOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedRegion(opt.value)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  selectedRegion === opt.value
                    ? 'bg-[#E3B341] text-black font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-800 hidden md:block" />

          {/* Genre Select */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {genreOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedGenre(opt.value)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  selectedGenre === opt.value
                    ? 'bg-[#E3B341] text-black font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-800 hidden md:block" />

          {/* Exclusive Select */}
          <div className="flex flex-wrap gap-1.5 items-center">
            {exclusiveOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedExclusive(opt.value)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  selectedExclusive === opt.value
                    ? 'bg-[#E3B341] text-black font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Summary Info */}
        <div className="text-xs text-zinc-500 flex items-center justify-between" id="gallery-info-summary">
          <span>
            检索到 <strong className="text-white font-mono">{filteredActors.length}</strong> 位符合要求的数字授权演员
          </span>
          {(selectedGender !== 'all' ||
            selectedRegion !== 'all' ||
            selectedGenre !== 'all' ||
            selectedExclusive !== 'all' ||
            searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedGender('all');
                setSelectedRegion('all');
                setSelectedGenre('all');
                setSelectedExclusive('all');
                setSearchQuery('');
              }}
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              清除全部筛选
            </button>
          )}
        </div>
      </div>

      {/* Main Grid Section */}
      {filteredActors.length === 0 ? (
        <div className="py-20 text-center bg-zinc-950 rounded-3xl border border-zinc-900" id="gallery-empty-state">
          <Users className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400 font-medium">未找到符合当前检索条件的演员</p>
          <p className="text-zinc-600 text-xs mt-1">您可以尝试放宽筛选条件，或重置搜索词</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="gallery-grid">
          {filteredActors.map((actor) => (
            <motion.div
              layout
              key={actor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredActorId(actor.id)}
              onMouseLeave={() => setHoveredActorId(null)}
              onClick={() => onSelectActor(actor)}
              className="group relative bg-zinc-950 rounded-2xl border border-zinc-900 overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:border-zinc-700 transition-all duration-300"
              id={`gallery-card-${actor.id}`}
            >
              {/* Media element: shows photo, on hover simulates video or reveals elegant cover */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                <img
                  src={actor.avatar}
                  alt={actor.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Simulated 5s video player hint when hovered */}
                <AnimatePresence>
                  {hoveredActorId === actor.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center pointer-events-none"
                    >
                      <div className="p-3 bg-[#E3B341] text-black rounded-full shadow-[0_0_15px_rgba(227,179,65,0.4)] mb-2 animate-bounce">
                        <Play className="h-4 w-4 fill-black" />
                      </div>
                      <span className="text-[10px] text-white font-medium bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        播放肖像视频小样 (5s)
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Left tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                  {actor.isExclusive && (
                    <span className="bg-amber-500/90 text-black text-[9px] font-bold px-1.5 py-0.5 rounded">
                      独家
                    </span>
                  )}
                  <span className="bg-zinc-900/80 backdrop-blur-sm text-zinc-300 text-[9px] px-1.5 py-0.5 rounded font-mono">
                    {getRegionLabel(actor.region)}
                  </span>
                </div>

                {/* Right price */}
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[10px] text-white bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-lg border border-zinc-800">
                  <span className="text-[#E3B341]">￥</span>
                  <span className="font-bold font-mono text-[11px]">{(actor.licensingPrice / 1000).toFixed(0)}k</span>
                  <span className="text-zinc-400 text-[8px]">/年</span>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              </div>

              {/* Info section */}
              <div className="p-4 relative z-10" id={`gallery-card-info-${actor.id}`}>
                {/* Name & Height & Location */}
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    {actor.name.split(' ')[0]}
                  </h4>
                  <div className="flex items-center gap-1 text-zinc-400 text-[11px] font-mono">
                    <MapPin className="h-3 w-3 text-amber-500/80" />
                    <span>{actor.location.replace('浙江', '')}</span>
                  </div>
                </div>

                {/* Sub features like height, weight */}
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-zinc-500 font-mono">
                  <span>{actor.height}cm</span>
                  <span>·</span>
                  <span>{actor.weight}kg</span>
                  {actor.measurements && (
                    <>
                      <span>·</span>
                      <span>{actor.measurements}</span>
                    </>
                  )}
                </div>

                {/* Description snippet */}
                <p className="text-[11px] text-zinc-400 line-clamp-2 mt-2 leading-relaxed h-8">
                  {actor.bio}
                </p>

                {/* Custom tags e.g. #古装女神 #短剧熟脸 */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {actor.tags.slice(0, 2).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[9px] text-[#E3B341] bg-amber-500/10 px-2 py-0.5 rounded-md font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Intent Indicators */}
                <div className="mt-3.5 pt-3.5 border-t border-zinc-900 flex items-center justify-between text-[10px]" id={`gallery-card-footer-${actor.id}`}>
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>提供AI驱动集</span>
                  </span>
                  <span className="text-[#E3B341] font-semibold group-hover:translate-x-0.5 transition-transform">
                    意向预约 <span>→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
