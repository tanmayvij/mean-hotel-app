import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
hotelForm: FormGroup;
  constructor(private formbuilder: FormBuilder, private router: Router) {
    this.hotelForm = this.formbuilder.group({
      'offset' : [],
      'count' : [],
      'lat' : [],
      'lng' : [],
      'maxDist' : [],
    })
   }

  ngOnInit() {
  }
  onSubmit()
  {
    this.router.navigate(['/hotels'], {queryParams: this.hotelForm.value});
  }
}
