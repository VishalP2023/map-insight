import { Component, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from '../../model/alert.model';
import { AlertService } from '../../service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;
  routeSubscription!: Subscription;
  private alertTypeIconsMap: Map<AlertType, string> = new Map<AlertType, string>();
  private alertTypeBackgroundMap: Map<AlertType, string> = new Map<AlertType, string>(); 

  constructor(private router: Router, private alertService: AlertService) {
    //TODO The icons name(fa-search) need to be replaced with the required icons, As soon as the font aswesom updated we need to change the icons.
    // icons 
    this.alertTypeIconsMap.set(AlertType.Success, 'fa fa-check')
    this.alertTypeIconsMap.set(AlertType.Error, 'fa fa-xmark')
    this.alertTypeIconsMap.set(AlertType.Info, 'fa fa-circle-info')
    this.alertTypeIconsMap.set(AlertType.Warning, 'fa fa-triangle-exclamation')

    // background
    this.alertTypeBackgroundMap.set(AlertType.Success, 'alert-bg-success')
    this.alertTypeBackgroundMap.set(AlertType.Error, 'alert-bg-danger')
    this.alertTypeBackgroundMap.set(AlertType.Info, 'alert-bg-primary')
    this.alertTypeBackgroundMap.set(AlertType.Warning, 'alert-bg-warning')

    
   }

  ngOnInit() {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
          // remove 'keepAfterRouteChange' flag on the rest
        // santosh zanak  this.alerts.forEach(x => delete  x.keepAfterRouteChange);
          return;
        }
        // add alert to array
        this.alerts.push(alert);
        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });
    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;
    if (this.fade) {
      // fade out alert
      this.alerts.find((x: any) => x === alert)!.fade = true;
      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  getAlertIcon(alert: Alert) {
    let iconClass: string = "";
    if (alert) {
      iconClass = 'fa-lg ' + this.alertTypeIconsMap.get(alert.type);
    }
    return iconClass;
  }

  getBgColor(alert: Alert) {
    let bgClass: string = "";
    if (alert) {
      bgClass = 'bg ' + this.alertTypeBackgroundMap.get(alert.type);
    }
    return bgClass;
  }
}
