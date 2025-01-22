import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { FunjokeService } from '../../services/funjoke.service';
import { Funjoke } from '../../interfaces/funjoke.interface';

@Component({
	selector: 'funjoke-selector',
	templateUrl: './funjoke-selector.component.html',
	styleUrls: ['./funjoke-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Funjoke[] {
		return this._funjokeService.funjokes;
	}

	constructor(private _funjokeService: FunjokeService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
