import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { BlogModel } from "./BlogModel";
import { UserModel } from "./UserModel";

@Table({
  timestamps: true,
  tableName: "likes",
  modelName: "LikesModel",
})
export class LikeModel extends Model {
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

  @BelongsTo(() => UserModel)
  declare user: UserModel[];

  @BelongsTo(() => BlogModel)
  declare blog: BlogModel[];
}
