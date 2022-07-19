import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-television-page',
  templateUrl: './television-page.component.html',
  styleUrls: ['./television-page.component.scss'],
  animations: [
    trigger('animateBlock', [
      state('leftMargin', style({ marginLeft: '30px' })),
      transition('* <=> rightMargin', animate(400)),

      state('widthShort', style({ width: '10px' })),
      transition('widthShort <=> widthFull', animate(400)),

      state('opacityOnListText', style({ opacity: '0' })),
      transition('* <=> widthShort', animate(300)),

      state('fullInfoFull', style({ width: 'auto' })),
      transition('* <=> fullInfoFull', animate(900)),
    ])
  ],
})
export class TelevisionPageComponent implements OnInit {
  num = 0
  marginBlock: any
  widthBlock: any
  opacityText: any
  fullInfoBlock: any

  constructor(private router: Router) { }

  ngOnInit() {}

  fullInfo() {
    this.num++
    if(this.num == 1) {
      this.marginBlock = 'leftMargin'
      this.widthBlock = 'widthShort'
      this.opacityText = 'opacityOnListText'
      this.fullInfoBlock = 'fullInfoFull'
    } 
    else if(this.num == 2) {
      this.num = 0
      this.router.navigate(['/watch'])
    }
  }

  shortInfo() {
    this.num = 0
    this.marginBlock = 'rightMargin'
    this.widthBlock = 'widthFull'
    this.opacityText = 'opacityOffListText'
    this.fullInfoBlock = 'fullInfoShort'
  }

}