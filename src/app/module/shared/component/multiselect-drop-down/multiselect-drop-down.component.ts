import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { MultiSelectData } from '../../model/multi-selelect-dropdown.model';

@Component({
  selector: 'app-multiselect-drop-down',
  templateUrl: './multiselect-drop-down.component.html',
  styleUrls: ['./multiselect-drop-down.component.scss']
})
export class MultiselectDropDownComponent {

  @Input() dropdownList: Array<MultiSelectData> = [];
  @Input() name:string="data";
  
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('checkbox') checkbox!: ElementRef;
  @Input() defaultValue: Array<MultiSelectData> = []
  @Output() sleetedData = new EventEmitter<Array<MultiSelectData>>();
  selectedScope: Array<MultiSelectData> = [];
  isOpen: boolean = false;
  theCheckbox: any;
  idRadio: string = 'idRadio'
  displayList: Array<MultiSelectData> =[]

  ngOnChanges(changes: SimpleChanges): void {

    for(let i=0;i<this.defaultValue.length;i++){
      let index=this.dropdownList.findIndex((x:MultiSelectData)=>x.id===this.defaultValue[i].id)
      if(index > -1){
        this.defaultValue[i].displayName=this.dropdownList[index].displayName ?  this.dropdownList[index].displayName:this.dropdownList[index].name
      }  
    }
    this.selectedScope = this.defaultValue;

    this.displayList=[...this.dropdownList]
  }

  constructor(
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if (e.target !== this.checkbox?.nativeElement && e.target !== this.toggleButton?.nativeElement && e.target !== this.menu?.nativeElement) {
        
        if(this.isOpen){
          this.sleetedData.emit(this.selectedScope)
        }
        this.isOpen = false;
   
      }
    });
  }

  selectAll(event: any) {
    if (event.target.checked) {
      this.selectedScope = [...this.displayList];
      this.sleetedData.emit(this.selectedScope)
    } else {
      this.selectedScope = [];
      this.sleetedData.emit(this.selectedScope)
    }

  }

  removeAt(name: string, event: Event) {
    event.stopPropagation()
    let index = this.selectedScope.findIndex((x: any) => x.name == name);
    this.isOpen = false;
    if (index == -1) {
    } else {
      this.selectedScope.splice(index, 1);
      this.sleetedData.emit(this.selectedScope)
    }
  }

  selectData(data: any, event: any) {
    if (event.target.checked) {
      this.selectedScope.push(data)
      this.sleetedData.emit(this.selectedScope)
    } else {
      let index = this.selectedScope.findIndex((x: any) => x.name == data);
      if (index == -1) {
      } else {
        this.selectedScope.splice(index, 1);
        this.sleetedData.emit(this.selectedScope)
      }
    }

  }

  openMultiselectDropDown(event: Event) {
    this.displayList=[...this.dropdownList]
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  getChecked(data: MultiSelectData) {
    let index = this.selectedScope.findIndex((x: any) => x.name == data.name);
    if (index == -1) {
      return false;
    } else {
      return true;
    }
  }

  close1() {
    this.isOpen = false;
  }

  selectDataAllCard(data: MultiSelectData, event: Event) {
    event.stopPropagation()
    let index = this.selectedScope.findIndex((x: MultiSelectData) => x.name == data.name);
    if (index == -1) {
      this.selectedScope.push(data);
      this.sleetedData.emit(this.selectedScope)
    } else {
      this.selectedScope.splice(index, 1);
      this.sleetedData.emit(this.selectedScope)
    }
    this.selectedScope = this.selectedScope;
  }

  closeAll(event:Event) {
    event.stopPropagation()
    this.selectedScope = [];
    this.sleetedData.emit(this.selectedScope)
  }

  changeData(data: string, event: Event) {
    event.stopPropagation()
    let filterArray =[ ... this.dropdownList.filter(x => {
      return x.name.toLowerCase().includes(data.toLowerCase());
    })];
    this.displayList=[...filterArray]
  }
}
