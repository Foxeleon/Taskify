import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { Clipboard } from '@capacitor/clipboard';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) { }
  ngOnInit(): void {
    // TODO how to use it? Maybe need to hold value in store?
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(state => state.matches));
  }

  copyText = async (text: string) => {
    await Clipboard.write({
      string: text
    });
  }
}
