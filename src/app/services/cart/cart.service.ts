import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Array<CartItem> = [];
  public offcanvasVisible = new BehaviorSubject<boolean>(false);
 
  constructor() {}

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find((item) => item.product.id === product.product_id);

    if(existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1});
    }
  }

  removeFromCart(item: CartItem): void {
    const index = this.cartItems.findIndex((i) => i.product.id === item.product.product_id);

    if(index !== -1) {
      if(this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.cartItems.splice(index, 1);          
      }
    }
  }

  toggleOffcanvas(): void {
    this.offcanvasVisible.next(!this.offcanvasVisible.value);
  }
}
