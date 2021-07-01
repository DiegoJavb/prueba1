import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate,redirectUnauthorizedTo,redirectLoggedInTo } from '@angular/fire/auth-guard';

//enviar a los usuarios authrizados

const redirectUnauthorizedToLogin=()=>{
  redirectUnauthorizedTo(['/'])
};

const redirectLoggedInToChat =()=>{
  redirectLoggedInTo(['/chat-page'])
};
const routes: Routes = [
  
  // {
  //   path: '',
  //   redirectTo: 'chat-page',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule),
    // ...canActivate(redirectLoggedInToChat)
  },
  {
    path: 'chat-page',
    loadChildren: () => import('./chat-page/chat-page.module').then( m => m.ChatPagePageModule),
    // ...canActivate(redirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
function newFunction(): any {
  return 'c';
}

