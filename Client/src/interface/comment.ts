export interface IComment {
  id: string;
  blog_id: string;
  user_id: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    username: string;
    profile_image: string;
  };
}
