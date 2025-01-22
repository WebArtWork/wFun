import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { FunquestionService } from '../../services/funquestion.service';
import { Funquestion } from '../../interfaces/funquestion.interface';

@Component({
	selector: 'funquestion-selector',
	templateUrl: './funquestion-selector.component.html',
	styleUrls: ['./funquestion-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Funquestion[] {
		return this._funquestionService.funquestions;
	}

	constructor(private _funquestionService: FunquestionService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
