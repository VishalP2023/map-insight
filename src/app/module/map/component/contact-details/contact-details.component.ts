import { Component, Input } from '@angular/core';
import { SearchLocationService } from '../../service/search-location.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
    contactDetails: any;
    @Input() placeId!: string;  // Add this to accept the placeId
    cardDivHeight!: string;
    divHeight!: number;
    
    constructor(
      private modalRef: BsModalRef,
      private searchLocationService: SearchLocationService,
    ) {
  
    }

    ngOnInit(){
      this.searchLocationService.getContactDetails(this.placeId).subscribe((response) => {
        this.contactDetails=response;
       })
    }

    close() {
      this.modalRef.onHidden?.next(false);
      this.modalRef.hide();
    }
  
    changeDeviceValue() {
      this.divHeight = window.innerHeight
      this.divHeight = this.divHeight * 0.85
      this.cardDivHeight = this.divHeight + 'px'
    }

}
