import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {BackendService} from "../../services/backend.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {TransferService} from "../../services/transfer.service";
import {GroupTasks} from "../../models/group-tasks.model";
import {GroupsModificationComponent} from "../groups-modification/groups-modification.component";
import {ConfirmationDialog} from '../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-groups-dashboard',
  templateUrl: './groups-dashboard.component.html',
  styleUrls: ['./groups-dashboard.component.css']
})
export class GroupsDashboardComponent implements OnInit, OnDestroy {

  // @ts-ignore
  dataSource: MatTableDataSource;
  displayedColumns = ["name", "tasks", "actions"];

  groups: GroupTasks[] = [];

  groups_subscription: Subscription = new Subscription();
  confirmation_dialog_subscription: Subscription = new Subscription();

  delete_group_subscription: Subscription = new Subscription();
  created_group_subscription: Subscription = new Subscription();
  updated_group_subscription: Subscription = new Subscription();

  // @ts-ignore
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private _client: BackendService,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog,
              private _transfer: TransferService) {

  }

  ngOnInit(): void {
    this.groups_subscription = this._client.fetchGroupsWithTasks().subscribe(data => {
        this.groups = data as GroupTasks[];
        this.dataSource = new MatTableDataSource(this.groups);
        this.dataSource.paginator = this.paginator;
      }
    )
    this.created_group_subscription = this._transfer.createdGroupStatus$.subscribe(group => {
      this.groups.push(group);
      this.updateDataSource();
    });
    this.updated_group_subscription = this._transfer.updatedGroupStatus$.subscribe(group => {
      const index = this.groups.findIndex(g => g.id === group.id);
      this.groups.splice(index, 1, group);
      this.updateDataSource();
    });
  }

  ngOnDestroy(): void {
    this.confirmation_dialog_subscription.unsubscribe();
    this.created_group_subscription.unsubscribe();
    this.updated_group_subscription.unsubscribe();
    this.delete_group_subscription.unsubscribe();
  }

  openUpdateDialog(id: number) {
    let groupTasks: GroupTasks = new GroupTasks();
    for (const element of this.groups) {
      if (element.id === id) {
        groupTasks = element;
        break;
      }
    }
    this._dialog.open(GroupsModificationComponent, {
      data: groupTasks
    });
  }

  openDeleteDialog(id: number) {
    const dialogRef = this._dialog.open(ConfirmationDialog, {
      data: {
        message: "Do you want to delete this group?"
      }
    })

    this.confirmation_dialog_subscription = dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteGroup(id);
      }
    })
  }

  deleteGroup(id: number) {
    this.delete_group_subscription = this._client.deleteGroupById(id).subscribe({
      complete: () => {
        for (let i = 0; i < this.groups.length; i++) {
          if (this.groups[i].id === id)
            this.groups.splice(i, 1);
        }
        this.updateDataSource();
        this.openSuccessfulDeleteBar();
      },
      error: () => {
        this.openUnsuccessfulDeleteBar();
      }
    })
  }

  updateDataSource() {
    this.dataSource.data = this.groups;
    this.dataSource.paginator = this.paginator;
  }

  openSuccessfulDeleteBar() {
    this._snackBar.open('Group was successfully deleted', "OK", {
      duration: 3000
    })
  }

  openUnsuccessfulDeleteBar() {
    this._snackBar.open('Error occurred when deleting group', "OK", {
      duration: 3000
    })
  }

}
