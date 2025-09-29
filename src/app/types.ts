

export enum MethodType {
    None = 0,
    CreateUser = "createUser",
    ReadUser = "getUser",
    ReadManyUsers = "getAllUsers",
    UpdateUser = "updateUser",
    DeleteUser = "deleteUser",
    CreateTask = "createTask",
    ReadTask = "getTask",
    ReadManyTasks = "getAllTasks",
    UpdateTask = "updateTask",
    DeleteTask = "deleteTask",
    AssignTask = "assignTask",
    GetAssignedTasks = "getAssignedTasks"
}

export enum Status {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    BLOCKED = "BLOCKED"
}

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export type User = {
    id: number,
    name: string,
    email: string,
    password?: string,
    role: Role,
    tasks?: Task[]
}
export type Task = {
    id: number,
    createdAt: Date,
    updatedAt: Date,
    finishedAt?: Date | null,
    title: string,
    description: string,
    status: Status,
    assignedTo?: number | null,
    user?: User | null
}
export type CreateUserInput = {
    name: string,
    email: string,
    password: string
}

export type CreateTaskInput = {
    title: string,
    description: string,
    assignedTo?: number,
    status?: Status
}

export type UserUpdateInput = {
    name?: string,
    email?: string,
    password?: string
}

export type TaskUpdateInput = {
    title?: string,
    description?: string,
    assignedTo?: number,
    status?: Status
}

export type ApiResponse<T> = {
    data: T
}

export type AssignTaskInput = {
    userId: number
}