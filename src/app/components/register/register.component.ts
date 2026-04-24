import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    this.errorMessage = null;
    // if all the form fields are valid
    if (this.registerForm.valid) {
      try {
        const { email, password, name } = this.registerForm.value;
        const user = await this.authService.register(email, password, name);
        console.log('User registered:', user);
        this.router.navigate(['/login']);
      } catch (e: any) {
        console.error(e);
        if (e.code === 409 || (e.message && e.message.includes('already exists'))) {
          this.errorMessage = 'A user with the same email already exists. Please log in instead.';
        } else {
          this.errorMessage = e.message || 'An error occurred during registration. Please try again.';
        }
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
