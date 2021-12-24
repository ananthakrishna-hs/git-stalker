import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { faSpinner, faSortUp, faSortDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ApiService, IGetUserResponse, IRepository } from 'src/app/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('loader', { static: false })
  loader: any;

  searchText: string;
  showInfo: boolean;
  showRepos: boolean;
  userInfo?: IGetUserResponse;

  faSpinner: IconDefinition;
  faSortUp: IconDefinition;
  faSortDown: IconDefinition;
  modalRef?: NgbModalRef;


  pageNumber: number;
  direction: 'asc' | 'desc';
  totalRepos: number;
  repositories: Array<IRepository>;

  constructor(
    private apiService: ApiService,
    private modal: NgbModal
  ) {
    this.searchText = '';
    this.showInfo = false;
    this.showRepos = false;
    this.pageNumber = 1;
    this.direction = 'asc';
    this.totalRepos = 0;
    this.repositories = [];
    this.faSpinner = faSpinner;
    this.faSortUp = faSortUp;
    this.faSortDown = faSortDown;
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

  clearSearch(): void {
    this.showInfo = false;
    this.showRepos = false;
    this.searchText = '';
    this.pageNumber = 1;
    this.direction = 'asc';
    this.totalRepos = 0;
    this.repositories = [];
  }

  errorHandler(err: any): void {
    this.clearSearch();
    console.error(err);
    if (err.error && err.error.message) {
      alert(err.error.message);
    } else {
      alert('Something went wrong, please try again');
    }
  }

  showRepositores(repos: Array<IRepository>): void {
    if (repos && repos.length) {
      this.repositories = repos;
      this.showRepos = true;
    } else {
      this.repositories = [];
    }
  }

  getRepos(): void {
    this.apiService.fetchRepos(this.searchText, this.pageNumber, this.direction).subscribe({
      next: (response: any) => this.showRepositores(response),
      error: (err: any) => this.errorHandler(err)
    });
  }

  showUserInfo(info: IGetUserResponse): void {
    if (!info.id) {
      alert(info.message);
      this.clearSearch();
    } else {
      this.showInfo = true;
      this.userInfo = info;
      this.totalRepos = info.public_repos;
      this.getRepos();
    }
  }

  getUserInfo(): void {
    if (this.searchText !== '') {
      this.pageNumber = 1;
      this.direction = 'asc';
      this.apiService.getUser(this.searchText)
      .subscribe({
        next: (response: any) => this.showUserInfo(response),
        error: (err: any) => this.errorHandler(err)
      })
    } else {
      this.clearSearch();
    }
  }

  changeSearchText(text: string): void {
    this.searchText = text;
    this.getUserInfo();
  }

  toggleSort(direction: 'asc' | 'desc'): void {
    this.pageNumber = 1;
    this.direction = direction;
    this.getRepos();
  }
}
