export interface Animal {
  id: number;
  name: string;
  slug: string;
  numbers: number[];
  emoji: string;
  imageUrl?: string;
  puxadas: number[];
  history?: string;
  luckyNumber?: string;
  dreamMeaning?: string;
  pageTitle?: string;
  metaDescription?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  relatedSlugs: string[];
  emoji?: string;
  tags?: string[];
  readTime?: number;
  relatedAnimals?: {
    name: string;
    slug: string;
    emoji: string;
    group: string;
    numbers: string;
  }[];
}

export interface DrawResult {
  id: string;
  time: string;
  name: string;
  date: string;
  numbers: {
    position: number;
    value: string;
    animal: string;
  }[];
}
