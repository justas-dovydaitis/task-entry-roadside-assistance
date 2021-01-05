import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarRegInputComponent } from './components/car-reg-input/car-reg-input.component';
import { LocationSelectionComponent } from './components/location-selection/location-selection.component';
import { WorkerTrackingComponent } from './components/worker-tracking/worker-tracking.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'set-car-number'
  },
  {
    path: 'set-car-number',
    component: CarRegInputComponent
  },
  {
    path: 'set-location',
    component: LocationSelectionComponent
  },
  {
    path: 'worker-tracking',
    component: WorkerTrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing: ModuleWithProviders<AppRoutingModule> = RouterModule.forRoot(routes);

