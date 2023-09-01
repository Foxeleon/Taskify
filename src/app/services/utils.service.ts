import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { Clipboard } from '@capacitor/clipboard';
import { TodoAnnotationComponent } from '../components/shared-components/todo-annotation/todo-annotation.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver, private snackBar: MatSnackBar,) { }
  ngOnInit(): void {
    // TODO how to use it? Maybe need to hold value in store?
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches));
  }

  copyText = async (text: string) => {
    await Clipboard.write({
      string: text
    });
  }

  openSnackBar() {
    const snackBarRef: MatSnackBarRef<any> =
      this.snackBar.openFromComponent(TodoAnnotationComponent, {
        duration: 1500,
        data: {message: 'setWeeklyTodoAnnotationIN'}
      });
    snackBarRef.instance.data = {message: 'setWeeklyTodoAnnotation'};
  }
}
