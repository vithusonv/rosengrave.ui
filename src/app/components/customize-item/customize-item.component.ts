import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { cilCart, cilX } from '@coreui/icons';
import { CustomizeItemService } from 'src/app/services/customize-item/customize-item.service';

@Component({
  selector: 'app-customize-item',
  templateUrl: './customize-item.component.html',
  styleUrls: ['./customize-item.component.scss']
})
export class CustomizeItemComponent {

  public offCanvasVisible: boolean = false;
  public engravings: any; // TODO: make engraving interface
  public icons: any;
  items = [1, 2, 3, 4];
  
  constructor(private customizeItemService: CustomizeItemService,
    private http: HttpClient) {
    this.customizeItemService.offCanvasVisible.subscribe((isVisible) => {
      this.offCanvasVisible = isVisible;
    });

    this.icons = { cilCart, cilX };
  }

  ngOnInit(): void {
    this.http.get('https://rosengrave-api-25bb9d185119.herokuapp.com/api/engravings')
    .subscribe((engravings) => {
      this.engravings = engravings;
      console.log('*** Engravings: ', engravings);
    });
  }

  toggleCustomization(visible: boolean): void {
    this.customizeItemService.toggleOffCanvas(visible);
  }
}
