import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    profile: any;

    constructor(public auth: AuthService) { }

    ngOnInit() {
        
            this.auth.getProfile((err:any, profile:any) => {
                this.profile = profile;
            });
        }
    }


