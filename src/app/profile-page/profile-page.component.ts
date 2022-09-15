import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { requestsService } from '../all.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  modalQrCode = false
  profileData: any = []
  
  constructor(private router: Router, private request: requestsService) { }

  ngOnInit() {
    this.request.getRequest('/api/auth/profile').subscribe(response => {
      console.log(response);
      this.profileData = response
    }, error => {
      this.request.error(error)
    })
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
