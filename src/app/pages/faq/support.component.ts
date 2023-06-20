import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Faq } from 'src/app/models/faq.model';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  faqQuestion: Faq[] = [
    {
      title: "Quels sont les musées les plus populaires dans l'Indre-et-Loir ?",
      desc: "Parmi les musées les plus populaires dans l'Indre-et-Loir, on retrouve le Musée des Beaux-Arts de Tours, le Musée Balzac à Saché, le Musée Rabelais à La Devinière, le Musée du Compagnonnage à Tours, le Musée de la Préhistoire du Grand-Pressigny, le Musée Maurice Dufresne à Azay-le-Rideau, et le Musée du Gemmail à Tours.",
      show: false
    },
    {
      title: "Quels sont les horaires d'ouverture des musées ?",
      desc: "Les horaires d'ouverture des musées peuvent varier d'un établissement à l'autre. Il est recommandé de consulter le site internet officiel de chaque musée pour obtenir les informations les plus à jour sur les horaires d'ouverture.",
      show: false
    },
    {
      title: "Existe-t-il des tarifs réduits pour les étudiants et les personnes âgées ?",
      desc: "Oui, de nombreux musées offrent des tarifs réduits pour les étudiants et les personnes âgées. Ces réductions varient d'un musée à l'autre, il est donc conseillé de vérifier les tarifs spécifiques sur le site internet du musée concerné.",
      show: false
    },
    {
      title: "Est-ce que les musées proposent des visites guidées ?",
      desc: "Oui, de nombreux musées proposent des visites guidées. Certaines visites guidées sont incluses dans le prix d'entrée, tandis que d'autres peuvent nécessiter une réservation préalable. Il est recommandé de contacter directement le musée pour obtenir des informations détaillées sur les visites guidées disponibles.",
      show: false
    },
    {
      title: "Y a-t-il des activités pour les enfants dans les musées ?",
      desc: "Oui, de nombreux musées proposent des activités spécialement conçues pour les enfants, telles que des ateliers créatifs, des jeux de piste, des visites adaptées, etc. Ces activités varient d'un musée à l'autre, il est donc conseillé de se renseigner auprès du musée concerné pour connaître les options disponibles.",
      show: false
    },
    {
      title: "Est-ce que les musées sont accessibles aux personnes à mobilité réduite ?",
      desc: "La plupart des musées font des efforts pour garantir l'accessibilité aux personnes à mobilité réduite. Cependant, il est préférable de vérifier les installations spécifiques disponibles dans chaque musée, telles que les rampes d'accès, les ascenseurs et les toilettes adaptées, en consultant leur site internet ou en les contactant directement.",
      show: false
    },
    {
      title: "Comment puis-je me tenir informé des expositions temporaires et des événements spéciaux dans les musées ?",
      desc: "Pour rester informé des expositions temporaires et des événements spéciaux dans les musées de l'Indre-et-Loir, vous pouvez consulter les sites internet des musées, vous abonner à leurs newsletters ou suivre leurs pages sur les réseaux sociaux. Ces canaux de communication vous permettront d'obtenir les dernières informations sur les expositions et les événements à ne pas manquer.",
      show: false
    }
  ];

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onClick(index: number): void {
    this.faqQuestion[index].show = !this.faqQuestion[index].show;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(`Email : ${this.userForm.value.email}`);
      console.log(`Message : ${this.userForm.value.message}`);
      this.userForm.reset();
    }
  }
}
