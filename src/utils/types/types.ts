export type Article = {
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  image: string | null; 
  publishedAt: string | null; 
  source: {
    name: string;
    url: string;
  };
};
