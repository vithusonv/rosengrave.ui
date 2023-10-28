import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  private offcanvasVisible: boolean = false;

  constructor(private cartService: CartService) {
    cartService.offcanvasVisible.subscribe((isVisible) => {
      this.offcanvasVisible = isVisible;
    });
  }
  
  ngOnInit(): void {
    const test = this.cartService.getCartItems();
    console.log(test);
  }
}
