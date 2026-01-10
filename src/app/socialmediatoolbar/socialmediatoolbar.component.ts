
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
  
import { ShareButtons} from 'ngx-sharebuttons/buttons';

 
@Component({
  selector: 'app-socialmediatoolbar',
  standalone: true,
 imports: [CommonModule, ShareButtons],
  templateUrl: './socialmediatoolbar.component.html',
  styleUrl: './socialmediatoolbar.component.css',
  
})

 

export class SocialmediatoolbarComponent {
   
}