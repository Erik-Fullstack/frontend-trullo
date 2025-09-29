import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonGroup } from './button-group/button-group';
import { InputFields } from './input-fields/input-fields';
import { RenderedWindow } from "./rendered-window/rendered-window";
import { MethodType, User, Task } from './types';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonGroup, InputFields, RenderedWindow, MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  method = signal<MethodType>(0);
  singleUser = signal<User | Task | null>(null);
  multipleUsers = signal<User[] | Task[] | null>(null);
  populate = signal<string>("false");

  email = "";
  password = "";

  async login() {
    console.log(this.email, this.password)
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });
      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const token = await response.json();
      localStorage.setItem("token", token.token)
      console.log('Token:', token);

    } catch (error) {
      console.error('Error getting token/logging in:', error)
    }
  }

  onChange() {
    this.populate.set((this.populate() == "false" ? "true" : "false"));
  }
  setMethod(signal: MethodType) {
    this.method.set(signal)
  }
  setSingleUser(newUser: User | Task) {
    this.multipleUsers.set(null)
    this.singleUser.set(newUser)
  }
  setMultipleUsers(newUsers: User[] | Task[]) {
    this.singleUser.set(null)
    this.multipleUsers.set(newUsers)
  }
  setAllToNull() {
    this.method.set(0);
    this.singleUser.set(null);
    this.multipleUsers.set(null);
  }
}
