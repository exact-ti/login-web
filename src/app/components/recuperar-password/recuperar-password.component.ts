import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ResetPasswordProvider } from 'src/app/infrastructure/api/reset-password.provider';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  constructor(
    public resetPasswordProvider: ResetPasswordProvider, 
    public notifier: NotifierService,
  ) { }

  resetPasswordForm: FormGroup;
  solicitudEnviada = false;

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      'correo': new FormControl('', Validators.required),
    });
  }

  onSubmit(value): void{
    this.solicitudEnviada = true;
    this.resetPasswordProvider.solicitarResetPassword(value.correo).subscribe(rpta => {
      console.log(rpta);
    })
  }

}
