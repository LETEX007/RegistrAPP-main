import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegmentPageRoutingModule } from './segment-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SegmentPage } from './segment.page';
import { ComponenteUnoComponent } from 'src/app/components/componente-uno/componente-uno.component';
import { ComponenteDosComponent } from 'src/app/components/componente-dos/componente-dos.component';
import { ComponenteTresComponent } from 'src/app/components/componente-tres/componente-tres.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegmentPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [SegmentPage,ComponenteUnoComponent,ComponenteDosComponent,ComponenteTresComponent]
})
export class SegmentPageModule {}
