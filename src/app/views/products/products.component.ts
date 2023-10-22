import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { cilCart, cilPencil, cilX } from '@coreui/icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  public productCategories: Array<any> = [];
  public products: Array<any> = [];
  public icons: any;

  constructor(private http: HttpClient) {
    this.icons = { cilCart, cilX, cilPencil };
  }

  ngOnInit(): void {
    this.http.get<any>('http://api.rosengrave.com/api/product-categories')
      .subscribe((pc) => {
        this.productCategories = pc;
        console.log(pc);
      });
  }

  onProductView(index: number): void {
    console.log(index);
    this.products = this.productCategories[index].products;
  }
}
