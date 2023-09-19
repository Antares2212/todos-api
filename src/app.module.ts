import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { TodosModule } from './modules/todos.module';
import { AllExeptionFilter } from './exceptions/all-exceptions';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/todos'), TodosModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExeptionFilter
    }
  ],
})
export class AppModule {}
