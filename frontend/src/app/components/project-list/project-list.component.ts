import { Component, OnInit } from '@angular/core';

import { Project } from 'src/app/interfaces/Project';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  username = '';

  constructor(private projectService: ProjectService) { }

  projects: Project[] = [];

  ngOnInit() {
    this.username = sessionStorage.getItem('username') || '';
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(
        res => this.projects = res,
        err => console.log(err)
      )
  }

  deleteProject(id: string): void {
    this.projectService.deleteProject(id)
      .subscribe(
        res => {
          console.log(res);
          this.getProjects();
        },
        err => console.log(err)
      )
  }
}
