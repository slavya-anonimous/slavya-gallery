import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filteredImages: Array<string>;
  images: Array<string>;
  page = 0;
  size = 50;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<Array<string>>('assets/data/images.json').subscribe(result => {
      this.images = result;
      this.getData({ pageIndex: this.page, pageSize: this.size });
    });
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
