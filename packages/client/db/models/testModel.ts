import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model } from 'sequelize-typescript';

@Table({
    timestamps: true,
    paranoid: true,
    tableName: 'test',
})
export default class TestModel extends Model<any> {
    @PrimaryKey
    @AllowNull(false)
    @AutoIncrement
    @Column(DataType.INTEGER)
    public override id: number;

    @Column(DataType.INTEGER)
    user_id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    body: string;
}
