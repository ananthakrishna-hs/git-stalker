import { Component, Input, OnInit } from '@angular/core';

import { faMapMarkerAlt, faLink } from '@fortawesome/free-solid-svg-icons';

import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import { IGetUserResponse } from 'src/app/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input()
  userInfo?: IGetUserResponse;

  faMapMarkerAlt = faMapMarkerAlt;
  faTwitter = faTwitter;
  faLink = faLink;

  constructor() { }

  ngOnInit(): void {
  }

  copyTextToClipboard(text?: string): void {
    if (text) {
      navigator.clipboard.writeText(text);
    }
  }

}
