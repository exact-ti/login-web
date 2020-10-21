import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginUseCase } from 'src/app/application/usecases/login.usecase';
import { LoginProvider } from 'src/app/infrastructure/api/login.provider';
import { UserDetails } from 'src/app/core/model/userdetails.model';
import { Router, UrlSerializer } from '@angular/router';
import { AppConfig } from 'src/app/app.config';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginUseCase: LoginUseCase;
  mostrarRecuperacion = true;

  constructor(private loginProvider: LoginProvider, private router: Router, private serializer: UrlSerializer, 
    private notifier: NotifierService) {
     
  }

  ngOnInit(): void {
    
    this.loginForm = new FormGroup({
      'usuario': new FormControl('', Validators.required), 
      'password': new FormControl('', Validators.required)
    });
    setTimeout(()=>{
      this.mostrarRecuperacion = !AppConfig.LDAP
    }, 100);
  }

  login(value: any) {
    if(value.usuario=="" || value.password==""){
      this.notifier.notify("warning", "Ingrese todos los datos solicitados");
    }else{
      this.loginProvider.login(value.usuario.trim(), value.password.trim()).subscribe((userDetails: UserDetails) => {
        const queryParams = {
          token: userDetails.getToken(),
          refresh_token: userDetails.getRefreshToken()
        }
        const tree = this.router.createUrlTree([], {queryParams});
        const params = this.serializer.serialize(tree).split('?')[1];
        value.usuario = '';
        value.password = '';
        window.location.href = AppConfig.REDIRECT_URL + '?' +  params;
  
      }, error => {
        console.log(error);
        this.notifier.notify("error", error.message);
      });
    }
  }

}
