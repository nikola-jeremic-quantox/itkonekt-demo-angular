import { MediaMatcher } from '@angular/cdk/layout';
import {
  Component,
  ChangeDetectorRef,
  OnDestroy,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  smallScreen = '(max-width: 600px)';
  isLoggedOut: boolean;

  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia(this.smallScreen);
    this.mobileQuery.addListener(() => changeDetectorRef.detectChanges());
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
