import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { cilCart, cilPencil, cilX } from '@coreui/icons';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  public productCategories: Array<any> = [];
  public products: Array<any> = [];
  public icons: any;

  constructor(private http: HttpClient,
    private cartService: CartService) {
    this.icons = { cilCart, cilX, cilPencil };
  }

  ngOnInit(): void {
    this.http.get<any>('https://rosengrave-api-25bb9d185119.herokuapp.com/api/product-categories')
      .subscribe((pc) => {
        this.productCategories = pc;
      });

  }

  onProductView(index: number): void {
    this.products = this.productCategories[index].products;
  }

  onAddToCart(product: Product): void {
    // console.log(product);
    this.cartService.addToCart(product);

    const cart = this.cartService.getCartItems();
    console.log(cart);
  }
}
