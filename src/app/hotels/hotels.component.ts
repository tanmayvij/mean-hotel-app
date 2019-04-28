import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
import { ActivatedRoute, Router } from "@angular/router";

declare var M: any;

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  hotels: Object;
  offset: Number;
  count: Number;
  url: string;
  lat: Number;
  lng: Number;
  
  constructor( private data: ApiserviceService, private router: Router) {  }

  getHotels()
  {
    this.url = "http://35.196.35.2:8080/api/hotels";
    var params = this.router.url.split('?');
    if(params[1])
    this.url += '?' + params[1];
    this.data.getData(this.url).subscribe(
      data => {
      this.hotels = data;
       console.log(data)
    },
    error => M.toast({html: error.error.error, displayLength: 2000})
    );
  }
  ngOnInit() {
    this.getHotels();
  }
  delete(id)
  {
    this.url = `http://35.196.35.2:8080/api/hotels/${id}`;
    this.data.deleteData(this.url).subscribe(data => {
      this.getHotels();
      console.log(data)
    },
    error => M.toast({html: error.error.error, displayLength: 2000})
    );

  }

}
