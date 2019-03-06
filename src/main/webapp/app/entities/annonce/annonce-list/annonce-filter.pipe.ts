import { Pipe, PipeTransform } from '@angular/core';
import { IAnnonce } from 'app/shared/model/annonce.model';

@Pipe({
    name: 'annonceFilter'
})
export class AnnonceFilterPipe implements PipeTransform {
    transform(value: IAnnonce[], args?: Array<any>): any {
        if (!value) {
            return [];
        }
        if (!args) {
            return value;
        }
        console.error(value);
        console.error(args);
        return value.filter(annonce => args.includes(annonce.status));
    }
}
