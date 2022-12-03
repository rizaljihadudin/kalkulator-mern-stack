import { Sequelize } from "sequelize";

const db = new Sequelize('kalkulator_mern', 'root', '', {
    host    : "localhost",
    dialect : "mysql"
});

export default db;