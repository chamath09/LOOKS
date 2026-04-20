import { Post } from '../../types';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';
import { clsx } from 'clsx';

interface MasonryGridProps {
  posts: Post[];
}

export function MasonryGrid({ posts }: MasonryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4 w-full">
      {posts.map((post, i) => {
        const isLarge = i % 5 === 0;

        return (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={clsx(
              "relative group bg-white border border-black/5 rounded overflow-hidden flex flex-col",
              isLarge && post.type === 'blog' ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1"
            )}
          >
            {post.type === 'image' ? (
              <Link to={`/`} className="block w-full h-full"> 
                <div className="w-full h-full relative bg-gray-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 will-change-transform"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  
                  <span className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-ink z-10 whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-32px)]">
                    {post.category} &bull; {post.title}
                  </span>
                </div>
              </Link>
            ) : (
              <Link to={`/blog/${post.id}`} className="block relative w-full h-full">
                <div className="w-full h-full relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 will-change-transform opacity-70 mix-blend-multiply"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    style={{ backgroundColor: isLarge ? '#C4A484' : '#EAE3D9' }}
                  />
                  
                  <div className={clsx(
                    "absolute flex flex-col z-10",
                    isLarge ? "p-6 bottom-0 left-0" : "bottom-4 left-4 p-0 right-4"
                  )}>
                    {isLarge ? (
                      <>
                        <div className="text-[10px] uppercase font-bold tracking-[0.05em] text-ink/80 mb-2">
                          Latest from the Blog
                        </div>
                        <div className="text-2xl font-light text-ink drop-shadow-sm font-sans">
                          {post.title}
                        </div>
                      </>
                    ) : (
                      <span className="bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-ink z-10 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                        Blog &bull; {post.title}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
