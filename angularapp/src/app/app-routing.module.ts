import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { NewcropComponent } from './components/crop/newcrop/newcrop.component';
import { ViewcropComponent } from './components/crop/viewcrop/viewcrop.component';
import { UpdatecropComponent } from './components/crop/updatecrop/updatecrop.component';
import { ViewagroComponent } from './components/agrochemicals/viewagro/viewagro.component';
import { CreateagroComponent } from './components/agrochemicals/createagro/createagro.component';
import { UpdateagroComponent } from './components/agrochemicals/updateagro/updateagro.component';
import { DeleteagroComponent } from './components/agrochemicals/deleteagro/deleteagro.component';
import { CreaterequestComponent } from './components/request/createrequest/createrequest.component';
import { ViewrequestComponent } from './components/request/viewrequest/viewrequest.component';
import { UpdaterequestComponent } from './components/request/updaterequest/updaterequest.component';
import { DeleterequestComponent } from './components/request/deleterequest/deleterequest.component';
import { CreatefeedbackComponent } from './components/feedback/createfeedback/createfeedback.component';
import { ViewfeedbackComponent } from './components/feedback/viewfeedback/viewfeedback.component';
import { FormerviewfeedbackComponent } from './components/feedback/formerviewfeedback/formerviewfeedback.component';


const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'error', component: ErrorComponent },
  // Farmer Navigations
  // Farmer Crop Navigatio
  { path: 'farmer/crop/add', component: NewcropComponent },
  { path: 'farmer/crop/view', component: ViewcropComponent },
  { path: 'farmer/crop/update/:id', component: UpdatecropComponent },

  // Farmer Agro Navigation 
  { path: 'farmer/agro/view', component: ViewagroComponent },
  { path: 'farmer/agro/createrequest/:id', component: CreaterequestComponent },

  // Farmer Request Navigation
  { path: 'farmer/request/create', component: CreaterequestComponent },
  { path: 'farmer/request/view', component: ViewrequestComponent },
  { path: 'farmer/request/update/:id', component: UpdaterequestComponent },
  { path: 'farmer/request/delete', component: DeleterequestComponent },

  //Farmer Feedback Navigation
  { path: 'farmer/feedback/create', component: CreatefeedbackComponent },
  { path: 'farmer/feedback/myfeedback', component: FormerviewfeedbackComponent },

  //Seller Navigation
  // Seller AgroChemical Navighation
  { path: 'seller/agro/view', component: ViewagroComponent },
  { path: 'seller/agro/create', component: CreateagroComponent },
  { path: 'seller/agro/update/:id', component: UpdateagroComponent },

  { path: 'seller/feedback/myfeedback', component: ViewfeedbackComponent },
  { path: 'seller/formerrequest/viewrequest', component: ViewrequestComponent },
  
  { path: 'seller/formerrequest/changeStatus:/:id', component: UpdaterequestComponent },

  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
