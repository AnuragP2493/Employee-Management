import { Component, OnInit } from '@angular/core';
import Employee from '../../empInterface';
import { EmpDataService } from '../../Services/emp-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-emp-detail',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './emp-detail.component.html',
  styleUrl: './emp-detail.component.scss'
})
export class EmpDetailComponent implements OnInit{

  selectedEmployee:Employee | null;

constructor(private empService:EmpDataService,
   private activatedRoute: ActivatedRoute,
  private router:Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(params => {
        const id = params['empoyeeId']; 
        if (id) {
          return this.empService.getEmployeeById(id);
        }
         else {
          return of(null); 
        }
      })
    ).subscribe(employee => {
      this.selectedEmployee = employee;
    });
  }

  goBack(){
    this.router.navigateByUrl('/')
  }

  goToEdit(){
    this.router.navigateByUrl('/edit-employee/' + this.selectedEmployee.employeeId)
  }

  deleteEmployee(){
    this.empService.deleteEmployee(this.selectedEmployee.employeeId)
    this.router.navigateByUrl('/')
  }

}
