import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraReaderComponent } from './components/camera-reader/camera-reader.component';
import { MedicationPlanViewComponent } from './components/medication-plan-view/medication-plan-view.component';
import { StartComponent } from './components/start/start.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'scanner/',
    component: CameraReaderComponent,
  },
  {
    path: 'plan-view/',
    component: MedicationPlanViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
