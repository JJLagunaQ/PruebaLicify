import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Project, FormProject } from '../interfaces/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.BASE_URL}/project`);
  }

  getProject(id: string): Observable<Project>{
    return this.http.get<Project>(`${this.BASE_URL}/project/${id}`);
  }

  createProject(project: FormProject): Observable<FormProject> {
    return this.http.post<FormProject>(`${this.BASE_URL}/project`, project);
  }

  deleteProject(id: string): Observable<Project> {
    console.log(id);
    return this.http.delete<Project>(`${this.BASE_URL}/project/${id}`);
  }

  updateProject(id: string, project: Project): Observable<Project> {
    return this.http.patch<Project>(`${this.BASE_URL}/project/${id}`, project);
  }

}
