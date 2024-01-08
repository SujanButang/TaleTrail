import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "topics",
  modelName: "Topics",
})
export class TopicModel extends Model {
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
  declare topic: string;
}

export const topicExists = async (topic: string): Promise<boolean> => {
  const topicExist = await TopicModel.findOne({ where: { topic } });
  if (topicExist) return true;
  return false;
};

export const newTopic = async (topic: string) => {
  await TopicModel.create({
    topic: topic,
  });
};
