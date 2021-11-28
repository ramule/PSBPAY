import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SessionTimeoutComponent } from './session-timeout.component';

const routes: Routes = [
  { path : '', component : SessionTimeoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionTimeoutRoutingModule { }
