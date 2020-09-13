import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

const importExportModules = [
  MatButtonModule
];

@NgModule({
  imports: importExportModules,
  exports: importExportModules
})
export class MaterialModule {}
