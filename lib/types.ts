export interface PostData {
  id: string;
  body: string;
  frontMatter: {
    name: string;
    description: string;
    category: string;
    updated: string;
  };
}
