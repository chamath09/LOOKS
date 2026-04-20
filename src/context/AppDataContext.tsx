import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post, Category } from '../types';

// Initial Mock Data
const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    type: 'image',
    title: 'Minimalist Gel Extensions',
    description: 'Clean and elegant natural tone gel nails for everyday wear.',
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop',
    category: 'Nails',
    date: '2026-04-10T10:00:00Z',
    author: 'LOOKS Edit'
  },
  {
    id: '2',
    type: 'blog',
    title: 'The Return of 90s Streetwear',
    description: 'Why oversized silhouettes and chunky sneakers are dominating the streets again.',
    imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
    category: 'Streetwear',
    date: '2026-04-12T14:30:00Z',
    author: 'Sarah Chen',
    content: 'Streetwear has always been a reflection of youth culture, and right now, the 90s are back in full force. From the resurgence of baggy denim to the obsession with vintage graphics, comfort meets edge in today\'s urban fashion scene. \n\n### Key Pieces\n1. **Oversized Graphic Tees**: The bigger, the better. Look for faded washes and bold prints.\n2. **Cargo Pants**: Utility is key. Wide-leg cargos offer both comfort and styling versatility.\n3. **Chunky Sneakers**: The dad shoe trend has evolved, but thick soles remain a staple.',
    tags: ['90s', 'Urban', 'Sneakers', 'Trends']
  },
  {
    id: '3',
    type: 'image',
    title: 'Neutral Spring Outfit',
    description: 'Beige trench over a simple white tee and relaxed trousers.',
    imageUrl: 'https://images.unsplash.com/photo-1434389678232-04ce6ca10787?q=80&w=800&auto=format&fit=crop',
    category: 'Outfits',
    date: '2026-04-15T09:00:00Z',
    author: 'LOOKS Edit'
  },
  {
    id: '4',
    type: 'image',
    title: 'Gold Layered Chains',
    description: 'Delicate everyday jewelry to elevate any simple look.',
    imageUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop',
    category: 'Accessories',
    date: '2026-04-16T11:20:00Z',
    author: 'LOOKS Edit'
  },
  {
    id: '5',
    type: 'blog',
    title: 'Minimal Beauty Glow Up',
    description: 'Achieve the "no-makeup" makeup look with these 5 essential steps.',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bf84033054?q=80&w=800&auto=format&fit=crop',
    category: 'Beauty',
    date: '2026-04-18T16:00:00Z',
    author: 'Emma Davis',
    content: 'The "no-makeup" look is all about enhancing your natural features rather than covering them up. The key is hydration and lightweight formulas.\n\n### The Steps\n1. **Skin Prep**: Start with a deeply hydrating serum and moisturizer.\n2. **Tinted SPF**: Skip the heavy foundation and opt for a sheer tint.\n3. **Cream Blush**: Blend a rosy hue onto the apples of your cheeks for a healthy flush.\n4. **Brow Gel**: Brush up your brows to frame your face.\n5. **Lip Oil**: Finish with a glossy, nourishing lip oil.',
    tags: ['Skincare', 'Makeup', 'Natural', 'Tutorial']
  },
  {
    id: '6',
    type: 'image',
    title: 'Monochrome Street Vibe',
    description: 'All black everything. Leather jacket and cargo pants.',
    imageUrl: 'https://images.unsplash.com/photo-1511511450091-a67b5ebfeab2?q=80&w=800&auto=format&fit=crop',
    category: 'Streetwear',
    date: '2026-04-19T08:15:00Z',
    author: 'LOOKS Edit'
  },
  {
    id: '7',
    type: 'image',
    title: 'Chrome French Tips',
    description: 'Modern twist on a classic manicure using silver chrome powder.',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop',
    category: 'Nails',
    date: '2026-04-20T10:05:00Z',
    author: 'LOOKS Edit'
  },
   {
    id: '8',
    type: 'image',
    title: 'Structured Leather Tote',
    description: 'The ultimate carry-all bag for work and weekends.',
    imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop',
    category: 'Accessories',
    date: '2026-04-17T13:45:00Z',
    author: 'LOOKS Edit'
  }
];

interface AppDataContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  getPostsByCategory: (category: Category | 'All') => Post[];
  getPostById: (id: string) => Post | undefined;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const addPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const getPostsByCategory = (category: Category | 'All') => {
    if (category === 'All') return posts;
    return posts.filter(post => post.category === category);
  };

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  return (
    <AppDataContext.Provider value={{ posts, addPost, getPostsByCategory, getPostById }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
