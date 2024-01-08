
export interface ParagraphContent {
  type: "paragraph";
  text: string;
}

export interface HeadingContent {
  type: "heading";
  text: string;
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
  topic: string;
  content: Array<
    ParagraphContent | HeadingContent | CodeContent | ImageContent
  >;
  author: string;
}

export interface IBlogRequest  {
  body: {
    blog: IBlog;
  };
}
