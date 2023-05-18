import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoUI';

  constructor(public translateService: TranslateService ) {
    translateService.addLangs(['de', 'en', 'ru']);
    translateService.setDefaultLang('de');
    const browserLang = translateService.getBrowserLang();
    translateService.use(browserLang.match(/de|en|ru/) ? browserLang : 'de');
  }
}
