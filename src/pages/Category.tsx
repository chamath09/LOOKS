import { useParams, Navigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { MasonryGrid } from '../components/ui/MasonryGrid';
import { Category } from '../types';
import { motion } from 'motion/react';

const CATEGORY_MAP: Record<string, Category> = {
  'nails': 'Nails',
  'outfits': 'Outfits',
  'streetwear': 'Streetwear',
  'accessories': 'Accessories',
  'beauty': 'Beauty',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'nails': 'Nail designs, gel extensions, and minimalist manicures.',
  'outfits': 'Curated men & women outfit ideas for every occasion.',
  'streetwear': 'Urban fashion, sneakers, and modern street aesthetics.',
  'accessories': 'Elevate your look with bags, jewelry, and shoes.',
  'beauty': 'Makeup tutorials, glow ups, and skincare routines.',
};

export function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { getPostsByCategory } = useAppData();

  if (!id || !CATEGORY_MAP[id]) {
    return <Navigate to="/" replace />;
  }

  const category = CATEGORY_MAP[id];
  const posts = getPostsByCategory(category);
  const description = CATEGORY_DESCRIPTIONS[id];

  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto py-12">
        <motion.h1 
          key={category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-stone-900 mb-4"
        >
          {category}
        </motion.h1>
         <motion.p 
          key={`${category}-desc`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-stone-500 text-lg"
        >
          {description}
        </motion.p>
      </div>

      {posts.length > 0 ? (
        <MasonryGrid posts={posts} />
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-100">
          <p className="text-stone-500">No inspiration found for this category yet.</p>
        </div>
      )}
    </div>
  );
}
