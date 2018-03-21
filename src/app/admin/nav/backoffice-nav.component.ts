import { Component } from '@angular/core';

@Component({
  selector: 'app-backoffice-nav',
  templateUrl: './backoffice-nav.component.html',
  styleUrls: ['./backoffice-nav.component.scss']
})
export class BackOfficeNavComponent {
  constructor() { }
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  isActive(state: string) { }
}
