import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteModule } from './modules/note.modules';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/cruds'), NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
