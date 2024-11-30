export interface BLOG_DATA {
  $id: string;
  title: string;
  description: string;
  image: string;
  $createdAt: string;
  status: false;
  documentId?: string; // Add this line
}
