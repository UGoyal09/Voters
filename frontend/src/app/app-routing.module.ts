import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { PreviewComponent } from './preview/preview.component';


const routes: Routes = [
  { path : '' , component : HomeComponent},
  { path : 'registration' , component : RegistrationComponent},
  { path : 'login' , component : LoginComponent},
  { path : 'preview' , component : PreviewComponent},
  { path : '**' , redirectTo : '' , pathMatch : 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
