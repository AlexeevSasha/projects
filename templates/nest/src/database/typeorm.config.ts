import { ConfigModule } from "@nestjs/config";
import { DataSource } from "typeorm";
import { join } from "path";

ConfigModule.forRoot();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, "..", "**", "*.entity{.ts,.js}")],
  synchronize: false,
  logging: true,
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
});
