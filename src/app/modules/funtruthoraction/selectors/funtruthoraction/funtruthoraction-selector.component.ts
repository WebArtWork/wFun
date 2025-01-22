import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { FuntruthoractionService } from '../../services/funtruthoraction.service';
import { Funtruthoraction } from '../../interfaces/funtruthoraction.interface';

@Component({
	selector: 'funtruthoraction-selector',
	templateUrl: './funtruthoraction-selector.component.html',
	styleUrls: ['./funtruthoraction-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Funtruthoraction[] {
		return this._funtruthoractionService.funtruthoractions;
	}

	constructor(private _funtruthoractionService: FuntruthoractionService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
