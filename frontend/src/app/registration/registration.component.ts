import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  uploadableFile : File;

  constructor(private dataService : DataService , public fb : FormBuilder ) { }

  registerData = this.fb.group({
    name : ['',Validators.required],
    password : ['',[Validators.required,Validators.minLength(8)]],
    fatherName : ['',Validators.required],
    confirmPassword : [''],
    dob : ['',Validators.required],
    address : ['',Validators.required],
    pincode : ['',[Validators.required]],
    city : ['',Validators.required],
    state : ['',Validators.required],
    gender : ['',Validators.required],
    voterId : ['',Validators.required]
  })

  ngOnInit() {
  }

  addFile(e){

    this.uploadableFile = e.target.files[0];
    console.log(this.uploadableFile);

  }

  get(control){
    return this.registerData.get(control);
  }



  register(e){
e.preventDefault();
let form = new FormData();
let formKeys = Object.keys(this.registerData.value);
formKeys.forEach((key,index)=>{
  form.append(key,this.registerData.value[key]);
})
form.append('pic',this.uploadableFile);

this.dataService.register(form).toPromise().then((response)=>{
  if(response.swal.type == 'success'){
    this.registerData.reset();
  }
  Swal.fire(response.swal);
})
  }

}
