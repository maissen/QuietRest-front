import { Component, Input } from '@angular/core';
import { CreateSectionService } from 'src/app/services/create-section.service';

@Component({
  selector: 'app-bottom-sheet-content',
  templateUrl: './bottom-sheet-content.component.html',
  styleUrls: ['./bottom-sheet-content.component.scss']
})
export class BottomSheetContentComponent {

  @Input() data: any[] = [];

  constructor(
    public createSectionService: CreateSectionService
  ) {}

}
