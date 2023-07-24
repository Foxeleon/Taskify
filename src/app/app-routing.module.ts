import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoListDoneComponent } from './components/todo-list-done/todo-list-done.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { DetailsComponent } from './components/details/details.component';


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
