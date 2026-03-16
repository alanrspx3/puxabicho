export interface Animal {
  id: number;
  name: string;
  numbers: number[];
  emoji: string;
  puxadas?: string[];
  history?: string;
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
