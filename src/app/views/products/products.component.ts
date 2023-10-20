import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { cilCart, cilX } from '@coreui/icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  public productCategories: Array<any> = [];
  public icons: any;

  constructor(private http: HttpClient) {
    this.icons = { cilCart, cilX };
  }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:4000/api/product-categories')
      .subscribe((pc) => {
        this.productCategories = pc;
        console.log(pc);
      });
  }
}
