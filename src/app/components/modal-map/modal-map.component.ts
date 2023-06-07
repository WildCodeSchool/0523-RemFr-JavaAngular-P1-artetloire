import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss']
})
export class ModalMapComponent {
  @Output() closeModal = new EventEmitter();

  close(): void {
    this.closeModal.emit();
  }
}
