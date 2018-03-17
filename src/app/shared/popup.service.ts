import { Injectable } from '@angular/core';

@Injectable()
export class PopupService {
  constructor() {}

  static facebookLink(link: string) {
    return '<div><a href="https://facebook.com/' + link + '" target="_blank"><i class="fa fa-facebook"></i> ' + link + ' </a></div>';
  }

  static twitterLink(link: string) {
    return '<div><a href="https://twitter.com/' + link + '" target="_blank"><i class="fa fa-twitter"></i> @' + link + '</a></div>';
  }

  static websiteLink(link: string) {
    return '<div><a href="' + link + '" target="_blank"><i class="fa fa-globe"></i> ' + link + '</a></div>';
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
    if (d.twitter) { p +=  PopupService.twitterLink(d.twitter); }
    if (d.facebook) { p += PopupService.facebookLink(d.facebook); }
    if (d.website) { p +=  PopupService.websiteLink(d.website); }

    p += '</div>';

    return p;
  }


}
