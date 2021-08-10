import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Dosage } from 'src/app/models/Dosage';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-medication-plan-view',
  templateUrl: './medication-plan-view.component.html',
  styleUrls: ['./medication-plan-view.component.css'],
  providers: [NgbAccordionConfig] // add the NgbAccordionConfig to the component providers
})
export class MedicationPlanViewComponent implements OnInit {

  constructor(private router: Router, private activatedroute:ActivatedRoute, private ngbAccordionCfg: NgbAccordionConfig) { }

  allDosages: Array<Dosage> = [];
  allMornings: Array<Dosage> = [];
  allNoons: Array<Dosage> = [];
  allEvenings: Array<Dosage> = [];
  allNights: Array<Dosage> = [];

  
  ngOnInit(): void {
    this.ngbAccordionCfg.closeOthers = true;

    this.allDosages = Object.values(history.state); // Get Objects from previous component
    this.filterByDailyIntervals();
    console.log(Object.values(this.allDosages));
  }

  filterByDailyIntervals() {
    this.allMornings = this.allDosages.filter((v) => v.morning !== undefined);
    this.allNoons = this.allDosages.filter((v) => v.afternoon !== undefined);
    this.allEvenings = this.allDosages.filter((v) => v.evening !== undefined);
    this.allNights = this.allDosages.filter((v) => v.night !== undefined);
  }



  onValueChanges(result: any) {
  }

  navigateHome(): void {
    this.router.navigateByUrl('');
  };

  openScanner(): void {
    this.router.navigateByUrl('scanner/');
  };

}
