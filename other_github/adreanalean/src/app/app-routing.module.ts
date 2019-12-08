import { FlexMainComponent } from './flex-main/flex-main.component';
import { AppComponent } from './app.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditTaskComponent } from './edit-task/edit-task.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'new-task', component: NewTaskComponent },
  { path: 'my-app', component: AppComponent },
  { path: 'edit-task/:taskId', component: EditTaskComponent },
  { path: 'my-app/:taskId', component: FlexMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
