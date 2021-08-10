import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-status-update-dialog',
  templateUrl: './status-update-dialog.component.html',
  styleUrls: ['./status-update-dialog.component.css']
})
export class StatusUpdateDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  
  @Input()
  title: string = "";

  @Input()
  message: string = "";


  ngOnInit(): void {
    this.title = this.data?.title;
    this.message = this.data?.message;
  }

}
