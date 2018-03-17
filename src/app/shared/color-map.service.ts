import { Injectable } from '@angular/core';

@Injectable()
export class ColorMapService {

  brackets = {
    states:    [ 3000, 1000, 500, 100, 50, 1 ],
    counties:  [  300,  100,  50,  10,  5, 1 ],
    districts: [  300,  100,  50,  10,  5, 1 ]
  };

  gradients = {
    reds: [ '#a50f15', '#de2d26', '#fb6a4a', '#fcae91', '#fee5d9', '#ffffff', '#333333' ]
  };

  getColor(v, bracketName, gradientName) {
    const bracket = this.brackets[bracketName];
    const gradient = this.gradients[gradientName];
    for (const i in bracket) {
      if (bracket.hasOwnProperty(i)) {
        if (v >= bracket[i]) {
          return gradient[i];
        }
      }
    }
    return gradient[gradient.length];
  }
}
