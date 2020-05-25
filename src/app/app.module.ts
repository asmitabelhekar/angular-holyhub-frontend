import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowser } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSortModule,
  MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule, MatFormFieldModule, MatExpansionModule, MatStepperModule, MatNativeDateModule, MatOptionModule
} from '@angular/material';
import 'hammerjs';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StructureComponent } from './components/structure/structure.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { LoginComponent } from './components/login/login.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';

import { TableViewComponent } from './components/common/table-view/table-view.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApiService } from './services/api/api.service';
import { CdkTableModule } from '@angular/cdk/table';

import { GoogleChartsModule } from 'angular-google-charts';
import { AddcategoryComponent } from './components/category/addcategory/addcategory.component';
import { CategorylistComponent } from './components/category/categorylist/categorylist.component';
import { AddlanguageComponent } from './components/language/addlanguage/addlanguage.component';
import { LanguagelistComponent } from './components/language/languagelist/languagelist.component';
import { UserlistComponent } from './components/users/userlist/userlist.component';
import { PopupComponent } from './components/showpopup/popup/popup.component';
import { LanguagepopupComponent } from './components/showpopup/languagepopup/languagepopup.component';
import { AdvertisementlistComponent } from './components/advertisement/advertisementlist/advertisementlist.component';
import { UpdatepriceComponent } from './components/updateprice/updateprice.component';
import { UpdatepricepopupComponent } from './components/showpopup/updatepricepopup/updatepricepopup.component';
import { BannerlistComponent } from './components/banner/bannerlist/bannerlist.component';
import { BannerupdateComponent } from './components/banner/bannerupdate/bannerupdate.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AdvertisementdetailpopupComponent } from './components/showpopup/advertisementdetailpopup/advertisementdetailpopup.component';

@NgModule({
  entryComponents:[PopupComponent, LanguagepopupComponent, UpdatepricepopupComponent, AdvertisementdetailpopupComponent],
  declarations: [
    AppComponent,
    StructureComponent,
    NavbarComponent,
    SidemenuComponent,
    LoginComponent,
    DashboardComponent,
    TableViewComponent,
    AddcategoryComponent,
    CategorylistComponent,
    AddlanguageComponent,
    LanguagelistComponent,
    UserlistComponent,
    PopupComponent,
    LanguagepopupComponent,
    AdvertisementlistComponent,
    UpdatepriceComponent,
    UpdatepricepopupComponent,
    BannerlistComponent,
    BannerupdateComponent,
    NotificationsComponent,
    AdvertisementdetailpopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatOptionModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MatNativeDateModule,
    Ng2SearchPipeModule,
    EditorModule,
    GooglePlaceModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule.forRoot(),
    GoogleChartsModule.forRoot(),
  ],
  exports: [
    CdkTableModule,
  ],
  providers: [ApiService, SidemenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
