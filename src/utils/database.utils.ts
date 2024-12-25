import { DataSource } from "typeorm";
import config from "../config";
import { User } from "../entities/User";
import { Wallet } from "../entities/Wallet";
import { Transaction } from "../entities/Transaction";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  synchronize: true, // Set to false in production
  logging: false,
  entities: [User, Wallet, Transaction],
  // entities: [`${__dirname}/../entities/*.ts`],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
