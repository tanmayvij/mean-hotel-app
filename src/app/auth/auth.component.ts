import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var M: any;
@Component
({
    selector: 'authmenu',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    emailSent: boolean = false;
    newPassword: string;
    loginForm: FormGroup;
    regForm: FormGroup;
    forgotForm: FormGroup;
    constructor(
        private router: Router,
        private data : ApiserviceService,
        private formbuilder: FormBuilder
    ) {
        this.loginForm = this.formbuilder.group({
            'userid': ['', Validators.required],
            'password': ['', Validators.required]
        })
        this.regForm = this.formbuilder.group({
            'userid': ['', Validators.required],
            'password': ['', Validators.required],
            'name': ['', Validators.required],
            'email': ['', Validators.required],
            'phone': ['', Validators.required]
        })
        this.forgotForm = this.formbuilder.group({
            'userid': ['', Validators.required],
            'token': ['', Validators.required]
        })
    }
    loggedIn()
    {
        return sessionStorage.token ? true : false;
    }
    ngOnInit()
    {
        // Logged In
        if(this.loggedIn())
        {
            this.router.navigate(['/']);
        }
    }
    login()
    {
        let url: string = '/api/users/login';
        this.data.postData(url, this.loginForm.value).subscribe(data => {
            let token : string = data['token'];
            sessionStorage.setItem('token', token);
            this.router.navigate(['/']);
        },
        error => M.toast({html: error.error.error, displayLength: 2000})
        );
    }
    register()
    {
        let url: string = '/api/users/register';
        this.data.postData(url, this.regForm.value).subscribe(data => {
        console.log(data);
        this.regForm.reset();
        M.toast({html: "Successfully registered.", displayLength: 2000})
    
        },
        error => M.toast({html: error.error.error, displayLength: 2000})
        );
    }
    forgot()
    {
        let url: string = '/api/users/forgot';
        this.data.postData(url, this.forgotForm.value).subscribe(data => {
            // Hide user id field and show token field
            this.emailSent = true;
        },
        error => M.toast({html: error.error.error, displayLength: 2000})
        );
    }
    reset()
    {
        let resetParams: Object = this.forgotForm.value;
        let url: string = '/api/users/resetpass?';
        for (let entry in resetParams) {
            url += entry + '=' + encodeURIComponent(resetParams[entry]) + '&';
        }
        url = url.substring(0, url.length-1)
        this.data.getData(url).subscribe(data => {
            // Display new password
            this.newPassword = "New Password " + data['newPassword'];
        },
        error => M.toast({html: error.error.error, displayLength: 2000})
        );
    }
}
