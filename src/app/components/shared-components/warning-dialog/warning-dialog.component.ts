import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'warning-dialog-dialog',
  templateUrl: './warning-dialog.component.html'
})
export class WarningDialogComponent implements OnInit {
  titleMessage: string;
  constructor(
    public dialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titleMessageData: string },
    private translateService: TranslateService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  getTranslation(key: string): string {
    return (key) ? this.translateService.instant(key) : '';
  }

  sendPositiveResponse(): boolean {
    return true;
  }

  ngOnInit(): void {
    this.titleMessage = this.getTranslation(this.data.titleMessageData);
  }
}
