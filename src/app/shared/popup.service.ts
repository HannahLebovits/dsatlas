import { Injectable } from '@angular/core';
import { PhonePipe } from './phone.pipe';

@Injectable()
export class PopupService {

  constructor(private _phonePipe: PhonePipe) {}

  facebookLink(link: string) {
    return '<div><a href="https://facebook.com/' + link + '" target="_blank"><i class="fa fa-facebook"></i> ' + link + ' </a></div>';
  }

  twitterLink(link: string) {
    return '<div><a href="https://twitter.com/' + link + '" target="_blank"><i class="fa fa-twitter"></i> @' + link + '</a></div>';
  }

  websiteLink(link: string) {
    return '<div><a href="' + link + '" target="_blank"><i class="fa fa-globe"></i> ' + link + '</a></div>';
  }

  emailLink(link: string) {
    return '<div><a href="mailto:' + link + '" target="_blank"><i class="fa fa-envelope"></i> ' + link + '</a></div>';
  }

  telLink(tel: string) {
    return '<div><a href="tel:' + tel + '"><i class="fa fa-phone"></i> ' + this._phonePipe.transform(tel) + '</a></div>';
  }

  makePopup(d) {
    let p =
      '<div class="popup-container"><h3>' + d.name + '</h3>' +
      '<div class="popup-body">';

    if (d.members === 0) {
      p += '<div class="text-right">' + d.city + ', ' + d.state + '</div>';
    } else {
      p += '<div class="pull-right">' + d.city + ', ' + d.state + '</div>';
    }

    if (d.members > 0) { p += '<div class="popup-members-line">' + d.members + ' members</div>'; }
    if (d.twitter) { p +=  this.twitterLink(d.twitter); }
    if (d.facebook) { p += this.facebookLink(d.facebook); }
    if (d.website) { p +=  this.websiteLink(d.website); }
    if (d.email) { p += this.emailLink(d.email); }
    if (d.tel) { p += this.telLink(d.tel); }

    p += '</div>';

    return p;
  }


}
