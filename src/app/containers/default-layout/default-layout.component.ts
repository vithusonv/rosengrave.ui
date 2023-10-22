import { Component } from '@angular/core';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  public navItems = navItems;
  public visible: boolean = true;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = false;
    }, 10000)
  }

  ngAfterViewInit(): void {
    document.querySelector('body')?.requestFullscreen();
  }
}
