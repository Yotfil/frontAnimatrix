import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { UserService } from '../../services/user.service';
import { SwiperModule, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-listar-series',
  templateUrl: './listar-series.component.html',
  styleUrls: ['./listar-series.component.css']
})
export class ListarSeriesComponent implements OnInit {
  role
  user
  indexShonnen
  indexThriller
  indexRomance
  favArray: Array<any>;
  idSerie: String;
  series: Array<any>;
  seriesShonnen: Array<any>;
  seriesThriller: Array<any>;
  seriesRomance: Array<any>;
  apiURL: String;
  search: String;
  totSeries: Number;
  page: Number = 1;
  totalTabs: Array<any>;

  constructor(
    private SeriesService: SeriesService,
    private userService: UserService
  ) {
    this.apiURL = this.SeriesService.apiURL
    this.user = this.userService.infoUser();
    this.role = this.user.role
    console.log(this.role);
    this.favArray = []
  }
  config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    slideToClickedSlide: false,
    mousewheel: true,
    scrollbar: false,
    watchSlidesProgress: true,
    navigation: true,
    keyboard: true,
    initialSlide: 1,
    pagination: false,
    centeredSlides: false,
    loop: true,
    roundLengths: true,
    slidesOffsetBefore: 50,
    slidesOffsetAfter: 50,
    spaceBetween: 20,
    breakpoints: {
      // when window width is >= 320px
      450: {
        slidesPerView: 3
      }
    }
  };

  ngOnInit(): void {
    this.getSeries(this.page)
    this.getSeriesShonnen(this.page)
    this.getSeriesThriller(this.page)
    this.getSeriesRomance(this.page)
  }

  getSeries(page: any) {
    console.log('this.search -> ', this.search)
    let filter = ''
    if (typeof this.search == "string" && this.search.length > 0) {
      filter = `?searchBy=${this.search}`
    }

    this.SeriesService.getSeries(filter, page).subscribe(
      (allSeries: Array<any>) => {
        this.totSeries = allSeries.length
        this.series = allSeries
        console.log(this.series, "series------")

      }
    )
  }
  // buscador de shonnen -----------------------------------------
  getSeriesShonnen(page: any) {
    let filter = `?searchBy=Shonnen`


    this.SeriesService.getSeries(filter, page).subscribe(
      (allSeries: Array<any>) => {
        this.totSeries = allSeries.length
        this.seriesShonnen = allSeries
        console.log(this.seriesShonnen, "seriesShonnen------")
      }
    )
  }

  // buscador thriller 

  getSeriesThriller(page: any) {
    let filter = `?searchBy=Thriller`


    this.SeriesService.getSeries(filter, page).subscribe(
      (allSeries: Array<any>) => {
        this.totSeries = allSeries.length
        this.seriesThriller = allSeries
        console.log(this.seriesThriller, "seriesThriller------")
      }
    )
  }
  // buscador romance 

  getSeriesRomance(page: any) {
    let filter = `?searchBy=Romance`


    this.SeriesService.getSeries(filter, page).subscribe(
      (allSeries: Array<any>) => {
        this.totSeries = allSeries.length
        this.seriesRomance = allSeries
        console.log(this.seriesRomance, "seriesRomance------")
      }
    )
  }


  getTotalSongs() {

    this.SeriesService.getTotalSeries().subscribe((totAllSeries: any) => {
      let tabs = Math.ceil(totAllSeries.total / 10);
      this.totalTabs = Array.apply(null, new Array(tabs)).map((e, i) => ++i);

    })
  }
  guardarIdserieLocal(serieId, nombreSerie, sinopsisSerie) {
    localStorage.setItem('idSerieStorage', serieId)
    localStorage.setItem('NombreSerieStorage', nombreSerie)
    localStorage.setItem('sinopsisSerie', sinopsisSerie)

  }

  fillHeart(e, idFav) {

    e.target.classList.toggle("heart-fill")

    let buscarSerie = this.favArray.find(element => element == idFav)
    let posicionSerie = this.favArray.indexOf(buscarSerie)
    console.log(posicionSerie, "POSICION DE LA SERIE");
    if (!buscarSerie) {
      this.favArray.push(idFav)
    } else {
      this.favArray.splice(posicionSerie, 1)
    }
    let stringedArray = JSON.stringify(this.favArray)
    localStorage.setItem("arregloSeriesFav", stringedArray)

    console.log(this.favArray);


  }

}




