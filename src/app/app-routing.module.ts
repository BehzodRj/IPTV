import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TelevisionPageComponent } from './television-page/television-page.component';
import { WatchPageComponent } from './watch-page/watch-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'television', component: TelevisionPageComponent },
  { path: 'watch', component: WatchPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
