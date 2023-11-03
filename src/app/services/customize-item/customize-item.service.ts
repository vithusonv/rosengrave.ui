import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CustomizeItemService {

  public offCanvasVisible = new BehaviorSubject<boolean>(false);
  public product = new BehaviorSubject<Product | undefined>(undefined);

  constructor(private http: HttpClient) { }

  toggleOffCanvas(visible: boolean): void {
    this.offCanvasVisible.next(visible);
  }

  setProductToCustomize(product: Product): void {
    // this.http.get('');
    console.log(product);
    this.product.next(product);
  }
}
