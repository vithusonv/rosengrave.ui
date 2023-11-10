import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { cilCart, cilPencil, cilX } from "@coreui/icons";
import { Product } from "../../models/product.model";
import { CustomizeItemService } from "src/app/services/customize-item/customize-item.service";
import {
  ALL_CATEGORIES,
  ProductCategories,
} from "../../models/product-categories.model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent {
  public icons: any;
  public activePane: number = 0;
  public allProducts: Array<Product> = new Array();
  public filteredProducts: Array<Product> = new Array();
  public productCategories: Array<ProductCategories> = new Array();

  constructor(
    private http: HttpClient,
    private customizeItemService: CustomizeItemService
  ) {
    this.icons = { cilCart, cilX, cilPencil };
  }

  ngOnInit(): void {
    this.http
      .get<any>(
        "https://rosengrave-api-25bb9d185119.herokuapp.com/api/product-categories"
      )
      .subscribe((productCategories) => {
        this.productCategories = productCategories;
        this.productCategories.unshift(ALL_CATEGORIES);
      });

    this.http
      .get<any>(
        "https://rosengrave-api-25bb9d185119.herokuapp.com/api/products"
      )
      .subscribe((products) => {
        this.allProducts = products;
        // set filtered products to all products initiallyß
        this.filteredProducts = [...this.allProducts];
      });
  }

  onProductView(index: number): void {
    this.filteredProducts = this.productCategories[index].products;
  }

  onCustomizeProduct(product: Product): void {
    this.customizeItemService.toggleOffCanvas(true);
    this.customizeItemService.setProductToCustomize(product);
  }

  onTabChange($event: number) {
    if ($event === 0) {
      this.filteredProducts = this.allProducts;
    }
  }

  onSortProducts(event: Event) {
    switch ((event.target as HTMLSelectElement).value) {
      case "0":
        this.filteredProducts.sort((a, b) =>
          a.product_name.localeCompare(b.product_name)
        );
        break;
      case "1":
        this.filteredProducts.sort((a, b) =>
          b.product_name.localeCompare(a.product_name)
        );
        break;
      case "2":
        this.filteredProducts.sort((a, b) => {
          return a.product_price - b.product_price;
        });
        break;
      case "3":
        this.filteredProducts.sort((a, b) => {
          return b.product_price - a.product_price;
        });
        break;
      default:
        this.filteredProducts = this.allProducts;
        break;
    }
  }
}
