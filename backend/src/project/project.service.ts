import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './interfaces/project.interface';
import { ProjectDTO } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
  ) {}

  async getProjects(): Promise<Project[]> {
    const projects = await this.projectModel.find();
    return projects;
  }
  async getProject(projectID: string): Promise<Project> {
    const project = await this.projectModel.findById(projectID);
    return project;
  }
  async createProject(projectDTO: ProjectDTO): Promise<Project> {
    const project = new this.projectModel(projectDTO);
    return await project.save();
  }
  async deleteProject(projectID: string): Promise<Project> {
    return await this.projectModel.findByIdAndDelete(projectID);
  }
  async editProject(
    projectID: string,
    projectDTO: ProjectDTO,
  ): Promise<Project> {
    const udatedProject = await this.projectModel.findByIdAndUpdate(
      projectID,
      projectDTO,
      { new: true },
    );
    return udatedProject;
  }
}
