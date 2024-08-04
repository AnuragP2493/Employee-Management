import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule , FormGroup, Validators } from '@angular/forms';
import Employee from '../../empInterface';
import { EmpDataService } from '../../Services/emp-data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss'
})
export class NewEmployeeComponent implements OnInit{

  constructor(private fb:FormBuilder, private empService:EmpDataService , private route: ActivatedRoute,){}

  addEmployeeForm
  employeeId
  isEditMode = false
  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      employeeId: ['', Validators.required],
      name: ['', Validators.required],
      designation: [''],
      image: [''],
      rating: ['', Validators.min(1)],  
      experience: ['', Validators.min(0)],  
      dateOfJoining: ['', Validators.required],
      currentTeam: [''],
      reportingManager: [''],
      phoneNumber: [''],
      emailAddress: ['', [Validators.required, Validators.email]]
    });

    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id');
      if (this.employeeId) {
        this.isEditMode = true;
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadEmployee(id: string) {
    this.empService.getEmployeeById(id).subscribe(employee => {
      this.addEmployeeForm.patchValue(employee);
    });
  }

  onSubmit() {
    if (this.addEmployeeForm.valid) {
      const employee: Employee = this.addEmployeeForm.value;
      if (this.isEditMode && this.employeeId) {
        this.empService.updateEmployee(this.employeeId, employee)
      } else {
        this.empService.addEmployee(employee)
      }
    }
  }

}
