export class Contact {
    constructor(
        public id: number,
        public firstName : String,
        public lastName : String,
        public email : String,
        public help : String,
        public isRead: boolean = false,  
        public archived: boolean = false  
    ){}
}
