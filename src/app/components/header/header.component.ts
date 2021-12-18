import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed = true;
  searchText = '';

  @Output()
  searchEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  formButtonsHandler(event: Event, searchFlag: boolean): void {
    if (searchFlag) {
      event.preventDefault();
      this.searchEvent.emit(this.searchText);
    } else {
      this.searchText = '';
      this.searchEvent.emit('');
    }
  }

}
