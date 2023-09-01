import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule,  TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TodoListDoneComponent } from './components/todo-list-done/todo-list-done.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { DetailsComponent } from './components/details/details.component';
import { UserComponent } from './components/user/user.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeeklyToDoComponent } from './components/weekly-to-do/weekly-to-do.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideState, provideStore } from '@ngrx/store';
import { homeReducer } from './store/home/home.reducer';
import { HOME_FEATURE_KEY, HomeState } from './store/home/home.state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { WeeklyToDosListComponent } from './components/weekly-to-dos-list/weekly-to-dos-list.component';
import { WEEKLY_TODO_FEATURE_KEY, WeeklyTodoState } from './store/weekly-to-do/weekly-to-do.state';
import { weeklyTodoReducer } from './store/weekly-to-do/weekly-to-do.reducer';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonsCompleteDeleteAllComponent } from './components/shared-components/buttons-complete-delete-all/buttons-complete-delete-all.component';
import { NoListLoadingAnimationComponent } from './components/shared-components/no-list-loading-animation/no-list-loading-animation.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteWarningDialogComponent } from './components/delete-warning-dialog/delete-warning-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoAnnotationComponent } from './components/todo-annotation/todo-annotation.component';
import { TodoFilterPipe } from './pipe/todo-filter.pipe';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    TodolistComponent,
    HomeComponent,
    NotfoundComponent,
    TodoListDoneComponent,
    UserAccountComponent,
    DetailsComponent,
    UserComponent,
    WeeklyToDoComponent,
    WeeklyToDosListComponent,
    ButtonsCompleteDeleteAllComponent,
    NoListLoadingAnimationComponent,
    EditDialogComponent,
    DeleteWarningDialogComponent,
    TodoAnnotationComponent,
    TodoFilterPipe,
  ],
    imports: [
        MatTabsModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatExpansionModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatDialogModule,
        MatSnackBarModule,
    ],
  providers: [
    provideStore(),
    provideState<HomeState>(HOME_FEATURE_KEY, homeReducer),
    provideState<WeeklyTodoState>(WEEKLY_TODO_FEATURE_KEY, weeklyTodoReducer),
    provideStoreDevtools(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
