import { Component, OnInit, OnChanges, ViewChild, Input, ChangeDetectorRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';



@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() columns: string[] = [];
  @Input() itemsCount = 0;
  @Input() currentPage = 1;
  @Input() lastPage = 1;

  displayedColumns: any = [];

  @Input() dataTable;

@Input() showEdit : any = 0;
@Input() showDelete : any = 0;
@Input() showView : any = 0;


  dataSource : any = [];
config : any;
  @Output() editClicked = new EventEmitter<any>();
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() viewClicked = new EventEmitter<any>();
  @Output() addClicked = new EventEmitter<any>();
  @Output() pageClicked = new EventEmitter<any>();
  @Output() inputChange = new EventEmitter<any>();

  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: '',
    nextLabel: '',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };


  constructor(private cd: ChangeDetectorRef, private router: Router) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 0,
      totalItems: this.itemsCount
    };
  }

  ngOnInit() {

    console.log(this.dataTable);
    this.displayedColumns = this.columns;
    //     this.displayedColumns = this.columns.concat(['star']);
    //     this.columns = this.displayedColumns.concat(['start'])

    this.dataSource = this.dataTable;

    console.log(this.displayedColumns);
    console.log("check::"+this.dataSource);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = this.dataTable;
    console.log("display check::"+this.dataSource);
  }
  add(){
    this.addClicked.emit();
  }
  edit(id) {

    this.editClicked.emit(id);

  }
  view(id) {

    this.viewClicked.emit(id);

  }
  
  delete(id) {

    this.deleteClicked.emit(id);

  }

  paginate(event) {
    console.log(event);
   
    this.pageClicked.emit(event);
   
  }

  search(event){
    this.inputChange.emit(event);
  }

}
