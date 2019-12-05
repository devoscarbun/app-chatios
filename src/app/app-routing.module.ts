import { NgModule, ContentChildren } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InitComponent} from './component/init/init.component';
import { AuthGuard } from './guards/auth.guard';
import { HomePageModule } from './home/home.module';
import { PerfilPageModule } from './perfil/perfil.module';
import { AdminPageModule } from './admin/admin.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  {path: 'ini',
  component: InitComponent,
  children: [
    
    {
      path: 'home',
      	children: [
          {
            path: '',
            loadChildren: './home/home.module#HomePageModule',
	      	canActivate: [ AuthGuard]
          }
        ]     
    },
    {
      path: 'admin',
      children: [
          {
            path: '',
            loadChildren: './admin/admin.module#AdminPageModule',
	        	canActivate: [ AuthGuard]
          }
        ]     
    },
    {
      path: 'Sadmin',
      children: [
          {
            path: '',
            loadChildren: './Sadmin/admin.module#SadminPageModule',
	        	canActivate: [ AuthGuard]
          }
        ]     
    },
    {
      path: 'perfil',
    	 children: [
          {
            path: '',
            loadChildren: './perfil/perfil.module#PerfilPageModule',
	        	canActivate: [ AuthGuard]
          }
        ]     
    },
    {
      path: 'nota',
      children: [
          {
            path: '',
            loadChildren: './nota/nota.module#NotaPageModule',
	        	canActivate: [ AuthGuard]
          }
        ]     
    }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
