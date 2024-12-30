import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidebarServiceService {

  public toggle: BehaviorSubject<string> = new BehaviorSubject('');
}
