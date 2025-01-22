import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FuntruthoractionComponent } from './funtruthoraction.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: FuntruthoractionComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [FuntruthoractionComponent],
	providers: []
})
export class FuntruthoractionModule {}
