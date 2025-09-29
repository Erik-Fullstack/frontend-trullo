import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MethodType, User, Task, UserUpdateInput, CreateTaskInput, CreateUserInput, TaskUpdateInput, ApiResponse, Status, AssignTaskInput } from '../types';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-fields',
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule, MatButtonModule],
  templateUrl: './input-fields.html',
  styleUrl: './input-fields.css'
})
export class InputFields {
  @Input() method: MethodType = MethodType.None;
  @Output() userChange = new EventEmitter<User | Task>();
  @Input() populate: string = "false"

  // Form fields
  name = "";
  email = "";
  password = "";
  id = "";
  title = "";
  description = "";
  assignedTo = "";
  status = Status.TODO;
  userId = "";
  taskId = "";

  // Enum references for templates
  Status = Status;
  statusOptions = Object.values(Status);
  async onCreateUser() {
    if (!this.name || !this.email || !this.password) {
      alert(`Please fill all fields when creating a user.`);
      return;
    }

    const userData: CreateUserInput = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    try {
      const response = await fetch("http://localhost:3000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<User> = await response.json();
      console.log('User created:', result.data);
      alert('User created successfully!');

    } catch (error) {
      console.error('Error creating user:', error)
      alert('Error creating user: ' + (error as any)?.message || 'Unknown error');
    }
    this.resetForm();
  }
  async onCreateTask() {
    if (!this.title || !this.description) {
      alert(`Please fill title and description fields when creating a task.`);
      return;
    }

    const taskData: CreateTaskInput = {
      title: this.title,
      description: this.description,
      status: this.status
    };

    if (this.assignedTo) {
      taskData.assignedTo = Number(this.assignedTo);
    }

    try {
      const response = await fetch("http://localhost:3000/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<Task> = await response.json();
      console.log('Task created:', result.data);
      alert('Task created successfully!');

    } catch (error) {
      console.error('Error creating task:', error)
      alert('Error creating task: ' + (error as any)?.message || 'Unknown error');
    }
    this.resetForm();
  }
  async onGetUser() {
    if (!this.id) {
      alert('Please enter a user ID');
      return;
    }
    const query = this.populate === "false" ? "" : "?tasks=true"
    try {
      const response = await fetch(`http://localhost:3000/users/${this.id}${query}`);
      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<User> = await response.json();
      this.userChange.emit(result.data);
      console.log('User fetched:', result.data);

    } catch (error) {
      console.error('Error fetching user:', error)
      alert('Error fetching user: ' + (error as any)?.message || 'User not found');
    }
    this.resetForm();
  }

  async onGetTask() {
    if (!this.id) {
      alert('Please enter a task ID');
      return;
    }
    const query = this.populate === "false" ? "" : "?users=true"
    try {
      const response = await fetch(`http://localhost:3000/tasks/${this.id}${query}`);
      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<Task> = await response.json();
      this.userChange.emit(result.data);
      console.log('Task fetched:', result.data);

    } catch (error) {
      console.error('Error fetching task:', error)
      alert('Error fetching task: ' + (error as any)?.message || 'Task not found');
    }
    this.resetForm();
  }

  async onUpdateUser() {
    if (!this.id) {
      alert('Please enter a user ID');
      return;
    }

    const updateData: UserUpdateInput = {};
    if (this.name) updateData.name = this.name;
    if (this.email) updateData.email = this.email;
    if (this.password) updateData.password = this.password;

    if (Object.keys(updateData).length === 0) {
      alert('Please fill at least one field to update');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${this.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<User> = await response.json();
      console.log('User updated:', result.data);
      alert('User updated successfully!');

    } catch (error) {
      console.error('Error updating user:', error)
      alert('Error updating user: ' + (error as any)?.message || 'Unknown error');
    }
    this.resetForm();
  }

  async onUpdateTask() {
    if (!this.id) {
      alert('Please enter a task ID');
      return;
    }

    const updateData: TaskUpdateInput = {};
    if (this.title) updateData.title = this.title;
    if (this.description) updateData.description = this.description;
    if (this.assignedTo) updateData.assignedTo = Number(this.assignedTo);
    if (this.status) updateData.status = this.status;

    if (Object.keys(updateData).length === 0) {
      alert('Please fill at least one field to update');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/tasks/${this.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<Task> = await response.json();
      console.log('Task updated:', result.data);
      alert('Task updated successfully!');

    } catch (error) {
      console.error('Error updating task:', error)
      alert('Error updating task: ' + (error as any)?.message || 'Unknown error');
    }
    this.resetForm();
  }

  async onDeleteUser() {
    if (!this.id) {
      alert(`Please enter a user ID to delete.`);
      return;
    }

    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${this.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<User> = await response.json();
      console.log('User deleted:', result.data);
      alert('User deleted successfully!');

    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Error deleting user: ' + (error as any)?.message || 'Unknown error');
    }
    this.resetForm();
  }

  async onDeleteTask() {
    if (!this.id) {
      alert(`Please enter a task ID to delete.`);
      return;
    }

    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/tasks/${this.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<Task> = await response.json();
      console.log('Task deleted:', result.data);
      alert('Task deleted successfully!');

    } catch (error) {
      console.error('Error deleting task:', error)
      alert('Error deleting task: ' + (error as any)?.message || 'Unknown error');
    }
    this.resetForm();
  }

  async onAssignTask() {
    if (!this.taskId || !this.userId) {
      alert('Please enter both task ID and user ID');
      return;
    }

    const assignData: AssignTaskInput = {
      userId: Number(this.userId)
    };

    try {
      const response = await fetch(`http://localhost:3000/tasks/assign/${this.taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(assignData)
      });
      if (!response.ok) {
        const error = await response.json()
        throw error
      }

      const result: ApiResponse<Task> = await response.json();
      console.log('Task assigned:', result.data);
      alert('Task assigned successfully!');

    } catch (error) {
      console.error('Error assigning task:', error)
      alert('Error assigning task: ' + (error as any)?.message || 'Unknown error');
    }
    this.resetForm();
  }

  resetForm() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.id = "";
    this.title = "";
    this.description = "";
    this.assignedTo = "";
    this.status = Status.TODO;
    this.userId = "";
    this.taskId = "";
  }
}
