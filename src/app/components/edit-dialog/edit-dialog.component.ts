import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditDialogData } from '../../types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html'
})
export class EditDialogComponent implements OnInit {

  title: string;
  text: string;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private translateService: TranslateService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  getTranslation(key: string): string {
    return (key) ? this.translateService.instant(key) : '';
  }

  getUpdatedData(): EditDialogData {
    return {title: this.title, text: this.text};
  }

  ngOnInit(): void {
    this.title = this.getTranslation(this.data.title);
    this.text = this.getTranslation(this.data.text);
  }
}
