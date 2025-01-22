import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FuntagComponent } from './funtag.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: FuntagComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [FuntagComponent],
	providers: []
})
export class FuntagModule {}
