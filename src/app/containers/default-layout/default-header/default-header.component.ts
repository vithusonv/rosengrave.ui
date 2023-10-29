import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { mainItems } from '../_nav';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public navItems: Array<any> = mainItems;

  constructor(private classToggler: ClassToggleService,
    private cartService: CartService) {
    super();
  }

  onViewCart(): void {
    this.cartService.toggleOffcanvas(true);
  }
}
