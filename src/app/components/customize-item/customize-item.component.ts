import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { cilCart, cilX } from "@coreui/icons";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart/cart.service";
import { CustomizeItemService } from "src/app/services/customize-item/customize-item.service";

@Component({
  selector: "app-customize-item",
  templateUrl: "./customize-item.component.html",
  styleUrls: ["./customize-item.component.scss"],
})
export class CustomizeItemComponent {
  public offCanvasVisible: boolean = false;
  public engravings: any; // TODO: make engraving interface
  public icons: any;
  public items = [1, 2, 3, 4];
  public design: any;
  public text: string | any;

  constructor(
    public customizeItemService: CustomizeItemService,
    private http: HttpClient,
    private cartService: CartService
  ) {
    this.customizeItemService.offCanvasVisible.subscribe((isVisible) => {
      this.offCanvasVisible = isVisible;
    });

    this.icons = { cilCart, cilX };
  }

  ngOnInit(): void {
    this.http
      .get("https://rosengrave-api-25bb9d185119.herokuapp.com/api/engravings")
      .subscribe((engravings) => {
        this.engravings = engravings;

        const noneOption = {
          predefined_engraving_id: "none",
          label: "None",
          image_secure_url:
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEUAAAD///8FBQXMzMzV1dXy8vIWFhaMjIz7+/tvb28qKiofHx/R0dE6Ojrx8fG6urqSkpIkJCQaGhrAwMANDQ3j4+NfX19mZmZ2dnZMTExtbW2vr685OTklJSWWlpbc3Nyfn59WVlaAgIBBQUG0tLQxMTGFhYWnp6dPT097e3t5H71fAAADiUlEQVR4nO3YbVfaMBTA8dyU0qo8CRSnMFHRMb//F1xuoKUwkoDD447n//OFC2YhNzcPTY0BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADfjv3qDlyaNa2grDGxEG37T+mRsPaE0TpS5dJjPB/ul8bx3kzf15NsPlokOvIzG7Vq3GrpeJPWPC57nZbJ7el9P8lC5LX5OjMVeQhWdb3pvpay0bmPNjsS+bHLeSFlN1Tz50D2PZ4ZQcrKtfmrmZ9dkatARe3uc+5qD5bLSuN8ijVbuAqLJomjSITXA1lmO73YJPoQF2Ep93VfwhHqonpw3Z48a+ntsWzl/ggXk1RNKZbD61xHeO+rTuv5qfo6MfK6FIvQ9HOdetsu9JciRbhZF5MbjVYpFmHhB7B2dggJLsKJSG9bikaY+UXq/uF+pmZc6TwMKWTgqo+aUirCT+Rm6Wyui8oPXmQdmueDpXcvMjShIS/cvHBDMNtMuUSEu4328hn0Obwyy+30i+XQDCW/2ftoInlwV3ARdt9KGVz7EE/P4SeEuNLg3nLJ/YyL5bDarauNO5Hn0L5Q6HBcuUNlWzpnp7kwn0PtbJU4LYwuq71wpnXmj/ARmrXIelOKnxa9RrDBj/MRWvOki8qYcTTCl4OE6ScBmwhNzx/8qRy2VKFqH7eN0C0qnSypHB5+ksihuRlIeZ+cpdXume39/AhSNhFa3fzL3+etw5nulQE+Qtes24Cr6Tnr8PI7Tb+OyW3+1Ti2l7qts7srWd1cBzfHKzc5tPqAOjl5L/2Um1sdoTUvIpmJRDjz5+G2Ey7AhV+64fNwG71O/5evPPHrCKfWuIN/HXum6bVmpUuiO9BX+vto9TqHVme3DP+HCLUvS93NwhGucinvmo519J4TfIxsIvT/TcovjHDR2hD7bucL7zTG3y2G/l44Hg3id4uitUbfXavR8/DwbnHZ5bjaZU2vR2XkBuweDPReWHWypf5ex3aGdoQ6/cvg852eFq37YTYM7l4ftGjNS2seE3f88aQ5mmcmHmHzEOsqdYI5tOZ278SXv0/dfzYf1l+us2MeGUI/e8bFa9aZPMXfYbjMZO2XEeH3NM5nv6dRNlL6Bva3w/Qd2yZeOTbt7Dd7atXLX58OQkq9RrCbO745L9U2FeJBbQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvrk/vhAfSDTOxmIAAAAASUVORK5CYII=",
          image_url:
            "https://w7.pngwing.com/pngs/449/160/png-transparent-error-inoperative-invalid-none-nothing-null-void-pinpoint-notification-icon-thumbnail.png",
        };

        this.engravings.unshift(noneOption);
      });
  }

  onEngravingSelect(design: any): void {
    this.design = design;
  }

  toggleCustomization(visible: boolean): void {
    this.customizeItemService.toggleOffCanvas(visible);
  }

  onTextChange(text: string): void {
    this.text = text;
  }

  onAddToCart(): void {
    this.cartService.addToCart(this.getProduct(), this.design, this.text);
    this.customizeItemService.toggleOffCanvas(false);
  }

  getProduct() {
    return this.customizeItemService.product.getValue();
  }
}
