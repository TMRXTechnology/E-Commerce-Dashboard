// shared.module.ts

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from '../shared/pipe/currency-format.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CurrencyFormatPipe,
    
  ],
  imports: [
    CommonModule,
    FormsModule 
    
  ],
  exports: [
    CommonModule,
    CurrencyFormatPipe,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
