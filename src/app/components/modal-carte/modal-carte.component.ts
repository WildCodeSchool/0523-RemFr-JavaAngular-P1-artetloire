import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-carte',
  templateUrl: './modal-carte.component.html',
  styleUrls: ['./modal-carte.component.scss']
})
export class ModalCarteComponent {
  @Output() closeModal = new EventEmitter();

  close(): void {
    this.closeModal.emit();
  }
}
