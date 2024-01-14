import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { BlogModel } from "./BlogModel";
import { UserModel } from "./UserModel";

@Table({
  timestamps: true,
  tableName: "comments",
  modelName: "Comments",
})
export class CommentModel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => BlogModel)
  @Column({
    type: DataType.UUID,
  })
  declare blog_id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
  })
  declare user_id: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare comment: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @BelongsTo(() => BlogModel)
  declare blog: BlogModel[];

  @BelongsTo(() => UserModel)
  declare user: UserModel[];
}
