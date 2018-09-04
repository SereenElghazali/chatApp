import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form: any;
  email:string="";
  password:string="";
  constructor(private authService: AuthService,private router:Router) { 
    
  }

  ngOnInit() {
  }
  onSubmit() {
  if(this.form.valid) {
    this.authService.login(this.email, this.password);
    this.router.navigate(['home']);  
  }

}

}
