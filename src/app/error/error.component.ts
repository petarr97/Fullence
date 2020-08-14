import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    templateUrl: './error.component.html',
    selector: 'app-error',
    styleUrls: ['./error.component.css']
})

export class ErrorComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { message: string },
        public dialog: MatDialog,
        private http: HttpClient, private router: Router
    ) { }
    close() {
        this.router.url != "/login" && this.router.url != "/signup" ? this.router.navigate(["/"]) : "";
        this.dialog.closeAll();
    }
}
