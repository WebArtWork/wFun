import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ActionComponent } from './action.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ActionComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ActionComponent]
})
export class ActionModule {}
