import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>(); 
  users: any;
  @ViewChild('f') form: any;
  username:string="";
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    
    this.search.emit(this.username)

    
  }
}
