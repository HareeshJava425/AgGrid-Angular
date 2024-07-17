import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  ColDef,
  ColGroupDef,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  createGrid,
  GridApi,
} from 'ag-grid-community';

import { IOlympicData } from './interface';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
   // Add Angular Data Grid Component
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  private gridApi!: GridApi<IOlympicData>;

  public rowSelection: "single" | "multiple" = "multiple";

  public rowData!: IOlympicData[];
  
  constructor(private http: HttpClient) {}
  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 150 },
    { field: "age", maxWidth: 90 },
    { field: "country", minWidth: 150 },
    { field: "year", maxWidth: 90 },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };

defaulColDefs = {

  flex :1,
  minWidth :100

}

onBtExport() {
  this.gridApi.exportDataAsCsv();
}

onSelectionChanged($event:any) {
  var selectedRows = this.gridApi.getSelectedRows();
  var selectedRowsString = "";
  var maxToShow = 5;
  console.log("selected rows "+selectedRows);
  selectedRows.forEach(function (selectedRow, index) {
    console.log("selected rows "+selectedRow.athlete);
    if (index >= maxToShow) {
      return;
    }
    if (index > 0) {
      selectedRowsString += ", ";
    }
    selectedRowsString += selectedRow.athlete;
  });
  if (selectedRows.length > maxToShow) {
    var othersCount = selectedRows.length - maxToShow;
    selectedRowsString +=
      " and " + othersCount + " other" + (othersCount !== 1 ? "s" : "");
  }
  (document.querySelector("#selectedRows") as any).innerHTML =
    selectedRowsString;
}

onGridReady(params: GridReadyEvent<IOlympicData>) {
  this.gridApi = params.api;

  this.http
    .get<
      IOlympicData[]
    >("https://www.ag-grid.com/example-assets/olympic-winners.json")
    .subscribe((data) => (this.rowData = data));
}

}
