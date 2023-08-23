export default interface Product {
    name: string,
    price: number,
    category: string,
    description: string,
    image: string,
    quantity?: number,
    _id?: string,
    __v?: number
}