import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Requests } from 'src/app/models/request.model';
import { AgrochemicalService } from 'src/app/services/agrochemical.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-createrequest',
  templateUrl: './createrequest.component.html',
  styleUrls: ['./createrequest.component.css']
})
export class CreaterequestComponent implements OnInit {

  id: string;
  formData: Requests = { // Use the Loan interface to type the formData object
    
    UserId: null,
    CropId: null,
    AgrochemicalId: null,
    Quantity: null,
    RequestPurpose: "",
    Status: "",
    RequestDate: new Date()

  };
  errors: any = {};
  errorMessage: string;
  successPopup: boolean = false;

  constructor(private requestService: RequestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formData.AgrochemicalId = Number(this.route.snapshot.paramMap.get('id'));
    this.formData.UserId= Number(localStorage.getItem("userId"));
    console.log(localStorage.getItem("userRole"));
    
    // Initialize your component here
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
    // Validate your form here and set errors if any
  }

  onSubmit(requestForm: NgForm) {
    console.log(requestForm);
    
    console.log('Form Validity:', this.formData);
    if (requestForm.value) {
      this.requestService.addRequest(this.formData).subscribe(
        (res) => {
          this.successPopup = true;
          console.log('Loan added successfully', res);
          requestForm.resetForm();
        },
        (err) => {
          if (err.status === 500 && err.error.message === 'Crop with the same type already exists') {
            this.errorMessage = 'Crop with the same type already exists';
          } else {
            this.errors = err.error;
          }
          console.error('Error adding Crop:', err);
        }
      );
    } else {
      this.errorMessage = 'All fields are required';
    }
  }

  handleSuccessMessage() {
    this.successPopup = false;
    this.errorMessage = '';
    this.formData = {
      RequestId: null,
      UserId: null,
      CropId: null,
      AgrochemicalId: null,
      Quantity: null,
      RequestPurpose: "",
      Status: "",
      RequestDate: new Date()
    };
  }

}
