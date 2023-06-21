import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss']
})
export class ModalMapComponent implements AfterViewInit {
  @Input() museumInfo: any;

  @Output() closeModal = new EventEmitter();
  @Output() cardInfo = new EventEmitter();

  @ViewChild('modalMap') modalMapRef!: ElementRef;
  modalWidth = 0;

  constructor(private toastr: ToastrService) {}

  ngAfterViewInit(): void {
    this.modalWidth = this.modalMapRef.nativeElement.offsetWidth;
  }

  close(): void {
    this.closeModal.emit();
  }

  addCard(): void {
    const sessionData: string | null = localStorage.getItem('session');
    let dataList: any[] = [];
    if (sessionData) {
      dataList = JSON.parse(sessionData);
    }
    const isFavoriteInList = dataList.some((item: any) => {
      return item.recordid === this.museumInfo.recordid;
    });
    if (isFavoriteInList) {
      this.toastr.error('Ce musée est déjà dans votre liste de favoris')
    } else {
      dataList.push({
        id: this.museumInfo.identifiant,
        nom_offre: this.museumInfo.nom,
        commune: this.museumInfo.adresse,
        site_web: this.museumInfo.site,
        recordid: this.museumInfo.uuid,
      });
      localStorage.setItem('session', JSON.stringify(dataList));
      this.toastr.success('Musée ajouté aux favoris');
    }
    this.cardInfo.emit(this.museumInfo);
    this.closeModal.emit();
  }
}
