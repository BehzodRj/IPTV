import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-television-page',
  templateUrl: './television-page.component.html',
  styleUrls: ['./television-page.component.scss']
})
export class TelevisionPageComponent implements OnInit {
  num = 0

  constructor() { }

  ngOnInit() {}

  fullInfo() {
    this.num++
    if(this.num == 1) {
      alert('1')
    } else if(this.num == 2) {
      alert('2')
      this.num = 0
    }
  }

}
