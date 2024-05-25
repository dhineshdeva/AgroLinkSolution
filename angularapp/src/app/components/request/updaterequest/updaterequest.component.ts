import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import { Requests } from 'src/app/models/request.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-updaterequest',
  templateUrl: './updaterequest.component.html',
  styleUrls: ['./updaterequest.component.css']
})
export class UpdaterequestComponent implements OnInit {

  id: number;
  isSeller: boolean = false;
  errorMessage: string = '';
  formData: Requests = { // Use the Request interface to type the formData object
    UserId: null,
    CropId: null,
    AgroChemicalId: null,
    Quantity: null,
    RequestPurpose: "",
    Status: "",
    RequestDate: new Date(),
  };
  errors: any = {};
  successPopup: boolean; // Add this line to declare the successPopup property

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.isSeller=this.authService.isSeller();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getRequestById();
  }

  getRequestById() {
    this.requestService.getRequestByRequestId(this.id).subscribe(
      (response) => {
        console.log('Request details:', response);
        this.formData = {
          UserId: response.UserId,
          CropId: response.CropId,
          AgroChemicalId: response.AgroChemicalId,
          Quantity: response.Quantity,
          RequestPurpose: response.RequestPurpose,
          Status: response.Status,
          RequestDate: response.RequestDate,
        };
      },
      (error) => {
        console.error('Error fetching Request details:', error);
        this.router.navigate(['/error']);
      }
    );
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
    this.errors[field] = ''; // Clear error when the user makes a change
  }

  handleUpdateRequest(requestForm: NgForm) {
    if (requestForm.valid) {
      this.requestService.updateRequestByRequestId(this.id, this.formData).subscribe(
        (response) => {
          console.log('Request updated successfully', response);
          this.successPopup = true;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error updating Request:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  handleOkClick() {
    // Close the success popup
    this.successPopup = false;
    if (this.isSeller) {
      this.router.navigate(['/seller/formerrequest/viewrequest']);
    }
    else {
      this.router.navigate(['/farmer/request/view']);
    }
  }

  navigateToDashboard() {
    console.log(this.isSeller);
    
    if (this.isSeller) {
      this.router.navigate(['/seller/formerrequest/viewrequest']);
    }
    else {
      this.router.navigate(['/farmer/request/view']);
    }
  }

}
