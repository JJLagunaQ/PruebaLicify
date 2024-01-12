import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProjectDTO } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  @Get('')
  async getPosts(@Res() res) {
    try {
      const projects = await this.projectService.getProjects();
      return res.status(HttpStatus.OK).json(projects);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error Getting All Projects',
        error,
      });
    }
  }
  @Get('/:projectID')
  async getPost(@Res() res, @Param('projectID') projectID) {
    try {
      const project = await this.projectService.getProject(projectID);
      if (!project) throw new NotFoundException('Project not found');
      return res.status(HttpStatus.OK).json(project);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error Getting Project',
        error,
      });
    }
  }
  @Post('')
  async createPost(@Res() res, @Body() body: ProjectDTO) {
    try {
      const project = await this.projectService.createProject(body);
      return res.status(HttpStatus.OK).json({
        message: 'Product created successfully',
        project,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_IMPLEMENTED).json({
        message: 'Error Creating Project',
        error,
      });
    }
  }
  @Patch(':projectID')
  async updatePost(
    @Res() res,
    @Param('projectID') projectID: string,
    @Body() body: ProjectDTO,
  ) {
    try {
      const project = await this.projectService.getProject(projectID);
      if (!project) throw new NotFoundException('Project not found');
      const editedProject = await this.projectService.editProject(
        projectID,
        body,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Project Updated successfully',
        oldVersion: project,
        newVersion: editedProject,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error Editing Project',
      });
    }
  }
  @Delete('/:projectID')
  async deletePost(@Res() res, @Param('projectID') projectID) {
    try {
      const project = await this.projectService.deleteProject(projectID);
      if (!project) throw new NotFoundException('Project not found');
      return res.status(HttpStatus.OK).json({
        message: 'Project Deleted successfully',
        project,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error Deleting Project',
        error,
      });
    }
  }
}
