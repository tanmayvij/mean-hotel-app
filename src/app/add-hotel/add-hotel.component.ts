import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
declare var M: any;
@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {
	hotelForm: FormGroup;

  constructor(private data: ApiserviceService, private formbuilder: FormBuilder) {
  	this.hotelForm = this.formbuilder.group({
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
  }
	onSubmit() {
		let url: string = "http://35.196.35.2:8080/api/hotels";
		this.data.postData(url, this.hotelForm.value).subscribe(data => {
			console.log(data);
			this.hotelForm.reset();
			// Notification success message
		},
    error => M.toast({html: error.error.error, displayLength: 2000})
    );
	}
}
