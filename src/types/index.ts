export type Category = 'Nails' | 'Outfits' | 'Streetwear' | 'Accessories' | 'Beauty' | 'All';

export type PostType = 'image' | 'blog';

export interface BasePost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
  date: string;
  author: string;
}

export interface ImagePost extends BasePost {
  type: 'image';
}

export interface BlogPost extends BasePost {
  type: 'blog';
  content: string;
  tags: string[];
}

export type Post = ImagePost | BlogPost;
