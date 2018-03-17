import { Component } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  loading = true;

  constructor(private router: Router) {
    router.events.subscribe((evt) => {
      if (evt instanceof ResolveEnd) { this.loading = false; }
    });
  }
}
