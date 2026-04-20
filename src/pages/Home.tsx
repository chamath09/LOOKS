import { useAppData } from '../context/AppDataContext';
import { MasonryGrid } from '../components/ui/MasonryGrid';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Home() {
  const { posts } = useAppData();

  // Split posts to inject the hero card visually
  const firstPosts = posts.slice(0, 4);
  const remainingPosts = posts.slice(4);

  return (
    <div className="space-y-6 pb-16">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4 w-full">
        {/* Bento Hero Section */}
        <section className="relative col-span-1 md:col-span-2 row-span-2 flex flex-col justify-center p-8 md:p-12 bg-accent rounded overflow-hidden">
          <div className="relative z-10 max-w-xl text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-light text-ink leading-[1.1] tracking-[-0.03em] mb-6"
            >
              Daily Fashion<br />
              Inspiration for<br />
              Everyone
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link 
                to="/category/outfits" 
                className="bg-ink text-white px-8 py-3 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-black inline-block"
              >
                Explore Styles
              </Link>
            </motion.div>
          </div>
        </section>

        {/* First few posts directly inside the main grid */}
        {firstPosts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`relative group bg-white border border-black/5 rounded overflow-hidden flex flex-col col-span-1 row-span-1`}
          >
            <Link to={post.type === 'blog' ? `/blog/${post.id}` : `/`} className="block w-full h-full"> 
              <div className="w-full h-full relative" style={{ backgroundColor: '#EEE' }}>
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  style={post.type === 'blog' ? { opacity: 0.8, mixBlendMode: 'multiply' } : {}}
                />
                <span className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-ink z-10 whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-32px)]">
                  {post.category} &bull; {post.type === 'blog' ? 'Blog' : 'Inspo'}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <MasonryGrid posts={remainingPosts} />

    </div>
  );
}
