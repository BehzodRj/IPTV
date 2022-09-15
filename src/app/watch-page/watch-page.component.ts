import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { requestsService } from '../all.service';

@Component({
  selector: 'app-watch-page',
  templateUrl: './watch-page.component.html',
  styleUrls: ['./watch-page.component.scss']
})
export class WatchPageComponent implements OnInit {
  showAboutChannel = false
  watchData: any = []
  date: any

  constructor(private router: Router, private route: ActivatedRoute, private request: requestsService) { }

  ngOnInit() {
    let d = new Date()
    this.date = d.getHours() + '.' + d.getMinutes()
    

    this.route.params.subscribe( (param: any) => {
      let locChannel: any = localStorage.getItem("channels")
      let response = JSON.parse(locChannel)
      this.watchData = response.filter( (res: any) => res.channel.channel_id == param.id )[0]
      console.log(this.watchData);
      
    })
  }

  shortInfo() {
    this.router.navigate(['/television'])
  }

}
