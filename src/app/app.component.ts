import { Component, ViewChild } from '@angular/core';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ApiService, IGetUserResponse } from 'src/app/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('loader', { static: false })
  loader: any;

  searchText = '';
  showInfo = false;
  userInfo?: IGetUserResponse;

  faSpinner = faSpinner;
  modalRef?: NgbModalRef;

  constructor(
    private apiService: ApiService,
    private modal: NgbModal
  ) {
    this.apiService.getLoaderStatus().subscribe({
      next: (status: boolean) => {
        if (!this.modal.hasOpenModals() && status) {
          this.modalRef = this.modal.open(this.loader, {
            windowClass: 'loader', size: 'xl', centered: true, backdrop: 'static', keyboard: false
          });
        }
        if (!status && this.modalRef) {
          this.modalRef.close();
        }
      }
    });
  }

  errorHandler(err: any): void {
    this.showInfo = false;
    console.error(err);
    if (err.error && err.error.message) {
      alert(err.error.message);
    } else {
      alert('Something went wrong, please try again');
    }
  }

  showUserInfo(info: IGetUserResponse): void {
    if (!info.id) {
      alert(info.message);
      this.showInfo = false;
    } else {
      this.showInfo = true;
      this.userInfo = info;
    }
  }

  getUserInfo(): void {
    if (this.searchText !== '') {
      this.apiService.getUser(this.searchText)
      .subscribe({
        next: (response: any) => this.showUserInfo(response),
        error: (err: any) => this.errorHandler(err)
      })
    } else {
      this.showInfo = false;
    }
  }

  changeSearchText(text: string): void {
    this.searchText = text;
    this.getUserInfo();
  }
}
