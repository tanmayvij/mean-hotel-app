import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var M: any;
@Component({
  selector: 'app-hotel-one',
  templateUrl: './hotel-one.component.html',
  styleUrls: ['./hotel-one.component.css']
})
export class HotelOneComponent implements OnInit {
  hotel: Object;
  url: string;
  Arr = Array;
  revForm : FormGroup;
  revSubmitted: boolean;
  
  reviews: any = [];
  
  constructor(
    private data: ApiserviceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    )
  {
    this.revForm = this.formBuilder.group({
      review: ['', Validators.required],
      rating: [, Validators.required]
    });
  }

  ngOnInit() {
    this.url = "/api/hotels/" + this.route.snapshot.params.hotelId;
    this.data.getData(this.url).subscribe(data => {
      this.hotel = data;
      console.log(data)
    },
    error => M.toast({html: error.error.error, displayLength: 2000})
    );
    this.getReviews();
    this.revSubmitted = false;
  } 
  onSubmit()
  {
    this.revSubmitted = true;
    let review: Object = {
      "review": this.revForm.controls.review.value,
      "rating": this.revForm.controls.rating.value
    };
    let url: string = `/api/hotels/${this.route.snapshot.params.hotelId}/reviews`;
    this.data.postData(url, review).subscribe(data => {
      console.log(data);
      this.getReviews();
      this.revForm.reset();
    },
    error => M.toast({html: error.error.error, displayLength: 2000})
    );
  }

  getReviews() {
  let url = `/api/hotels/${this.route.snapshot.params.hotelId}/reviews`;
    this.data.getData(url).subscribe(data => {
      this.reviews = data;
    },
    error => M.toast({html: error.error.error, displayLength: 2000})
    );
  }
}
