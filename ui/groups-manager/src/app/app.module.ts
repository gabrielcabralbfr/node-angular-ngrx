import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './_state/reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddHeaderInterceptor } from './_interceptor/interceptor';
import { HomeComponent } from './_components/home/home.component';
import { FilterGroupsPipe } from './_pipes/groups/filter-groups.pipe';
import { FilterByKeyWordPipe } from './_pipes/filterByKeyword/filter-by-key-word.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FilterGroupsPipe,
    FilterByKeyWordPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ newAppState: reducer }),
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
