import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { FungameService } from '../../services/fungame.service';
import { Fungame } from '../../interfaces/fungame.interface';

@Component({
	selector: 'fungame-selector',
	templateUrl: './fungame-selector.component.html',
	styleUrls: ['./fungame-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Fungame[] {
		return this._fungameService.fungames;
	}

	constructor(private _fungameService: FungameService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
