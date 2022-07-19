import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-television-page',
  templateUrl: './television-page.component.html',
  styleUrls: ['./television-page.component.scss'],
  animations: [
    trigger('widthBlock', [
      state('open', style({ marginLeft: '30px' })),
      transition('* <=> open', animate(300)),

      state('close', style({ width: '10px' })),
      transition('* <=> close', animate(300)),

      state('opacity', style({ opacity: 0 })),
      transition('* <=> close', animate(200)),
    ])
  ],
})
export class TelevisionPageComponent implements OnInit {
  num = 0
  animeText: any
  widthBlock: any
  opacityText: any

  constructor() { }

  ngOnInit() {}

  fullInfo() {
    this.num++
    if(this.num == 1) {
      this.animeText = 'open'
      this.widthBlock = 'close'
      this.opacityText = 'opacity'
    } else if(this.num == 2) {
      this.num = 0
    }
  }

}
