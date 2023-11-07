import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Array<CartItem> = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  private totalCartPrice: number = 0;

  public cartItems$ = this.cartItemsSubject.asObservable();
  public offcanvasVisible = new BehaviorSubject<boolean>(false);

  constructor() { }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: Product | any, design: any, text: string) {
    const existingItem = this.cartItems.find((item) => item.product.product_id === product.product_id
      && item.design.predefined_engraving_id === design.predefined_engraving_id
      && item.text === text
    );

    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.product.product_price * existingItem.quantity;
    } else {
      const newItem: CartItem = {
        product,
        quantity: 1,
        totalPrice: product.product_price,
        design,
        text
      }

      this.cartItems.push(newItem);
    }

    // update the total price
    this.calculateTotalPrice();

    // update the cart items subject to trigger updates
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(item: CartItem): void {
    const index = this.cartItems.findIndex((i) => i.product.product_id === item.product.product_id);

    if (index !== -1) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.cartItems.splice(index, 1);
      }
    }
  }

  toggleOffcanvas(visible: boolean): void {
    this.offcanvasVisible.next(visible);
  }

  getTotalPrice(): string {
    return this.totalCartPrice.toFixed(2);
  }

  private calculateTotalPrice(): void {
    this.totalCartPrice = this.cartItems.reduce((total, item) => {
      return total + item.product.product_price * item.quantity;
    }, 0);
  }
}
