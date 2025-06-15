export class Food {
    constructor(
        public id : number,
        public name : string,
        public type: string,
        public ingredients: string,
        public image :string,
        public price : number,
        // public comments ?: Commentaire[]
    ){}
}
