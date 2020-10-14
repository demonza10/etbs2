import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../bank.service';
import { ListDataSource, ListItem } from './list-datasource';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit {
constructor(private route: ActivatedRoute, private router:Router, private bankService: BankService){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ListItem>;
  dataSource: ListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','menu'];

  ngOnInit() {
    this.dataSource = new ListDataSource(this.route.snapshot.data.item.data);
    // console.log(this.route.snapshot.data.item.data);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  addData() {
    this.router.navigateByUrl("/bank/form/new");
  }

  editData(item){
    this.router.navigateByUrl("/bank/form/"+item._id);
  }

  deleteData(item) {
    this.bankService.deleteBankData(item).then((res) => {
      this.bankService.getBankDataList().subscribe((res: any) => {
        this.table.dataSource = res.data;
      })
    })
  }

}
