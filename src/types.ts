export interface Animal {
  id: number;
  name: string;
  slug: string;
  numbers: number[];
  emoji: string;
  imageUrl?: string;
  puxadas?: string[];
  history?: string;
  luckyNumber?: string;
  dreamMeaning?: string;
  pageTitle?: string;
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
