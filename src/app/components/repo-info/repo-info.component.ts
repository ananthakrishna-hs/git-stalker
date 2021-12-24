import { Component, Input, OnInit } from '@angular/core';

import { IRepository } from 'src/app/core';

@Component({
  selector: 'app-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrls: ['./repo-info.component.scss']
})
export class RepoInfoComponent implements OnInit {
  @Input()
  repo?: IRepository;

  constructor() { }

  ngOnInit(): void {
  }

}
