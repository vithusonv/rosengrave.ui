import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { cilCart, cilPencil, cilX } from "@coreui/icons";
import { Product } from "../../models/product.model";
import { CartService } from "../../services/cart/cart.service";
import { CustomizeItemService } from "src/app/services/customize-item/customize-item.service";
import { ALL_CATEGORIES } from "../../models/product-categories.model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent {
  public productCategories: Array<any> = [];
  public products: Array<any> = [];
  public icons: any;
  public activePane: number = 0;
  public products2: any;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private customizeItemService: CustomizeItemService
  ) {
    this.icons = { cilCart, cilX, cilPencil };
  }

  ngOnInit(): void {
    this.http
      .get<any>(
        "https://rosengrave-api-25bb9d185119.herokuapp.com/api/product-categories"
      )
      .subscribe((pc) => {
        this.productCategories = pc;
        this.productCategories.unshift(ALL_CATEGORIES);
      });

    this.http
      .get<any>(
        "https://rosengrave-api-25bb9d185119.herokuapp.com/api/products"
      )
      .subscribe((products) => {
        this.products2 = products;
        console.log(this.products2);
      });
  }

  onProductView(index: number): void {
    this.products = this.productCategories[index].products;
    console.log(this.products);
  }

  onCustomizeProduct(product: Product): void {
    this.customizeItemService.toggleOffCanvas(true);
    this.customizeItemService.setProductToCustomize(product);
  }

  onTabChange($event: number) {
    this.activePane = 0;
  }

  onSort(event: Event) {
    switch ((event.target as HTMLSelectElement).value) {
      case "0":
        this.products.sort((a, b) => {
          return a.product_name === b.product_name
            ? 0
            : a.product_name < b.product_name
            ? -1
            : 1;
        });
        this.products2.sort((a: any, b: any) => {
          return a.product_name === b.product_name
            ? 0
            : a.product_name < b.product_name
            ? -1
            : 1;
        });
        break;
      case "1":
        this.products.sort((a, b) => {
          return a.price - b.price;
        });
        break;
      case "2":
        this.products.sort((a, b) => {
          return b.price - a.price;
        });
        break;
    }
  }
}
