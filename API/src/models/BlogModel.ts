import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { TopicModel } from "./TopicModel";
import { UserModel } from "./UserModel";
import {
  CodeContent,
  HeadingContent,
  ImageContent,
  ParagraphContent,
} from "../interfaces/blogInterface";

type BlogContent = Array<
  ParagraphContent | HeadingContent | CodeContent | ImageContent
>;

@Table({
  timestamps: true,
  tableName: "blogs",
  modelName: "Blogs",
})
export class BlogModel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @ForeignKey(() => TopicModel)
  @Column({
    type: DataType.UUID,
  })
  declare topic: string;

  @Column({
    type: DataType.ARRAY(DataType.JSONB), // Specify the type as an array of JSONB
    allowNull: false,
  })
  declare content: BlogContent;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
  })
  declare author: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}
