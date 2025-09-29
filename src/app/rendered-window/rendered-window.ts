import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { User, Task } from '../types';

@Component({
  selector: 'app-rendered-window',
  imports: [DatePipe],
  templateUrl: './rendered-window.html',
  styleUrl: './rendered-window.css'
})
export class RenderedWindow {
  @Input() singleUser: User | Task | null = null;
  @Input() multipleUsers: User[] | Task[] | null = null;
}
