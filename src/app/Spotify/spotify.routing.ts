import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyTokenGuard } from './guards/spotify-token.guard';
import { SpotifyHomeComponent } from './pages/spotify-home/spotify-home.component';
import { SpotifyStoreTokenComponent } from './pages/spotify-store-token/spotify-store-token.component';

const routes: Routes = [
  {
    path: 'spotify', component: SpotifyHomeComponent, canActivate: [SpotifyTokenGuard]
  },
  {
    path: 'spotify/logged', component: SpotifyHomeComponent, canActivate: [SpotifyTokenGuard]
  },
  {
    path: 'spotify/store-token/:token/:refresh', component: SpotifyStoreTokenComponent
  }
];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]

})

export class SpotifyRoutingModule {}
