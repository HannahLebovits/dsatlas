import { Component } from '@angular/core';

@Component({
  selector: 'app-backoffice-nav',
  templateUrl: './backoffice-nav.component.html',
  styleUrls: ['./backoffice-nav.component.scss']
})
export class BackOfficeNavComponent {
  constructor() { }

  isActive(state: string) { }
}
