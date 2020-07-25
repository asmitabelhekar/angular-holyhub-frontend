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
import { AdvertisementlistComponent } from './components/advertisement/advertisementlist/advertisementlist.component';
import { UpdatepriceComponent } from './components/updateprice/updateprice.component';
import { BannerlistComponent } from './components/banner/bannerlist/bannerlist.component';
import { BannerupdateComponent } from './components/banner/bannerupdate/bannerupdate.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import {PaymentlogsComponent} from './components/paymentlogs/paymentlogs.component'
import { InactivebannerlistComponent } from './components/inactivebannerlist/inactivebannerlist.component';
import { InactiveadvertiselistComponent } from './components/inactiveadvertiselist/inactiveadvertiselist.component';
import { SubscriptionsdetailsComponent } from './components/subscriptionsdetails/subscriptionsdetails.component';


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
      {path: 'advertisementlist', component: AdvertisementlistComponent},
      {path: 'updateprice', component: UpdatepriceComponent},

      {path: 'bannerlist', component: BannerlistComponent},
      {path: 'bannerupdate', component: BannerupdateComponent},

      {path: 'notifications', component: NotificationsComponent},

      {path:'paymentlogs',component:PaymentlogsComponent},

      {path:'inactivebannerlist',component:InactivebannerlistComponent},

      {path:'inactiveadvertiselist',component:InactiveadvertiselistComponent},

      {path:'subscriptionsdetails',component:SubscriptionsdetailsComponent}





    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
