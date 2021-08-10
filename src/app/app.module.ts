import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraReaderComponent } from './components/camera-reader/camera-reader.component';
import { MedicationPlanViewComponent } from './components/medication-plan-view/medication-plan-view.component';
import { StartComponent } from './components/start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusUpdateDialogComponent } from './components/status-update-dialog/status-update-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CameraReaderComponent,
    MedicationPlanViewComponent,
    StartComponent,
    StatusUpdateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ZXingScannerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    NgbAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
