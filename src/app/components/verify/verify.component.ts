import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs/operators';
import { AppConfig } from 'src/app/app.config';
import { ResetPasswordProvider } from 'src/app/infrastructure/api/reset-password.provider';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private resetPasswordProvider: ResetPasswordProvider, 
    private notifier: NotifierService) { }
  token: string;
  resetPasswordForm: FormGroup;

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    AppConfig.onInicialization.subscribe(()=> {
      this.resetPasswordProvider.validarResetToken(this.token).subscribe(rpta => {
        if (rpta.status != "success") {
          this.notifier.notify(rpta.status == "fail" ? "warning": "error", rpta.message);
          this.router.navigate(['login']);
        }
      });
    });
    
    console.log(this.token);
    this.resetPasswordForm = new FormGroup({
      'passwordNuevo': new FormControl('', Validators.required),
      'passwordNuevo2': new FormControl('', [Validators.required, this.passwordIgualesValidator.bind(this)]),
    });
  }

  passwordIgualesValidator({ value }: AbstractControl): ValidationErrors | null {
    if (this.resetPasswordForm) {
      if (value !== this.resetPasswordForm.value.passwordNuevo) {
        return {
          noIguales: true
        }
      }
    }
    return null;
  }

  onSubmit(value): void {
    this.resetPasswordProvider.resetPassword(this.token, value.passwordNuevo).pipe(take(1)).subscribe(rpta => {
      if (rpta.status == 'success') {
        this.notifier.notify("success", "Se ha actualizado su contraseña correctamente. Pruebe iniciando sesión");
      }else{
        this.notifier.notify(rpta.status == "fail" ? "warning": "error", rpta.message);          
      }
      this.router.navigate(['login']);
    })
  }

}
