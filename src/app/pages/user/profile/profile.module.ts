import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';

const routes: Routes = [
	{
		path: ':fungame_id',
		component: ProfileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule ],
	declarations: [ProfileComponent, ProfilesComponent],
	providers: []
})
export class ProfileModule {}
