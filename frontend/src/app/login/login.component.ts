import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder } from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService : DataService , public fb : FormBuilder , private route : Router) { }

  loginData = this.fb.group({
    username : [''],
    password : ['']
  })

  ngOnInit() {
  }

  login(e){
    
    e.preventDefault();
    this.dataService.login(this.loginData.value).toPromise().then((response)=>{
      if(response.type == true ){
         this.route.navigate(['preview']);
         this.loginData.reset();
      }else{
        swal.fire({
          type : 'error',
          text : response.text
        })
      }
    })

  }

}
