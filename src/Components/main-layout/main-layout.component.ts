import { Component, inject, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EmpDataService } from '../../Services/emp-data.service';
import Employee from '../../empInterface';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SideNavComponent,NgbModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {

  empList:Employee[]

  constructor(private router: Router, private empService:EmpDataService) {

  }

  ngOnInit(): void {
    this.empService.filteredEmployeeList$.subscribe((data:Employee[]) => {
      this.empList = data
    })
    }

  goToDetail(id:any){
    this.router.navigateByUrl('/emp/'+id)
  }

}
