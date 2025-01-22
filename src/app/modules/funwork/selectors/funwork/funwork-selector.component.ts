import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { FunworkService } from '../../services/funwork.service';
import { Funwork } from '../../interfaces/funwork.interface';

@Component({
	selector: 'funwork-selector',
	templateUrl: './funwork-selector.component.html',
	styleUrls: ['./funwork-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Funwork[] {
		return this._funworkService.funworks;
	}

	constructor(private _funworkService: FunworkService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
