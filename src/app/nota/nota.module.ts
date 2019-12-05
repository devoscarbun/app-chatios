import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { NotaPage } from "./nota.page";


@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotaPage
      }
    ])
  ],
  declarations: [NotaPage]
})
export class NotaPageModule {}
