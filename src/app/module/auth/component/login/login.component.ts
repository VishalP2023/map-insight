import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showPassword:boolean=false;
  invalidUser!: boolean;
  loginForm!: FormGroup;
  constructor(private loginService:LoginService,
    private router: Router,
    private formBuilder: FormBuilder) { }
 
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  }
 
  login() {
    this.loginService.login(this.loginForm.value).subscribe((response:any)=>{
      sessionStorage.setItem('username', response.username);      
      sessionStorage.setItem('access_token', response.token);
      sessionStorage.setItem('userRoles', response.role);
      this.router.navigate(['/map']);
    })
  }

  changePassword(flag:boolean){
    this.showPassword=flag;
  }
}
