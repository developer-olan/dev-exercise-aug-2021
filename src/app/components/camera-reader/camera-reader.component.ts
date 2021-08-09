import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dosage } from 'src/app/models/Dosage';
import * as xml2js from 'xml2js';

@Component({
  selector: 'app-camera-reader',
  templateUrl: './camera-reader.component.html',
  styleUrls: ['./camera-reader.component.css']
})
export class CameraReaderComponent implements OnInit {
  testXMlString: string = "";
  parser = new xml2js.Parser({ trim: true, explicitArray: true });
  plansArray: Array<Dosage> = [];

  qrResultString?: string;

  clearResult(): void {
    this.qrResultString = "";
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    alert(this.qrResultString);
  }

  constructor(private router: Router) {
    this.initialiazeTestXML();
    this.extractDosage();
    //this.navigatePlanView();
  }

  ngAfterViewInit() {
  }

  onValueChanges(result: any) {
  }

  onStarted(started: any) {
  }


 

  ngOnInit(): void {
  }
  
  navigateHome(): void {
    this.router.navigateByUrl('');
  };

  navigatePlanView(): void {
    this.router.navigateByUrl('plan-view/',  { state: this.plansArray[0] });
  };

  initialiazeTestXML() {
    this.testXMlString = '<MP v="025" U="02BD2867FB024401A590D59D94E1FFAE" l="de-DE"><P g="Jürgen" f="Wernersen" b="19400324"/><A n="Praxis Dr. Michael Müller" s="Schloßstr. 22" z="10555" c="Berlin" p="030-1234567" e="dr.mueller@kbv-net.de" t="2018-07-01T12:00:00"/><S> <M p="230272" m="1" du="1" r="Herz/Blutdruck"/><M p="2223945" m="1" du="1" r="Blutdruck"/><M p="558736" m="20" v="20" du="p" i="Wechseln der Injektionsstellen, unmittelbar vor einer Mahlzeit spritzen" r="Diabetes"/><M p="9900751" v="1" du="1" r="Blutfette"/></S><S t="zu besonderen Zeiten anzuwendende Medikamente"><M p="2239828" t="alle drei Tage 1" du="1" i="auf wechselnde Stellen aufkleben" r="Schmerzen"/></S><S c="418"><M p="2455874" m="1" du="1" r="Stimmung"/></S></MP>'
  }

  extractDosage = () => {
    var self = this;
    this.parser.parseString(this.testXMlString, function (err: any, result: any) {
      var k: string | number;
      var j: string | number;
      var obj = result.MP.S;
      //alert(JSON.stringify(obj)); singleEntry.d
      for (k in obj) {
        var item = obj[k];
        for (j in item.M) {
          var singleEntry = item.M[j].$;
          self.plansArray.push({medicineId: singleEntry.p, morning: singleEntry.m, afternoon: singleEntry.d, evening: singleEntry.v, night: singleEntry.h});
        }
      }
      alert(JSON.stringify(self.plansArray));
    });

  }

}
