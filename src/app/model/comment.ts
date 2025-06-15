export class Comment {
  constructor(
    public id: number,
    public foodId: number,
    public userName: string,
    public comment: string,
    public rating: number,
    public date: Date
  ) {}
}
