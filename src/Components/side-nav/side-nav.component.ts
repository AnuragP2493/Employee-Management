import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpDataService } from '../../Services/emp-data.service';
import { FormBuilder ,FormGroup,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule,NgbDropdownModule,ReactiveFormsModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  activeSubMenu: string | null = null;

  filterForm
  allEmployees
  empList

  constructor(private empService:EmpDataService, private fb:FormBuilder) {}

  toggleSubMenu(subMenuId: string, event: MouseEvent): void {
    event.preventDefault();
    this.activeSubMenu = this.activeSubMenu === subMenuId ? null : subMenuId;
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      designation: [''],
      image: [''],
      rating: [''],
      experience: [''],
      dateOfJoining: [''],
      currentTeam: [''],
      reportingManager: [''],

    });

    this.empService.employeeList$.subscribe(employees => {
      this.allEmployees = employees;
    });

    this.empService.filteredEmployeeList$.subscribe((data) => {
      this.empList = data;
    });
  }

  removeEmptyStrings(obj) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (value !== "" && value !== null) {
            result[key] = value;
        }
    }
    return result;
}

  onSubmit(e){
    e.preventDefault()
    const modified = this.removeEmptyStrings(this.filterForm.value)
    const allValuesAreNull = Object.values(modified).every(value => value === null);
    if(!allValuesAreNull){
      this.empService.getFilteredEmployees(modified)
    }
  }

  clear(e){
    e.preventDefault()
    this.filterForm.reset();
    this.empService.initialize()
    
  }

  getUniqueDepartments(): number[] | any[] {
    const ratings = this.allEmployees.map(emp => emp.designation);
    return Array.from(new Set(ratings)).sort();
  }

  getUniqueRatings(): number[] | any[] {
    const ratings = this.allEmployees.map(emp => emp.rating);
    return Array.from(new Set(ratings)).sort();
  }
  
  getUniqueExperiences(): number[] | any[] {
    const experiences = this.allEmployees.map(emp => emp.experience);
    return Array.from(new Set(experiences)).sort();
  }
  
  getUniqueTeams(): string[] | any[] {
    const teams = this.allEmployees.map(emp => emp.currentTeam);
    return Array.from(new Set(teams)).sort();
  }
  
  getUniqueManagers(): string[] | any[] {
    const managers = this.allEmployees.map(emp => emp.reportingManager);
    return Array.from(new Set(managers)).sort();
  }

}
