import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-television-page',
  templateUrl: './television-page.component.html',
  styleUrls: ['./television-page.component.scss'],
  animations: [
    trigger('animateBlock', [
      state('leftMargin', style({ marginLeft: '30px' })),
      state('rightMargin', style({ marginLeft: '30px' })),
      transition('leftMargin <=> rightMargin', animate(300)),

      state('close', style({ width: '10px' })),
      transition('* <=> close', animate(300)),

      state('opacity', style({ opacity: 0 })),
      transition('* <=> close', animate(200)),

      state('fullInfo', style({ width: 'auto' })),
      transition('* <=> fullInfo', animate(700)),
    ])
  ],
})
export class TelevisionPageComponent implements OnInit {
  num = 0
  marginBlock: any
  widthBlock: any
  opacityText: any
  fullInfoBlock: any

  constructor() { }

  ngOnInit() {}

  fullInfo() {
    this.num++
    if(this.num == 1) {
      this.marginBlock = !this.marginBlock
      this.widthBlock = 'close'
      this.opacityText = 'opacity'
      this.fullInfoBlock = 'fullInfo'
    } else if(this.num == 2) {
      this.num = 0
    }
  }

}
