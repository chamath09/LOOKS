import { useAppData } from '../context/AppDataContext';
import { Link } from 'react-router-dom';
import { BlogPost as BlogPostType } from '../types';
import { format } from 'date-fns';
import { motion } from 'motion/react';

export function BlogList() {
  const { posts } = useAppData();
  
  const blogPosts = posts.filter((p): p is BlogPostType => p.type === 'blog');

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="py-8 border-b border-black/5">
        <h1 className="text-4xl md:text-5xl font-light text-ink tracking-tight mb-4">The Journal</h1>
        <p className="text-muted text-sm">In-depth fashion analysis, trends, and lifestyle styling.</p>
      </div>

      <div className="space-y-10">
        {blogPosts.map((post, i) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group grid md:grid-cols-2 gap-8 items-center bg-white border border-black/5 rounded overflow-hidden p-6"
          >
            <Link to={`/blog/${post.id}`} className="block overflow-hidden rounded relative h-[250px] bg-accent/30">
               <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 will-change-transform mix-blend-multiply"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
            </Link>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.05em] text-muted">
                <span>{post.category}</span>
                <span className="w-1 h-1 rounded-full bg-black/10" />
                <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
              </div>
              
              <Link to={`/blog/${post.id}`}>
                <h2 className="text-2xl md:text-3xl font-light text-ink group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-ink/70 leading-relaxed text-sm line-clamp-3">
                {post.description}
              </p>
              
              <div className="pt-2">
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.1em] text-ink hover:opacity-70 transition-colors"
                >
                  Read full article &rarr;
                </Link>
              </div>
            </div>
          </motion.article>
        ))}

        {blogPosts.length === 0 && (
          <div className="text-center py-20 text-muted">
            No journal entries yet.
          </div>
        )}
      </div>
    </div>
  );
}
