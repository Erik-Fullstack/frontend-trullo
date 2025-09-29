import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatButtonModule } from "@angular/material/button"
import { MatMenuModule } from "@angular/material/menu"
import { MethodType, User, Task, ApiResponse } from '../types';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-button-group',
  imports: [MatButtonModule, MatMenuModule, FormsModule],
  templateUrl: './button-group.html',
  styleUrl: './button-group.css'
})
export class ButtonGroup {
  @Output() userArr = new EventEmitter<User[] | Task[]>();
  @Output() apiOption = new EventEmitter<MethodType>();
  @Input() populate: string = "false"
  // User operations
  onCreateUserClick() {
    this.apiOption.emit(MethodType.CreateUser);
  }
  onGetUserClick() {
    this.apiOption.emit(MethodType.ReadUser);
  }
  onUpdateUserClick() {
    this.apiOption.emit(MethodType.UpdateUser);
  }
  onDeleteUserClick() {
    this.apiOption.emit(MethodType.DeleteUser);
  }

  // Task operations  
  onCreateTaskClick() {
    this.apiOption.emit(MethodType.CreateTask);
  }
  onGetTaskClick() {
    this.apiOption.emit(MethodType.ReadTask);
  }
  onUpdateTaskClick() {
    this.apiOption.emit(MethodType.UpdateTask);
  }
  onDeleteTaskClick() {
    this.apiOption.emit(MethodType.DeleteTask);
  }
  onAssignTaskClick() {
    this.apiOption.emit(MethodType.AssignTask);
  }
  async onGetAllUsersClick() {
    this.apiOption.emit(MethodType.ReadManyUsers);
    const query = this.populate === "false" ? "" : "?tasks=true"
    try {
      const response = await fetch(`http://localhost:3000/users${query}`);
      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<User[]> = await response.json();
      this.userArr.emit(result.data)
      console.log('Users:', result.data);

    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  async onGetAllTasksClick() {
    this.apiOption.emit(MethodType.ReadManyTasks);
    const query = this.populate === "false" ? "" : "?users=true"
    try {
      const response = await fetch(`http://localhost:3000/tasks${query}`);
      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<Task[]> = await response.json();
      this.userArr.emit(result.data)
      console.log('Tasks:', result.data);

    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  async onGetAssignedTasksClick() {
    this.apiOption.emit(MethodType.GetAssignedTasks);
    const query = this.populate === "false" ? "" : "?users=true"
    try {
      const response = await fetch(`http://localhost:3000/tasks/assignedTasks${query}`);
      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<Task[]> = await response.json();
      this.userArr.emit(result.data)
      console.log('Assigned tasks:', result.data);

    } catch (error) {
      console.error('Error fetching assigned tasks:', error)
    }
  }
}
