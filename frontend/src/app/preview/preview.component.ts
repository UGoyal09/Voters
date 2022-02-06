        import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  userDetails : any;
  toShow : boolean;

  constructor(private dataService : DataService) {
    this.toShow = false;
   }

  ngOnInit() {
    this.dataService.sessionCheck().toPromise().then((response)=>{
      if(response.type){
        this.toShow = true;
        this.dataService.userData().toPromise().then((data)=>{
          this.userDetails = data[0];
          console.log(this.userDetails)
        })
      }else{
        this.toShow = false;
      }
    })
    
  }

 printCard() {    
    var voterdesign = document.getElementById('voterdesign');
    var popupWin = window.open('', '_blank', 'width=300,height=300');
    popupWin.document.open();
    popupWin.document.write('<html><body onload="window.print()">' + voterdesign.innerHTML + '</html>');
     popupWin.document.close();
         }

}
