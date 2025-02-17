import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () =>
					import('./pages/guest/components/components.module').then(
						(m) => m.ComponentsModule
					)
			},
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			
			{
				path: 'funword',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Funword'
					}
				},
				loadChildren: () => import('./modules/funword/pages/funword/funword.module').then(m => m.FunwordModule)
			}, 
			{
				path: 'funtag',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Funtag'
					}
				},
				loadChildren: () => import('./modules/funtag/pages/funtag/funtag.module').then(m => m.FuntagModule)
			}, 
			{
				path: 'funquestion',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Funquestion'
					}
				},
				loadChildren: () => import('./modules/funquestion/pages/funquestion/funquestion.module').then(m => m.FunquestionModule)
			}, 
			{
				path: 'funtruthoraction',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Funtruthoraction'
					}
				},
				loadChildren: () => import('./modules/funtruthoraction/pages/funtruthoraction/funtruthoraction.module').then(m => m.FuntruthoractionModule)
			}, 
			{
				path: 'funword',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Funword'
					}
				},
				loadChildren: () => import('./modules/funword/pages/funword/funword.module').then(m => m.FunwordModule)
			}, 
			{
				path: 'fungame',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Fungame'
					}
				},
				loadChildren: () => import('./modules/fungame/pages/fungame/fungame.module').then(m => m.FungameModule)
			}, 
			{
				path: 'funjoke',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Funjoke'
					}
				},
				loadChildren: () => import('./modules/funjoke/pages/funjoke/funjoke.module').then(m => m.FunjokeModule)
			}, 
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			},
			{
				path: 'menu',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Menu'
					}
				},
				loadChildren: () =>
					import('./pages/user/menu/menu.module').then(
						(m) => m.MenuModule
					)
			},

			{
				path: 'create-game',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Create-game'
					}
				},
				loadChildren: () =>
					import('./pages/user/create-game/create-game.module').then(
						(m) => m.CreateGameModule
					)
			},
			{
				path: 'gameplay',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Gameplay'
					}
				},
				loadChildren: () =>
					import('./pages/user/gameplay/gameplay.module').then(
						(m) => m.GameplayModule
					)
			},
			{
				path: 'jokes',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Jokes'
					}
				},
				loadChildren: () =>
					import('./pages/user/jokes/jokes.module').then(
						(m) => m.JokesModule
					)
			},
			{
				path: 'questions',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Questions'
					}
				},
				loadChildren: () =>
					import('./pages/user/questions/questions.module').then(
						(m) => m.QuestionsModule
					)
			},
			{
				path: 'truth-or-action',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Truth-or-action'
					}
				},
				loadChildren: () =>
					import('./pages/user/truth-or-action/truth-or-action.module').then(
						(m) => m.TruthOrActionModule
					)
			},
			{
				path: 'words',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Words'
					}
				},
				loadChildren: () =>
					import('./pages/user/words/words.module').then(
						(m) => m.WordsModule
					)
			},
			
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/customform/pages/customforms/customforms.module'
					).then((m) => m.CustomformsModule)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: environment.meta.title,
					description: environment.meta.description,
					titleSuffix: ' | ' + environment.meta.title,
					'og:image': environment.meta.icon
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			},
			alert: {
				alerts: {
					/* alerts */
				}
			},
			loader: {
				loaders: {
					/* loaders */
				}
			},
			popup: {
				popups: {
					/* popups */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [
		/* providers */
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
