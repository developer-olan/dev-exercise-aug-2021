import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Dosage } from 'src/app/models/Dosage';

@Component({
  selector: 'app-medication-plan-view',
  templateUrl: './medication-plan-view.component.html',
  styleUrls: ['./medication-plan-view.component.css']
})
export class MedicationPlanViewComponent implements OnInit {

  constructor(private router: Router, private activatedroute:ActivatedRoute) { }

  allDosages: any = [];
  
  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.allDosages = data;
      console.log(this.allDosages);
  })

  this.allDosages = history.state;
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
