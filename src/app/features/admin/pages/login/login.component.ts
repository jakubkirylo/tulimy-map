import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, EMPTY, finalize } from 'rxjs';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../infrastructure/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    PasswordModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  public loginForm!: FormGroup;
  public busy = signal(false);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    this.busy.set(true);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService
        .authorizeUser(username, password)
        .pipe(
          catchError((err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Błąd logowania',
              detail: 'Nieprawidłowa nazwa użytkownika lub hasło',
            });
            return EMPTY;
          }),
          finalize(() => {
            this.busy.set(false);
          })
        )
        .subscribe(() => this.router.navigate(['/']));
    }
  }
}
