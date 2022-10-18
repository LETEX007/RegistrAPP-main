import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponenteDosComponent } from 'src/app/components/componente-dos/componente-dos.component';
import { ComponenteTresComponent } from 'src/app/components/componente-tres/componente-tres.component';
import { ComponenteUnoComponent } from 'src/app/components/componente-uno/componente-uno.component';

import { SegmentPage } from './segment.page';

const routes: Routes = [
  {
    path: '',
    component: SegmentPage,
    children:[
      {
        path:'uno',
        component:ComponenteUnoComponent
      },
      {
        path:'dos',
        component:ComponenteDosComponent
      },
      {
        path:'tres',
        component:ComponenteTresComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegmentPageRoutingModule {}
