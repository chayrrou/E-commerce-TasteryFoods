export class Food {
    constructor(
        public id : number,
        public name : String,
        public type: String,
        public ingredients: String,
        public image :String,
        public price : number,
        public disponible : boolean,
        // public comments ?: Commentaire[]
    ){}
}
