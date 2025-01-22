import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FunjokeComponent } from './funjoke.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: FunjokeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [FunjokeComponent],
	providers: []
})
export class FunjokeModule {}
