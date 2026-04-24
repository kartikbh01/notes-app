import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.loginForm.valid) {
      this.isLoading = true;
      try {
        const { email, password } = this.loginForm.value;
        const result = await this.authService.login(email, password);
        console.log('Login successful:', result);
        this.router.navigate(['/']);
      } catch (e: any) {
        console.error(e);
        if (e.code === 401 || (e.message && e.message.includes('Invalid credentials'))) {
          this.errorMessage = 'Invalid credentials. Please check the email and password.';
        } else {
          this.errorMessage = e.message || 'An error occurred during login. Please try again.';
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
