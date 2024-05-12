import { Component, Input } from '@angular/core';
import { GroupItem } from './group.interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list-component.scss'
})
export class GroupListComponent {
  @Input() data: GroupItem[] = [];
}
