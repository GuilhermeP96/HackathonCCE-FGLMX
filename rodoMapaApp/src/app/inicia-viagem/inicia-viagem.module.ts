import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciaViagemPageRoutingModule } from './inicia-viagem-routing.module';

import { IniciaViagemPage } from './inicia-viagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciaViagemPageRoutingModule
  ],
  declarations: [IniciaViagemPage]
})
export class IniciaViagemPageModule {}
