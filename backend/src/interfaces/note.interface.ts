//1 interface xác định loại giá trị (kiểm tra kiểu) mà ứng dụng phải tuân theo / nhận.
//Từ khóa readonly mô tả rằng các giá trị có thể được truy cập bên ngoài lớp nhưng không thể sửa đổi.
import { Document } from 'mongoose';
export interface Note extends Document {
  readonly name: string;
  readonly description: string;
  readonly createAt: Date;
}
