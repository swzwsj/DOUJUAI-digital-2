import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, MapPin, Sparkles } from 'lucide-react';
import { Actor } from '../types';

interface FeaturedCarouselProps {
  actors: Actor[];
  onSelectActor: (actor: Actor) => void;
}

export default function FeaturedCarousel({ actors, onSelectActor }: FeaturedCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 320 : scrollLeft + 320;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getRegionLabel = (region: string) => {
    switch (region) {
      case 'mainland': return '大陆';
      case 'hongkong_taiwan': return '港台';
      case 'overseas': return '海外';
      default: return region;
    }
  };

  return (
    <section className="bg-[#0F0F0F] py-16 border-b border-white/5 overflow-hidden" id="featured-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8" id="featured-header">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2 font-display">
              <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
              <span>本期精选</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
              最新入库优质模特 · 演员
            </h3>
            <p className="text-sm text-[#AFAFAF] mt-1">
              由平台官方严选、首发录入，并已完成100%肖像安全数字认证
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex gap-2.5" id="carousel-controls">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Previous item"
              id="btn-carousel-prev"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Next item"
              id="btn-carousel-next"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
          style={{ scrollbarWidth: 'none' }}
          id="carousel-viewport"
        >
          {actors.map((actor, idx) => (
            <motion.div
              key={actor.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="min-w-[280px] sm:min-w-[310px] max-w-[310px] snap-start group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#1A1A1A] border border-white/5 cursor-pointer shadow-lg hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)] hover:border-[#E3B341]/40 transition-all duration-300"
              onClick={() => onSelectActor(actor)}
              id={`featured-card-${actor.id}`}
            >
              {/* Image background with modern lazy representation */}
              <img
                src={actor.avatar}
                alt={actor.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Exclusive Tag */}
              {actor.isExclusive && (
                <div className="absolute top-4 left-4 z-10 bg-[#E3B341] text-black text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm font-display tracking-wider uppercase">
                  独家授权
                </div>
              )}

              {/* Bottom Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Top gradient for readability */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

              {/* Location Tag */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1 text-[10px] text-zinc-300 bg-[#1A1A1A]/80 backdrop-blur-md border border-white/5 px-2.5 py-1 rounded-md">
                <MapPin className="h-2.5 w-2.5 text-[#E3B341]" />
                <span>{actor.location}</span>
              </div>

              {/* Card Contents */}
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-10" id={`featured-card-content-${actor.id}`}>
                {/* Name, rating and Region */}
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-zinc-300 text-[10px] tracking-wider uppercase bg-white/10 px-2 py-0.5 rounded mr-2 font-display">
                      {getRegionLabel(actor.region)}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">
                      {actor.name.split(' ')[0]}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-white font-display">{actor.rating}</span>
                  </div>
                </div>

                {/* Tags preview */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {actor.tags.slice(0, 2).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Licensing Price indicator */}
                <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-white/5">
                  <div>
                    <p className="text-[9px] text-[#AFAFAF] uppercase tracking-wider font-display">参考授权价</p>
                    <p className="text-sm font-bold text-amber-400 font-display">
                      ￥{actor.licensingPrice.toLocaleString()}<span className="text-[10px] text-zinc-400 font-normal">/年</span>
                    </p>
                  </div>
                  
                  {/* Subtle Action Prompt */}
                  <span className="text-xs text-[#E3B341] font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    详情 <span>→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
