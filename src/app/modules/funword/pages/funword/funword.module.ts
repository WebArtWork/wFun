import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FunwordComponent } from './funword.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: FunwordComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [FunwordComponent],
	providers: []
})
export class FunwordModule {}
