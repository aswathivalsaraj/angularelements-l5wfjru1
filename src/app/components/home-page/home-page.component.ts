import { Component, OnInit } from '@angular/core';
import { IProduct, IProductData } from 'src/app/models/products.models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public title!: string;
  public products: IProduct[];
  public activeProducts: IProduct[] = [];
  public deletedProducts: IProduct[] = [];
  public totalProductCost: number = 0;
  public totalSelected: number = 0;
  public totalForDeleted: number =0;
  constructor(private product: ProductsService) { this.products = []; }

  ngOnInit(): void {
    this.product.getProducts().subscribe((data: IProductData)=>{
      this.products = data.products;
      this.activeProducts = [...this.products];
      this.totalProductCost = this.products.map(i=>i.price).reduce((a,b)=>a+b, 0);
      this.totalSelected = this.totalProductCost;
      this.title = data.header;
    });
  }
  public deleteItem(itemId: IProduct["id"]): void {
    const selectedItem:IProduct |undefined = this.activeProducts.find(x => x.id === itemId)
    const found = this.deletedProducts.some(el => el.id === itemId);
    if (!found && selectedItem) {
      this.deletedProducts.push(selectedItem);
      this.activeProducts.splice(
        this.activeProducts.indexOf(selectedItem), 1
      );
      this.updateTotalCost();
    }
  }
  public restoreItem(itemId: IProduct["id"]): void{
    const selectedItem:IProduct |undefined = this.products.find(x => x.id === itemId)
    const found = this.activeProducts.some(el => el.id === itemId);
    if (!found && selectedItem) {
      this.activeProducts.push(selectedItem);
      this.deletedProducts.splice(
        this.deletedProducts.indexOf(selectedItem), 1
      );
      this.updateTotalCost();
    }    
  }
  private updateTotalCost(): void {
   // this.totalSelected = this.activeProducts.map(i=>i.price).reduce((a,b)=>a+b, 0);
   // this.totalForDeleted = this.deletedProducts.map(i=>i.price).reduce((a,b)=>a+b, 0);
    this.totalSelected = this.activeProducts.map(item => item.type).reduce((acc:any, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});
    this.totalForDeleted = this.deletedProducts.map(item => item.type).reduce((acc:any, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {}); 
    console.log(this.totalForDeleted);
  }
}
