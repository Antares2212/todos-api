import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './modules/todos.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/todos'), TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
