import { Routes } from '@angular/router';
import { EmpDetailComponent } from '../Components/emp-detail/emp-detail.component';
import { MainLayoutComponent } from '../Components/main-layout/main-layout.component';
import { NewEmployeeComponent } from '../Components/new-employee/new-employee.component';

export const routes: Routes = [
  {
    path: 'emp/:empoyeeId',
    component: EmpDetailComponent,
  },
  {
    path: 'new-emp',
    component: NewEmployeeComponent,
  },
  { path: 'edit-employee/:id', 
    component: NewEmployeeComponent 
  },
  {
    path: '',
    component: MainLayoutComponent,
    pathMatch:'full'
  },
];
