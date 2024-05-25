import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgroChemicals } from 'src/app/models/agrochemicals';
import { AgrochemicalService } from 'src/app/services/agrochemical.service';

@Component({
  selector: 'app-updateagro',
  templateUrl: './updateagro.component.html',
  styleUrls: ['./updateagro.component.css']
})
export class UpdateagroComponent implements OnInit {

  id: number;
  errorMessage: string = '';
  formData: AgroChemicals = { // Use the Crop interface to type the formData object
    AgroChemicalId: null,
    Name: "",
    Brand: "",
    Category: "",
    SuitableCrop: null,
    Description: "",
    Quantity: null,
    PricePerUnit: null,
    Image: ""

  };
  errors: any = {};
  successPopup: boolean; // Add this line to declare the successPopup property

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agroService: AgrochemicalService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.formData.AgroChemicalId = this.id;
    this.getAgroChemicalById();
  }

  getAgroChemicalById() {
    this.agroService.getAgrochemicalByID(this.id).subscribe(
      (response) => {
        console.log('Agro details:', response);
        this.formData = {
          AgroChemicalId: response.AgroChemicalId,
          Name: response.Name,
          Brand: response.Brand,
          Category: response.Category,
          SuitableCrop: response.SuitableCrop,
          Description: response.Description,
          Quantity: response.Quantity,
          PricePerUnit: response.PricePerUnit,
          Image: response.Image
        };
      },
      (error) => {
        console.error('Error fetching AgroChemical details:', error);
        this.router.navigate(['/error']);
      }
    );
  }

  handleChange(event: any, field: string) {
    this.formData[field] = event.target.value;
    this.errors[field] = ''; // Clear error when the user makes a change
  }

  handleUpdateAgro(agroEditForm: NgForm) {
    if (agroEditForm.valid) {
      this.agroService.updateAgrochemica(this.id, this.formData).subscribe(
        (response) => {
          console.log('AgroChenical updated successfully', response);
          this.successPopup = true;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error updating AgroChemical:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  handleOkClick() {
    // Close the success popup
    this.successPopup = false;
    // this.router.navigate(['/admin/view/viewloan']);
  }

  navigateToDashboard() {
    this.router.navigate(['/farmer/agro/view']);
  }

}
