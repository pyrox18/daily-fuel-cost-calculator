import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SimpleComponent } from './components/simple/simple.component';
import { StandardComponent } from './components/standard/standard.component';
import { AdvancedComponent } from './components/advanced/advanced.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/standard',
    pathMatch: 'full'
  },
  {
    path: 'simple',
    component: SimpleComponent
  },
  {
    path: 'standard',
    component: StandardComponent
  },
  {
    path: 'advanced',
    component: AdvancedComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {};