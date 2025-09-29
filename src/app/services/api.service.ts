import { Injectable } from '@angular/core';
import {
    User,
    Task,
    CreateUserInput,
    CreateTaskInput,
    UserUpdateInput,
    TaskUpdateInput,
    AssignTaskInput,
    ApiResponse
} from '../types';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:3000';

    // User API calls
    async createUser(userData: CreateUserInput): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<User> = await response.json();
        return result.data;
    }

    async getUser(id: number, includeTasks: boolean = false): Promise<User> {
        const query = includeTasks ? '?tasks=true' : '';
        const response = await fetch(`${this.baseUrl}/users/${id}${query}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<User> = await response.json();
        return result.data;
    }

    async getAllUsers(includeTasks: boolean = false): Promise<User[]> {
        const query = includeTasks ? '?tasks=true' : '';
        const response = await fetch(`${this.baseUrl}/users${query}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<User[]> = await response.json();
        return result.data;
    }

    async updateUser(id: number, userData: UserUpdateInput): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<User> = await response.json();
        return result.data;
    }

    async deleteUser(id: number): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<User> = await response.json();
        return result.data;
    }

    // Task API calls
    async createTask(taskData: CreateTaskInput): Promise<Task> {
        const response = await fetch(`${this.baseUrl}/tasks/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<Task> = await response.json();
        return result.data;
    }

    async getTask(id: number, includeUsers: boolean = false): Promise<Task> {
        const query = includeUsers ? '?users=true' : '';
        const response = await fetch(`${this.baseUrl}/tasks/${id}${query}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<Task> = await response.json();
        return result.data;
    }

    async getAllTasks(includeUsers: boolean = false): Promise<Task[]> {
        const query = includeUsers ? '?users=true' : '';
        const response = await fetch(`${this.baseUrl}/tasks${query}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<Task[]> = await response.json();
        return result.data;
    }

    async getAssignedTasks(includeUsers: boolean = false): Promise<Task[]> {
        const query = includeUsers ? '?users=true' : '';
        const response = await fetch(`${this.baseUrl}/tasks/assignedTasks${query}`);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<Task[]> = await response.json();
        return result.data;
    }

    async updateTask(id: number, taskData: TaskUpdateInput): Promise<Task> {
        const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<Task> = await response.json();
        return result.data;
    }

    async deleteTask(id: number): Promise<Task> {
        const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<Task> = await response.json();
        return result.data;
    }

    async assignTask(taskId: number, assignData: AssignTaskInput): Promise<Task> {
        const response = await fetch(`${this.baseUrl}/tasks/assign/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(assignData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<Task> = await response.json();
        return result.data;
    }
}