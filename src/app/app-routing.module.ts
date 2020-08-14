import { NgModule } from '@angular/core';
import { JobsViewComponent } from 'src/app/jobs/jobs-view/jobs-view.component';
import { Routes, RouterModule } from '@angular/router';
import { JobCreateComponent } from './jobs/job-create/job-create.component';
import { CardComponent } from './card/card.component';
import { ShowMoreComponent } from 'src/app/jobs/show-more/show-more.component';
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: 'card',
    component: CardComponent,
  },
  { path: '', component: JobsViewComponent },
  {
    path: 'create',
    component: JobCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'showMore/:jobId',
    component: ShowMoreComponent,
  }
  , {
    path: 'edit/:postId', component: JobCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "signup", component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
