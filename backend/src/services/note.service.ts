import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from '../interfaces/note.interface';
import { CreateNoteDTO } from 'src/dtos/note.dto';

//Tại hàm khởi tạo có 1 cú pháp mới của TypeScript là private readonly.Đây là một cách ngắn để định nghĩa và khởi tạo thành viên Model cùng một lúc.
@Injectable()
export class NoteService {
  constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) {}
  async createANote(createNoteDTO: CreateNoteDTO): Promise<Note> {
    const newNote = await new this.noteModel(createNoteDTO);
    return newNote.save();
  }
  async getAllNotes(): Promise<Note[]> {
    const notes = await this.noteModel.find().exec();
    return notes;
  }
  async getANote(noteId): Promise<Note> {
    const note = await this.noteModel.findById(noteId).exec();
    return note;
  }
  async updateANote(_id, createNoteDTO: CreateNoteDTO): Promise<Note> {
    const note = await this.getANote(_id);
    await note.update(createNoteDTO);
    await note.save();
    return note;
  }
  async deleteANote(_id): Promise<any> {
    const note = await this.noteModel.findByIdAndRemove(_id);
    return note;
  }
}
