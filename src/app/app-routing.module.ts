import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StructureComponent } from './components/structure/structure.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AddlanguageComponent } from './components/language/addlanguage/addlanguage.component';
import { AddcategoryComponent } from './components/category/addcategory/addcategory.component';
import { CategorylistComponent } from './components/category/categorylist/categorylist.component';
import { LanguagelistComponent } from './components/language/languagelist/languagelist.component';
import { UserlistComponent } from './components/users/userlist/userlist.component';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'admin', component: StructureComponent, children: [
      {path: 'dashboard', component: DashboardComponent},
     
      {path: 'categorylist', component: CategorylistComponent},
      {path: 'addcategory', component: AddcategoryComponent},


      {path: 'languagelist', component: LanguagelistComponent},
      {path: 'addlanguage', component: AddlanguageComponent},

      {path: 'userlist', component: UserlistComponent},




    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
