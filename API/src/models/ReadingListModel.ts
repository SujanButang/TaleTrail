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
  tableName: "reading_lists",
  modelName: "ReadingLists",
})
export class ReadingListModel extends Model {
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
  declare blogId: string;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;

  @BelongsTo(() => UserModel)
  declare user: string;

  @BelongsTo(() => BlogModel)
  declare blog: string;
}
