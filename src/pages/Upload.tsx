import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import { Category, Post } from '../types';
import { motion } from 'motion/react';
import { ImagePlus, Type } from 'lucide-react';

export function Upload() {
  const navigate = useNavigate();
  const { addPost } = useAppData();
  
  const [type, setType] = useState<'image' | 'blog'>('image');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<Category>('Outfits');
  const [content, setContent] = useState(''); // for blog

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    const newPost: Post = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      title,
      description,
      imageUrl,
      category,
      date: new Date().toISOString(),
      author: 'Guest Contributor', // mock author
      ...(type === 'blog' ? { content, tags: [] } : {})
    } as Post;

    addPost(newPost);
    navigate(type === 'blog' ? '/blog' : `/category/${category.toLowerCase()}`);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-stone-900 mb-2">Create New Post</h1>
          <p className="text-stone-500">Share your style or write a journal entry.</p>
        </div>

        <div className="flex bg-stone-100 p-1 rounded-full mb-8">
          <button
            type="button"
            onClick={() => setType('image')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all ${
              type === 'image' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <ImagePlus className="w-4 h-4" /> Image Pin
          </button>
          <button
            type="button"
            onClick={() => setType('blog')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all ${
              type === 'blog' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Type className="w-4 h-4" /> Journal Entry
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-stone-700 mb-2">Title</label>
            <input
              type="text"
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all bg-stone-50 focus:bg-white"
              placeholder="e.g., Summer Linen Must-Haves"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-stone-700 mb-2">Image URL</label>
            <input
              type="url"
              id="imageUrl"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all bg-stone-50 focus:bg-white"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="col-span-2 md:col-span-1">
              <label htmlFor="category" className="block text-sm font-medium text-stone-700 mb-2">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all bg-stone-50 focus:bg-white appearance-none"
              >
                <option value="Nails">Nails</option>
                <option value="Outfits">Outfits</option>
                <option value="Streetwear">Streetwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Beauty">Beauty</option>
              </select>
            </div>
            <div className="col-span-2 md:col-span-1">
               <label htmlFor="description" className="block text-sm font-medium text-stone-700 mb-2">Short Description</label>
                <input
                  type="text"
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all bg-stone-50 focus:bg-white"
                  placeholder="A brief summary..."
                />
            </div>
          </div>

          {type === 'blog' && (
             <div>
              <label htmlFor="content" className="block text-sm font-medium text-stone-700 mb-2">Content (Markdown supported)</label>
              <textarea
                id="content"
                required
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all bg-stone-50 focus:bg-white resize-none"
                placeholder="Write your article here..."
              />
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 transition-colors"
            >
              Publish {type === 'image' ? 'Image' : 'Journal Entry'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
