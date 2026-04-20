import { useParams, Navigate, Link } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { Facebook, Twitter, Link as LinkIcon, ChevronLeft } from 'lucide-react';
import { BlogPost as BlogPostType } from '../types';

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { getPostById } = useAppData();

  const post = getPostById(id || '');

  if (!post || post.type !== 'blog') {
    return <Navigate to="/blog" replace />;
  }

  const blogPost = post as BlogPostType;

  // Simple markdown-ish rendering for the mock content
  const renderContent = (content: string) => {
    const paragraphs = content.split('\n').filter(p => p.trim() !== '');
    return paragraphs.map((p, i) => {
      if (p.startsWith('### ')) {
        return <h3 key={i} className="text-2xl font-serif text-stone-900 mt-8 mb-4">{p.replace('### ', '')}</h3>;
      }
      if (p.match(/^\d+\.\s/)) {
        // Simple numbered list item
        const text = p.replace(/^\d+\.\s(\*\*(.*?)\*\*:\s)?/, (match, p1, p2) => {
           return p2 ? `<strong class="text-stone-900">${p2}:</strong> ` : '';
        });
        return <li key={i} className="ml-4 mb-2 text-stone-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: text }} />;
      }
      return <p key={i} className="mb-6 text-stone-700 leading-relaxed whitespace-pre-wrap">{p}</p>;
    });
  };

  return (
    <article className="max-w-3xl mx-auto py-8">
      
      <Link to="/blog" className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Journal
      </Link>

      <header className="text-center space-y-6 mb-12">
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-wider text-stone-500"
        >
          <Link to={`/category/${blogPost.category.toLowerCase()}`} className="hover:text-stone-900 transition-colors">
            {blogPost.category}
          </Link>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <span>{format(new Date(blogPost.date), 'MMMM d, yyyy')}</span>
        </motion.div>
        
        <motion.h1 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 leading-tight"
        >
          {blogPost.title}
        </motion.h1>
        
        <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="text-stone-500"
        >
          By <span className="font-medium text-stone-700">{blogPost.author}</span>
        </motion.p>
      </header>

      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.3, duration: 0.6 }}
         className="w-full aspect-[21/9] sm:aspect-[16/9] mb-12 rounded-2xl overflow-hidden shadow-sm"
      >
        <img
          src={blogPost.imageUrl}
          alt={blogPost.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="prose prose-stone max-w-none text-lg">
        {renderContent(blogPost.content)}
      </div>

      <footer className="mt-16 pt-8 border-t border-stone-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l pl-4 border-stone-200">
            <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">Share</span>
            <button className="p-2 text-stone-400 hover:text-stone-900 transition-colors bg-stone-50 rounded-full" aria-label="Share link">
               <LinkIcon className="w-4 h-4" />
            </button>
            <button className="p-2 text-stone-400 hover:text-[#1DA1F2] transition-colors bg-stone-50 rounded-full" aria-label="Share to Twitter">
               <Twitter className="w-4 h-4" />
            </button>
            <button className="p-2 text-stone-400 hover:text-[#4267B2] transition-colors bg-stone-50 rounded-full" aria-label="Share to Facebook">
               <Facebook className="w-4 h-4" />
            </button>
          </div>

        </div>
      </footer>
    </article>
  );
}
