export interface IProduct{
    id: number;
    brand: string,
    model:string;
    type:string;
    price:number;
}
export interface IProductData {
    header: string;
    products:IProduct[];
}