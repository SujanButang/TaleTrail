import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { BlogModel } from "./BlogModel";

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "Users",
})
export class UserModel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare profile_image: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare verified: boolean;

  @HasMany(() => BlogModel)
  declare blogs: BlogModel[];

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}


export const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ where: { email } });
  return user;
};
