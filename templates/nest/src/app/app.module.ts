import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "src/database/typeorm.config";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot(AppDataSource.options), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
