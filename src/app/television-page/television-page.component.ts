import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { requestsService } from '../all.service';

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
  categoryData: any = []
  channelData: any = []
  fullChannelData: any = []
  categoryID: number = 1
  num = 0
  marginBlock: any
  widthBlock: any
  opacityText: any
  fullInfoBlock: any
  channel_id: any = 0
  date: any

  constructor(private router: Router, private request: requestsService, private http: HttpClient) { }

  ngOnInit() {
    let d = new Date()
    this.date = d.getHours() + '.' + d.getMinutes()

    this.request.getRequest('/api/auth/cathegories').subscribe(response => {
      this.categoryData = response
    }, error => {
      this.request.error(error)
    })

    let locChannel: any = localStorage.getItem("channels")

    if(locChannel && locChannel.length > 0) {
      this.channelData = JSON.parse(locChannel)
      console.log(JSON.parse(locChannel));
    } else {
      this.request.getRequest('/api/auth/channels').subscribe( (response: any) => {
        this.channelData = response
        console.log(response);
        localStorage.setItem('channels', JSON.stringify(response))
      }, error => {
        this.request.error(error)
      })
    }
  }

  categoryButton(id: number) {
    this.categoryID = id
    let idTest = this.channelData.filter( (res: any) => res.channel?.cathegorie_channels[0].cathegorie_id == id )
    this.channelData = idTest
  }

  fullInfo(id: number, potok_id: number) {
    this.num++
    if(this.num == 1) {
      this.marginBlock = 'leftMargin'
      this.widthBlock = 'widthShort'
      this.opacityText = 'opacityOnListText'
      this.fullInfoBlock = 'fullInfoFull'
      this.fullChannelData = this.channelData.filter( (res: any) => res.channel_id == id )[0]
      this.channel_id = id

      this.http.get('http://45.94.219.9:8081/stream/test2/hls/playlist.m3u8').subscribe(response => {
        console.log(response);
      })
    }
    else if(this.num > 1) {
      this.fullChannelData = this.channelData.filter( (res: any) => res.channel_id == id )[0]
      let potok: any = document.getElementById('my-video')
      potok.outerHTML = `<video id="my-video" class="video-js vjs-theme-sea" muted autoplay playsinline data-setup='{}'>
      <source src="http://45.94.219.9:8081/stream/test${potok_id}/hls/playlist.m3u8" type="application/x-mpegURL">
    </video>`
      this.channel_id = id
    } 
  }

  shortInfo() {
    this.num = 0
    this.marginBlock = 'rightMargin'
    this.widthBlock = 'widthFull'
    this.opacityText = 'opacityOffListText'
    this.fullInfoBlock = 'fullInfoShort'
  }

  watchButton() {
    this.router.navigate(['/watch', this.channel_id])
  }

}