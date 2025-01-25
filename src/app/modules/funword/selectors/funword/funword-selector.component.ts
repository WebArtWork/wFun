import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { FunwordService } from '../../services/funword.service';
import { Funword } from '../../interfaces/funword.interface';

@Component({
	selector: 'funword-selector',
	templateUrl: './funword-selector.component.html',
	styleUrls: ['./funword-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Funword[] {
		return this._funwordService.funwords;
	}

	constructor(private _funwordService: FunwordService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
