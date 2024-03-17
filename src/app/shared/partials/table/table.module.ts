import { NgModule } from '@angular/core';

import { TableComponent } from './components/table/table.component';
import { TableBodyComponent } from './components/table-body/table-body.component';
import { TableBodyCellComponent } from './components/table-body-cell/table-body-cell.component';
import { TableBodyRowComponent } from './components/table-body-row/table-body-row.component';
import { TableContainerComponent } from './components/table-container/table-container.component';
import { TableHeadComponent } from './components/table-head/table-head.component';
import { TableHeaderCellComponent } from './components/table-header-cell/table-header-cell.component';
import { TableHeaderRowComponent } from './components/table-header-row/table-header-row.component';

@NgModule({
  imports: [
    TableComponent,
    TableContainerComponent,
    TableHeadComponent,
    TableHeaderRowComponent,
    TableHeaderCellComponent,
    TableBodyComponent,
    TableBodyRowComponent,
    TableBodyCellComponent,
  ],
  exports: [
    TableComponent,
    TableContainerComponent,
    TableHeadComponent,
    TableHeaderRowComponent,
    TableHeaderCellComponent,
    TableBodyComponent,
    TableBodyRowComponent,
    TableBodyCellComponent,
  ],
})
export class TableModule {}
