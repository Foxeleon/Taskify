import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'delete-warning-dialog-dialog',
  templateUrl: './delete-warning-dialog.component.html'
})
export class DeleteWarningDialogComponent implements OnInit {
  titleMessage: string;
  constructor(
    public dialogRef: MatDialogRef<DeleteWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titleMessageData: string },
    private translateService: TranslateService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  getTranslation(key: string): string {
    console.log(key);
    return (key) ? this.translateService.instant(key) : '';
  }

  sendPositiveResponse(): boolean {
    return true;
  }

  ngOnInit(): void {
    this.titleMessage = this.getTranslation(this.data.titleMessageData);
  }
}
