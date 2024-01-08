import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "token_blocklist",
  modelName: "TokenBlockList",
})
export class TokenBlockModel extends Model {
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
  declare access_token: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare refresh_token: string;
}

export const accessBlacklisted = async (token: string): Promise<boolean> => {
  const accessToken = await TokenBlockModel.findOne({
    where: { access_token: token },
  });
  if (accessToken) {
    return true;
  }
  return false;
};

export const refreshBlacklisted = async (token: string): Promise<boolean> => {
  const accessToken = await TokenBlockModel.findAll({
    where: { refresh_token: token },
  });
  if (accessToken) {
    return true;
  }
  return false;
};
