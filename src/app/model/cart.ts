export class Cart {
    constructor (
        public id: number,
        public name: string,
        public image: string,
        public price: number,
        public quantity: number = 1
    ) {}
}
