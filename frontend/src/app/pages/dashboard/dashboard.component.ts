import { Component, OnInit } from '@angular/core';
import { GroupListService } from './group-list/group-list.service';
import { GroupItem } from './group-list/group.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  groupItems: GroupItem[] = [];
  constructor(private groupListService: GroupListService) {}

  ngOnInit() {
    this.groupListService.getAll().subscribe((data) => (this.groupItems = data));
  }
}
