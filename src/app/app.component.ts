import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay, take } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { selectLanguage } from './store/home/home.selector';
import { HomeActions } from './store/home/home.actions';
import { TodoService } from './services/todo.service';
import { WeeklyTodoService } from './components/weekly-to-do/weekly-todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isHandset$: Observable<boolean>;
  version = environment.version;
  appLanguage$: Observable<string>;

  constructor(public translateService: TranslateService,
              private breakpointObserver: BreakpointObserver,
              private store: Store<AppState>,
              private todoService: TodoService,
              private weeklyTodoService: WeeklyTodoService) {
    translateService.addLangs(['ru', 'en', 'de']);
    translateService.setDefaultLang('en');
    const browserLang = translateService.getBrowserLang();
    this.store.select(selectLanguage).pipe(take(1)).subscribe(value => {
      const storedLanguage = localStorage.getItem('taskifyLanguageApp');
      const appLanguage = !!value ? value : !!storedLanguage ? storedLanguage : browserLang.match(/ru|en|de/) ? browserLang : 'ru';
      this.store.dispatch(HomeActions.setLanguage({appLanguage}));
    });
  }
  ngOnInit(): void {
    // update todos from localStorage
    this.todoService.initTodos();
    // update weeklyTodos from localStorage
    this.weeklyTodoService.getWeeklyTodosLocalStorage();
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches), shareReplay());
    this.appLanguage$ = this.store.select(selectLanguage);
    this.appLanguage$.subscribe(appLanguage => {
      this.translateService.use(appLanguage);
      localStorage.setItem('taskifyLanguageApp', appLanguage);
    });
  }
  changeLanguage(appLanguage: string) {
    this.store.dispatch(HomeActions.setLanguage({appLanguage}));
  }
}
