import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-formerviewfeedback',
  templateUrl: './formerviewfeedback.component.html',
  styleUrls: ['./formerviewfeedback.component.css']
})
export class FormerviewfeedbackComponent implements OnInit {

  feedbacks: any[] = [];
  showDeletePopup = false;
  feedbackToDelete: string;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.getAllFormerFeedback();
  }

  getAllFormerFeedback() {
    const userId = Number(localStorage.getItem('userId'));
    console.log(userId);
    
    this.feedbackService.getAllfeedbacksByUserId(userId).subscribe(
      (data: any) => {
        this.feedbacks = data;
        console.log(this.feedbacks);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  

  openDeletePopup(feedbackId: string) {
    this.showDeletePopup = true;
    this.feedbackToDelete = feedbackId;
  }

  closeDeletePopup() {
    this.showDeletePopup = false;
  }

  // handleConfirmDelete() {
  //   this.deleteFeedback(this.feedbackToDelete);
  //   this.closeDeletePopup();
  // }


}
