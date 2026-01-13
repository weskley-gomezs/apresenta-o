
export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  author?: string;
  content: string[];
  highlight?: string;
  quote?: string;
  isTitleSlide?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}