import { TaskService } from './task.service';
import { WebRequestService } from './web-request.service';
import { FunctionsService } from './functions.service';
import { HeaderComponent } from './header/header.component';
import { FlexLeftComponent } from './flex-left/flex-left.component';
import { FlexCenterComponent } from './flex-center/flex-center.component';
import { FlexRightComponent } from './flex-right/flex-right.component';
import { FlexMainComponent } from './flex-main/flex-main.component';
import { NewTaskComponent } from './new-task/new-task.component';
// ***** Oriģinālie *****
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FlexLeftComponent,
    FlexCenterComponent,
    FlexRightComponent,
    FlexMainComponent,
    NewTaskComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    FunctionsService, WebRequestService, TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
