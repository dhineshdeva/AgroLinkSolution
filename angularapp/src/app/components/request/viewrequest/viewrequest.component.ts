import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-viewrequest',
  templateUrl: './viewrequest.component.html',
  styleUrls: ['./viewrequest.component.css']
})
export class ViewrequestComponent implements OnInit {
  isSeller: boolean = false;
  userId: number = null;
  availableFarmerRequest: any[] = [];
  showDeletePopup = false;
  requestToDelete: number | null = null;
  searchValue = '';
  sortValue = 0;
  page: number = 1;
  limit = 5;
  maxRecords = 1;
  totalPages = 1;
  status: string = ''; // Add this line
  filteredFarmerRequest = [];
  searchField = '';
  errorMessage: string = '';
  allFarmerRequest: any[] = []; // Declare the allcrops property

  constructor(private router: Router, private requestService: RequestService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    this.isSeller = this.authService.isSeller();
    console.log(this.isSeller);

    this.fetchFarmerRequest(this.userId);
  }

  fetchFarmerRequest(userId: number) {
    if (this.isSeller) {
      console.log("Seller");

      this.requestService.getAllRequest().subscribe(
        (data: any) => {
          this.availableFarmerRequest = data;
          this.maxRecords = this.availableFarmerRequest.length;
          this.allFarmerRequest = data; // Populate allcrops with the initial list of crops
          this.totalPages = Math.ceil(this.maxRecords / this.limit);
          console.log('Request By User:', this.availableFarmerRequest);
          this.filteredFarmerRequest = this.availableFarmerRequest;
        },
        (error) => {
          // Handle error
          console.error('Error fetching Usert Request:', error);
        }
      );
    }
    else {
      this.requestService.getRequestByUserId(userId).subscribe(
        (data: any) => {
          this.availableFarmerRequest = data;
          this.maxRecords = this.availableFarmerRequest.length;
          this.allFarmerRequest = data; // Populate allcrops with the initial list of crops
          this.totalPages = Math.ceil(this.maxRecords / this.limit);
          console.log('Request By User:', this.availableFarmerRequest);
          this.filteredFarmerRequest = this.availableFarmerRequest;
        },
        (error) => {
          // Handle error
          console.error('Error fetching Usert Request:', error);
        }
      );
    }

  }




  handleDeleteClick(requestId: number) {
    this.requestToDelete = requestId;
    this.showDeletePopup = true;
  }

  navigateToEditRequest(id: number) {
    console.log(id);
    console.log(this.isSeller);
    
    if (this.isSeller) {
      console.log("welcome");
      
      this.router.navigate(['/seller/formerrequest/changeStatus:/', id]);
    }
    else{
      this.router.navigate(['/farmer/request/update/', id]);
    }
  }

  handleConfirmDelete() {
    if (this.requestToDelete) {
      this.requestService.deleteRequestByRequestId(this.requestToDelete).subscribe(
        (response) => {
          console.log('Crop deleted successfully', response);
          this.closeDeletePopup();
          this.fetchFarmerRequest(this.userId);
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error deleting Requests:', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }



  logout() {
    // Implement logout logic
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }

  closeDeletePopup() {
    this.requestToDelete = null;
    this.showDeletePopup = false;
    this.errorMessage = '';
  }

  updateAvailableLoans(newLoans: any[]) {
    this.availableFarmerRequest = newLoans;
  }

  handleSearchChange(searchValue: string): void {
    this.searchField = searchValue;
    if (searchValue) {
      this.availableFarmerRequest = this.filterRequest(searchValue);
    } else {
      this.availableFarmerRequest = this.availableFarmerRequest;
    }
  }

  filterRequest(search: string) {
    const searchLower = search.toLowerCase();
    if (searchLower === '') return this.availableFarmerRequest;
    return this.availableFarmerRequest.filter(
      (request) =>
        request.cropType.toLowerCase().includes(searchLower) ||
        request.Description.toLowerCase().includes(searchLower)
    );
  }


}
