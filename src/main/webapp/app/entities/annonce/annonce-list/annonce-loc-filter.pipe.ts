import { Pipe, PipeTransform } from '@angular/core';
import { IAnnonce } from 'app/shared/model/annonce.model';

@Pipe({
    name: 'annonceLocFilter'
})
export class AnnonceLocFilterPipe implements PipeTransform {
    transform(value: IAnnonce[], args?: any): any {
        if (!value) {
            return [];
        }
        if (!args) {
            return value;
        }
        console.error(value);
        console.error(args);
        return value.filter(
            annonce =>
                annonce.profil.adresse.toLowerCase().includes(args.toLowerCase()) ||
                annonce.profil.pays.toLowerCase().includes(args.toLowerCase())
        );
    }
}
