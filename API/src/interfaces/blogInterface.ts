export interface ParagraphContent {
  type: "paragraph";
  text: string;
  position?: number; // Add position property
}

export interface HeadingContent {
  type: "heading";
  text: string;
  position?: number;
}

export interface CodeContent {
  type: "code";
  language: string;
  code: string;
  position?: number;
}

export interface ImageContent {
  type: "image";
  url: string;
  position?: number;
}

export interface IBlog {
  title: string;
  description: string;
  topic: string;
  coverImage: string;
  content: Array<
    ParagraphContent | HeadingContent | CodeContent | ImageContent
  >;
  author: string;
}

export interface IBlogRequest {
  body: {
    blog: IBlog;
  };
  query?: string;
}
