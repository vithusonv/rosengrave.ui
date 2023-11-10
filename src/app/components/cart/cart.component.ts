import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { CartItem } from "src/app/models/cart-item.model";
import { CartService } from "src/app/services/cart/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent {
  public offcanvasVisible: boolean = false;
  public cartItemsSubscription: Subscription = Subscription.EMPTY;
  public cartItems: Array<CartItem> = [];

  constructor(private cartService: CartService) {
    cartService.offcanvasVisible.subscribe((isVisible) => {
      this.offcanvasVisible = isVisible;
    });

    this.cartItemsSubscription = this.cartService.cartItems$.subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
        console.log(cartItems);
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.cartItemsSubscription.unsubscribe();
  }

  toggleCart(visible: boolean): void {
    this.cartService.toggleOffcanvas(visible);
  }

  getTotalCartPrice(): string {
    return this.cartService.getTotalPrice();
  }
}
