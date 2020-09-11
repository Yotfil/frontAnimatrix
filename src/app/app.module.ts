import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './Components/menu/menu.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterSongComponent } from './Components/register-song/register-song.component';
import { NombreTestComponent } from './Components/nombre-test/nombre-test.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { MySongsComponent } from './Components/my-songs/my-songs.component';
import { CreateUserComponent } from './Components/create-user/create-user.component';
import { LoginComponent } from './Components/login/login.component';
// swiper
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { AuthGuard } from './guards/auth.guard';
import { ActualizarUserComponent } from './Components/actualizar-user/actualizar-user.component';
import { ListarSeriesComponent } from './Components/listar-series/listar-series.component';
import { CrearSerieComponent } from './Components/crear-serie/crear-serie.component';
import { SeriesFavoritasComponent } from './Components/series-favoritas/series-favoritas.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registrarCancion', canActivate: [AuthGuard], component: RegisterSongComponent },
  { path: 'misCanciones', canActivate: [AuthGuard], component: MySongsComponent },
  { path: 'registrarUsuario', component: CreateUserComponent },
  { path: 'directorioSeries', component: ListarSeriesComponent },

  { path: 'login', component: LoginComponent },
  { path: 'actualizarUser', component: ActualizarUserComponent },
  { path: 'crearSerie', component: CrearSerieComponent },
  { path: 'favSeries', component: SeriesFavoritasComponent },



  { path: '**', component: PageNotFoundComponent }//Ruta para cuando no encontramos una página
]
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 10
};

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    RegisterSongComponent,
    NombreTestComponent,
    PageNotFoundComponent,
    MySongsComponent,
    CreateUserComponent,
    LoginComponent,
    ActualizarUserComponent,
    ListarSeriesComponent,
    CrearSerieComponent,
    SeriesFavoritasComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SwiperModule,
  ],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
