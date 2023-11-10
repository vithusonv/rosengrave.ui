import { Product } from "src/app/models/product.model";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { cilCart, cilPencil } from "@coreui/icons";
import { CustomizeItemService } from "src/app/services/customize-item/customize-item.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent {
  public product: Product | any;
  public icons: any;
  private destroy$ = new Subject<void>();

  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private customizeItemService: CustomizeItemService
  ) {
    this.icons = { cilPencil, cilCart };
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const productId = params["productId"];
      this.http
        .get<any>(
          `https://rosengrave-api-25bb9d185119.herokuapp.com/api/products/${productId}`
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (product) => {
            this.product = product;
            console.log(product);
          },
          error: () => {
            this.product = null;
          },
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCustomizeProduct(product: Product): void {
    this.customizeItemService.toggleOffCanvas(true);
    this.customizeItemService.setProductToCustomize(product);
  }
}
