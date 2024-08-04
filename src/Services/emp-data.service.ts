import { Injectable } from '@angular/core';
import empList from '../EmpData';
import Employee from '../empInterface';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmpDataService {

  constructor(private route:Router){
  }
  selectedEmployee: Employee;

  employeeList: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(
    empList
  );

  employeeList$ = this.employeeList.asObservable();

  filteredEmployeeList: BehaviorSubject<Employee[]> = new BehaviorSubject<
    Employee[]
  >(empList);

  filteredEmployeeList$ = this.filteredEmployeeList.asObservable();

  getEmployeeById(employeeId: string): Observable<Employee | undefined> {
    return this.employeeList$.pipe(
      map((employees) => employees.find((emp) => emp.employeeId === employeeId))
    );
  }

  initialize() {
    this.filteredEmployeeList.next(empList);
  }

  getEmployeesByTeam(teamName: string) {
    this.employeeList$
      .pipe(
        map((employees) =>
          employees.filter((emp) => emp.currentTeam === teamName)
        )
      )
      .subscribe((filteredEmployees: Employee[]) => {
        this.filteredEmployeeList.next(filteredEmployees);
      });
  }

  filterEmployees(employees: Employee[], criteria: Partial<Employee>): Employee[] {
    return employees.filter(employee => {
      return Object.keys(criteria).every(key => {
        // @ts-ignore: Ignore type checking on key
        return employee[key] == criteria[key];
      });
    });
  }

  getFilteredEmployees(criteria: Partial<Employee>) {
    this.employeeList$.pipe(
      map(employees => this.filterEmployees(employees, criteria))
    ).subscribe(filteredEmployees => {
      this.filteredEmployeeList.next(filteredEmployees);
    });
  }

  addEmployee(newEmp){
    this.employeeList.next([...empList,newEmp])
      this.filteredEmployeeList.next([...empList,newEmp])
      this.route.navigateByUrl('/')
  }

  updateEmployee(empId ,UpdatedEmployee){
    this.employeeList$.pipe(
      map(employees => 
        employees.map(employee =>
          employee.employeeId === empId ? UpdatedEmployee : employee
        )
      )
    ).subscribe(updatedEmployees => this.filteredEmployeeList.next(updatedEmployees));
    this.route.navigateByUrl('/')
  }

  deleteEmployee(id: string): void {
    this.employeeList$.pipe(
      map(employees => 
        employees.filter(employee => employee.employeeId != id)
      )
    ).subscribe(updatedEmployees => this.filteredEmployeeList.next(updatedEmployees));
  }
  
  
}
