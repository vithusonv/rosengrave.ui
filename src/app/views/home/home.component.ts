import { Component } from "@angular/core";
import { cil3d, cilCart, cilX } from "@coreui/icons";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  public slides: any[] = new Array(3).fill({
    id: -1,
    src: "",
    title: "",
    subtitle: "",
  });
  public icons: any;
  public products: any;
  public selectedProduct: any;
  public materials: any;
  public engravings: any;

  constructor(private http: HttpClient) {
    this.icons = { cilCart, cil3d };
  }

  ngOnInit(): void {
    this.http
      .get("http://localhost:4000/api/products")
      .subscribe((products) => {
        this.products = products;
      });

    this.http
      .get("http://localhost:4000/api/engravings")
      .subscribe((engravings) => {
        this.engravings = engravings;
      });

    this.slides[0] = {
      id: 0,
      src: "../../../assets/img/cheeseboard.jpg",
      title: "First slide",
      subtitle: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    };
    this.slides[1] = {
      id: 1,
      src: "../../../assets/img/coasters.jpg",
      title: "Second slide",
      subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    };
    this.slides[2] = {
      id: 2,
      src: ".../../../assets/img/family_board.jpg",
      title: "Third slide",
      subtitle:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    };
  }

  setProductToCustomize(index: number): void {
    this.selectedProduct = this.products[index];
    this.http
      .get(
        `http://localhost:4000/api/product-customizations/${this.selectedProduct.product_id}/1`
      )
      .subscribe((material) => {
        this.materials = material;
      });
  }
}
