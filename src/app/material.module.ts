import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const importExportModules = [
  MatButtonModule,
  MatIconModule
];

@NgModule({
  imports: importExportModules,
  exports: importExportModules
})
export class MaterialModule {}
