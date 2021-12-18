import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchText = '';

  changeSearchText(text: string): void {
    this.searchText = text;
  }
}
