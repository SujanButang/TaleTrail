import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { UserModel } from "./UserModel";

@Table({
  timestamps: true,
  tableName: "relationships",
  modelName: "Relationships",
})
export class RelationshipModel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
  })
  declare follower_id: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
  })
  declare following_id: string;

  @BelongsTo(() => UserModel, "follower_id")
  declare follower: UserModel;

  @BelongsTo(() => UserModel, "following_id")
  declare following: UserModel;
}
