import { Component, OnInit } from '@angular/core';
import {ApiserviceService} from '../apiservice.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var M: any;
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  hotel: Object;
  url: string;
  Arr = Array;
  revForm : FormGroup;
  hotelForm : FormGroup;
  revSubmitted: boolean;
  editClicked: boolean = false;
  editReview: any = {
    "name": "",
    "_id": "",
    "id": "",
    "review": "",
    "rating": ""
  };
  services:string = '';
  photos:string = '';
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
    this.hotelForm = this.formBuilder.group({
      'name' : ['', Validators.required],
      'description': ['', Validators.required],
      'address' : ['', Validators.required],
      'lat' : [, Validators.required],
      'lng' : [, Validators.required],
      'stars' : [, Validators.required],
      'currency': ['', Validators.required],
      'services': ['', Validators.required],
      'photos': ['']
    })
  }

  ngOnInit() {
    this.url = "http://35.196.35.2:8080/api/hotels/" + this.route.snapshot.params.hotelId;
    this.data.getData(this.url).subscribe(data => {
      this.hotel = data;
      for(let service in data['services'])
      {
        this.services += data['services'][service] + ';';
      }
      this.services = this.services.substring(0, this.services.length - 1);
      for(let photo in data['photos'])
      {
        this.photos += data['photos'][photo] + ';';
      }
      this.photos = this.photos.substring(0, this.photos.length - 1);
      console.log(data)
    },
    error => M.toast({html: error.error.error, displayLength: 2000})
    );
    this.getReviews();
    this.revSubmitted = false;
  }
  onHotel() {
		let url: string = `http://35.196.35.2:8080/api/hotels/${this.route.snapshot.params.hotelId}`;
		this.data.putData(url, this.hotelForm.value).subscribe(data => {
			console.log(data);
			this.router.navigate([`hotels/${this.route.snapshot.params.hotelId}`]);
		},
    error => M.toast({html: error.error.error, displayLength: 2000})
    );
	}
  onReview(id)
  {
    this.editClicked = true;
    let url: string = `http://35.196.35.2:8080/api/hotels/${this.route.snapshot.params.hotelId}/reviews/${id}`;
    this.data.getData(url).subscribe(data => {
      this.editReview = data;
    },
    error => M.toast({html: error.error.error, displayLength: 2000})
    );
  }
  editReviewMethod(id)
  {
    this.url = `http://35.196.35.2:8080/api/hotels/${this.route.snapshot.params.hotelId}/reviews/${id}`;
    let review: Object = {
      "review": this.revForm.controls.review.value,
      "rating": this.revForm.controls.rating.value
    };
    
    this.data.putData(this.url, review).subscribe(data => {
      console.log(data);
      this.getReviews();
      this.editClicked = false;
    },
    error => M.toast({html: error.error.error, displayLength: 2000})
    );

  }
  deleteReview(id)
  {
    this.url = `http://35.196.35.2:8080/api/hotels/${this.route.snapshot.params.hotelId}/reviews/${id}`;
    this.data.deleteData(this.url).subscribe(data => {
      this.getReviews();
      console.log(data)
    },
    error => M.toast({html: error.error.error, displayLength: 2000})
    );

  }
  getReviews() {
    let url = `http://35.196.35.2:8080/api/hotels/${this.route.snapshot.params.hotelId}/reviews`;
    this.data.getData(url).subscribe(data => {
      this.reviews = data;
    },
    error => M.toast({html: error.error.error, displayLength: 2000})
    );
  }
}
