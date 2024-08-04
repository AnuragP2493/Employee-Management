import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpDataService } from '../../Services/emp-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private empService: EmpDataService, private router: Router) {}

  choseTeam(team): void {
    this.empService.getEmployeesByTeam(team);
  }

  reset() {
    this.empService.initialize();
  }

  addNewEmp() {
    this.router.navigateByUrl('/new-emp');
  }

  backToHome() {
    this.router.navigateByUrl('/');
  }
}
