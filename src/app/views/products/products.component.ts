import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { cilCart, cilPencil, cilX } from "@coreui/icons";
import { Product } from "../../models/product.model";
import { CartService } from "../../services/cart/cart.service";
import { CustomizeItemService } from "src/app/services/customize-item/customize-item.service";

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
        console.log(pc);
      });

    this.http
      .get<any>(
        "https://rosengrave-api-25bb9d185119.herokuapp.com/api/products"
      )
      .subscribe((products) => {
        console.log(products);
        this.products2 = products;
        // this.products = products;
      });
  }

  onProductView(index: number): void {
    this.products = this.productCategories[index].products;
  }

  onCustomizeProduct(product: Product): void {
    this.customizeItemService.toggleOffCanvas(true);
    this.customizeItemService.setProductToCustomize(product);
  }

  onTabChange($event: number) {
    this.activePane = 0;
    console.log("onTabChange", $event);
  }
}
