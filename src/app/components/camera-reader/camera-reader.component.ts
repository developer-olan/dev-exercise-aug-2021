import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dosage } from 'src/app/models/Dosage';
import * as xml2js from 'xml2js';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StatusUpdateDialogComponent } from '../status-update-dialog/status-update-dialog.component'

@Component({
  selector: 'app-camera-reader',
  templateUrl: './camera-reader.component.html',
  styleUrls: ['./camera-reader.component.css']
})
export class CameraReaderComponent implements OnInit {
  // Parser class attributes
  testXMlString: string = "";
  parser = new xml2js.Parser({ trim: true, explicitArray: true });
  plansArray: Array<Dosage> = [];
  
  // ZXing scanner class attributes
  availableDevices!: MediaDeviceInfo[];
  deviceCurrent!: MediaDeviceInfo;
  deviceSelected!: string;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.AZTEC,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices!: boolean;
  hasPermission!: boolean;

  qrResultString?: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = true;


  constructor(private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  extractDosage = (readCode: string) => {
    var self = this;
    this.parser.parseString(readCode, function (err: any, result: any) {
      var k: string | number;
      var j: string | number;
      if (result?.MP === undefined) {
        self.openMessageDialog("Invalid Code", "The code you have scanned is invalid. Please try again");
      } else {
        var obj = result.MP.S;
        for (k in obj) {
          var item = obj[k];
          for (j in item.M) {
            var singleEntry = item.M[j].$;
            self.plansArray.push({medicineId: singleEntry.p, morning: singleEntry.m, afternoon: singleEntry.d, evening: singleEntry.v, night: singleEntry.h, purpose: singleEntry.r});
          }
        }
      }
    });

  }

  initializeTestXML() {
    this.testXMlString = '<MP v="025" U="02BD2867FB024401A590D59D94E1FFAE" l="de-DE"><P g="Jürgen" f="Wernersen" b="19400324"/><A n="Praxis Dr. Michael Müller" s="Schloßstr. 22" z="10555" c="Berlin" p="030-1234567" e="dr.mueller@kbv-net.de" t="2018-07-01T12:00:00"/><S> <M p="230272" m="1" du="1" r="Herz/Blutdruck"/><M p="2223945" m="1" du="1" r="Blutdruck"/><M p="558736" m="20" v="20" du="p" i="Wechseln der Injektionsstellen, unmittelbar vor einer Mahlzeit spritzen" r="Diabetes"/><M p="9900751" v="1" du="1" r="Blutfette"/></S><S t="zu besonderen Zeiten anzuwendende Medikamente"><M p="2239828" t="alle drei Tage 1" du="1" i="auf wechselnde Stellen aufkleben" r="Schmerzen"/></S><S c="418"><M p="2455874" m="1" du="1" r="Stimmung"/></S></MP>'
  }

  openMessageDialog(title: string, message: string) {
    StatusUpdateDialogComponent
    this.dialog.open(StatusUpdateDialogComponent, {
      data: {
        title: title,
        message: message,
      }
    });
  }

  navigateHome(): void {
    this.router.navigateByUrl('');
  };

  navigatePlanView = () => {
    this.router.navigateByUrl('plan-view/',  {state: this.plansArray});
  };

  viewUsingDemoCode() {
    this.initializeTestXML();
    this.extractDosage(this.testXMlString);
    if (this.plansArray.length > 0) {
      this.navigatePlanView();
    }
  }

  //#region  Scanner Handlers
  
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.extractDosage(resultString);
    if (this.plansArray.length > 0) {
      this.navigatePlanView();
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  //#endregion
  

}
