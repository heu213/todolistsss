//DTO (đối tượng truyền dữ liệu) mô tả yêu cầu mong đợi sẽ trông như thế nào
export class CreateNoteDTO {
  name: string;
  description: string;
  createdAt: Date;
}
