import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ButtonsConfig, ButtonsStrategy, CurrentImageConfig, Image } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  filteredImages: Image[] = [];
  buttonsConfigSimple: ButtonsConfig = {
    visible: true,
    strategy: ButtonsStrategy.SIMPLE
  }; 
  currentImageConfig: CurrentImageConfig = {
    downloadable: true, 
    invertSwipe: true,
    loadingConfig: {
      enable: true, type: 2
    }
  };
  images: Image[] = []; 
  page = 0;
  size = 25;
  isLoading = true;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<Array<string>>('assets/data/images.json').subscribe(result => {
      for (var i = 0; i < result.length; i++) {
        this.images.push(new Image(i, {img: './assets/images/' + result[i]}))
      }

      this.getData({ pageIndex: this.page, pageSize: this.size });
    });
  }

  ngAfterViewChecked() {
    this.isLoading = false;
  }

  getData(obj: { pageIndex: number; pageSize: number; }) {
    var index = 0;
    var startingIndex = obj.pageIndex * obj.pageSize;
    var endingIndex = startingIndex + obj.pageSize;

    this.filteredImages = this.images.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }
}
