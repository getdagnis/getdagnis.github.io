import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FlexLeftComponent } from './flex-left/flex-left.component';
import { FlexCenterComponent } from './flex-center/flex-center.component';
import { FlexRightComponent } from './flex-right/flex-right.component';
import { FlexMainComponent } from './flex-main/flex-main.component';
import { NewTaskComponent } from './new-task/new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlexLeftComponent,
    FlexCenterComponent,
    FlexRightComponent,
    FlexMainComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
