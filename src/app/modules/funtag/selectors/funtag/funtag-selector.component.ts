import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { FuntagService } from '../../services/funtag.service';
import { Funtag } from '../../interfaces/funtag.interface';

@Component({
	selector: 'funtag-selector',
	templateUrl: './funtag-selector.component.html',
	styleUrls: ['./funtag-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Funtag[] {
		return this._funtagService.funtags;
	}

	constructor(private _funtagService: FuntagService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
