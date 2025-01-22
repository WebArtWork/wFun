import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FunquestionComponent } from './funquestion.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: FunquestionComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [FunquestionComponent],
	providers: []
})
export class FunquestionModule {}
