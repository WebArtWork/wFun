import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MenuComponent } from '../menu/menu.component';
import { MenusComponent } from './menus/menus.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: MenuComponent
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [MenuComponent, MenusComponent]
})
export class MenuModule { }
