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
  coverImage: string;
  topic: string;
  content: Array<
    | ParagraphContent
    | HeadingContent
    | CodeContent
    | ImageContent
    | EmbedContent
  >;
  author?: string;
}
