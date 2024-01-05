import { Sequelize } from 'sequelize-typescript';
import TestModel from './models/testModel.ts';
const createDbAndConnect = async () => {
    try {
        const sequelizeOptions = {
            username: 'postgres',
            host: 'localhost', // Вот тут понять как менять на 'localhost' если запускаем через yarn dev,
            database: 'postgres',
            password: 'postgres',
            port: 5432,
            dialect: 'postgres',
        };

        const sequelize = new Sequelize(sequelizeOptions);

        const res = await sequelize.query('SELECT NOW()');
        console.log('  ➜ 🎸 Connected to the database at:', res);

        sequelize.addModels([TestModel]);
        await sequelize.sync({ force: true });
        return sequelize;
    } catch (error) {
        console.log(`ERRRIR`, error);
    }
};

export default createDbAndConnect;
