import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/Login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  user: Login = {
    name: '',
    username: '',
    password: ''
  }

  dataSave(username: string){
    sessionStorage.setItem('username', username);
  }

  submitLogin() {
    this.loginService.Login(this.user)
      .subscribe(
        res => {
          console.log(res);
          if (res.isUser) {
            this.dataSave(res.user.username);
            this.router.navigate(['/project']).then(() => window.location.reload());
          }
        },
        err => console.log(err)
      )
  }
}
