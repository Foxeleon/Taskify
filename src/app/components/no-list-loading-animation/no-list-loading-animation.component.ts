import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-list-loading-animation',
  templateUrl: './no-list-loading-animation.component.html'
})
export class NoListLoadingAnimationComponent {
  @Input() isDoneList: boolean;
}
