import { IUser } from "./user";

export interface ParagraphContent {
  type: "paragraph";
  text: string;
  // Add position property
}

export interface HeadingContent {
  type: "heading";
  text: string;
}
export interface EmbedContent {
  type: "embed";
  url: string;
}

export interface CodeContent {
  type: "code";
  language: string;
  code: string;
}

export interface ImageContent {
  type: "image";
  url: string;
}

export interface IBlog {
  title: string;
  description: string;
  cover_image: string;
  topic: string;
  content: Array<
    | ParagraphContent
    | HeadingContent
    | CodeContent
    | ImageContent
    | EmbedContent
  >;
  author: IUser;
  created_at:Date;
}

export interface IBlogSubmit{
  title: string;
  description: string;
  cover_image: string;
  topic: string;
  content: Array<
    | ParagraphContent
    | HeadingContent
    | CodeContent
    | ImageContent
    | EmbedContent
  >;
}
