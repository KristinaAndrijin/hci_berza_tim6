import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-waiting-spinner',
  templateUrl: './waiting-spinner.component.html',
  styleUrls: ['./waiting-spinner.component.css']
})
export class WaitingSpinnerComponent {

  @Input() showOverlay?: boolean;

}
