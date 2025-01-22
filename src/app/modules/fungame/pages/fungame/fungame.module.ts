import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FungameComponent } from './fungame.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: FungameComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [FungameComponent],
	providers: []
})
export class FungameModule {}
