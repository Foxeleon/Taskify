import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListDoneComponent } from './todo-list-done/todo-list-done.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'done', component: TodoListDoneComponent },
  { path: 'account', component: UserAccountComponent },
  { path: 'details/:id', component: DetailsComponent},
  { path: 'details/', redirectTo: '**', pathMatch: 'full'},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
