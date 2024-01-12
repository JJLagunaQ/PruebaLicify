import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormProject } from 'src/app/interfaces/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
  params = this.activatedRoute.snapshot.params;
  base64textString: String="";
  project: FormProject = {
    nombre: '',
    fechaInicio: new Date(),
    fechaFinal: new Date(),
    imagenes: [''],
    items: '',
    valorUnitario:0
  };
  edit: boolean = false;

  constructor(
    private projectService: ProjectService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.router.url)
    // const params = this.activatedRoute.snapshot.params;
    if (this.params['id']) {
      this.projectService.getProject(this.params['id'])
        .subscribe(
          res => {
            console.log(res);
            const fechaInicialAsDate = new Date(res.fechaInicio);
            const fechaFinalAsDate = new Date(res.fechaFinal);
            let tempItems = '';
            console.log(this.project.items)
            res.items.forEach((item) => tempItems += item + ',')
            console.log(tempItems)
            this.project = ({...res, fechaInicio: fechaInicialAsDate, fechaFinal: fechaFinalAsDate, items: tempItems});
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  handleFileSelect(evt: any){
      var files = evt.target.files;
      var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
      var binaryString = readerEvt.target.result;
      this.base64textString= `data:image/${this.getImageFileType(btoa(binaryString).charAt(0))};base64,` + btoa(binaryString);
      // console.log(this.getImageFileType(btoa(binaryString).charAt(0)))
      // console.log(btoa(binaryString).charAt(0))
      // this.project.imagenes = [...this.project.imagenes, encodedImage];
      // console.log(this.base64textString === btoa(binaryString));
      // console.log('btoa',btoa(binaryString));
    }

  getImageFileType(firstCharacter: string) {
    if (firstCharacter === '/') return 'jpg';
    else if (firstCharacter === 'i') return 'png';
    else if (firstCharacter === 'R') return 'gif';
    else return 'webp';
  }

  submitProject() {
    const tempProject = this.project
    // delete tempProject._id;
    const fechaInicialAsString = new Date(this.project.fechaInicio).toISOString().split('T')[0];
    const fechaFinalAsString = new Date(this.project.fechaFinal).toISOString().split('T')[0];
    console.log({...this.project, fechaInicio: fechaInicialAsString, fechaFinal: fechaFinalAsString, imagenes: this.project.imagenes.length <= 1 ? [this.base64textString] : [...this.project.imagenes, this.base64textString]})
    this.projectService.createProject({...this.project, fechaInicio: fechaInicialAsString, fechaFinal: fechaFinalAsString, imagenes: this.project.imagenes.length <= 1 ? [this.base64textString] : [...this.project.imagenes, this.base64textString]})
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/project']);
        },
        err => console.log(err)
      )
  }

  updateProject() {
    const newFechaInicial = new Date(this.project.fechaInicio).toISOString().split('T')[0];
    const newFechaFinal = new Date(this.project.fechaFinal).toISOString().split('T')[0];
    const newItemList: Array<string> = []
    this.project.items.split(',').forEach(item => newItemList.push(item));
    if (this.params['id']){
      this.projectService.updateProject(this.params['id'], {_id: this.params['id'], ...this.project, nombre: this.project.nombre, fechaInicio: newFechaInicial, fechaFinal: newFechaFinal, imagenes: this.project.imagenes.length <= 1 ? [this.base64textString] : [...this.project.imagenes, this.base64textString], items: newItemList})
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/project'])
          },
          err => console.log(err)
        )
    }
  }
}
