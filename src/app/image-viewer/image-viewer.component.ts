import { Component ,SimpleChanges,Input } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';

import { Apollo } from 'apollo-angular';

import { GET_IMAGES } from './../graphql.queries/graphql.countries.queries';
import { ImageViewerService} from './services/imageservice'
import { stringify } from 'querystring';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {

  data: any[] = [];
  //searchword: string = "";
  @Input() searchword: string="";
  imageList: any[] = [];
  imageCompleteDetails: any[] = [];
  loading : boolean = true;

  constructor( private atService: AdventureTimeService,private apollo : Apollo
    , private imageViewerService:ImageViewerService,private sanitizer: DomSanitizer
  ) {
    this.searchword ="nature";    

  
      this.apollo.watchQuery({
        query: this.imageViewerService.getBookById,
        
  
      }).valueChanges.subscribe((res:any)=>{
      
        this.data = res.data.images;
      //  console.log(JSON.stringify(this.data))
         this.data.forEach(x => { 
        //  console.log(x.url);
          this.imageList.push(x.url)
          let imageData: imagedata = {
            url: x.url,likes: x.likes
          };
          this.imageCompleteDetails.push(imageData);
        
        });      
        
      })
  
    

  }
  ngOnChanges(changes: SimpleChanges) {

    
      this.apollo.watchQuery({
        query: this.imageViewerService.getBookById,        
  
      }).valueChanges.subscribe((res:any)=>{
       // console.log("Changes detected" + JSON.stringify(res.data.images)  );
        
        this.data = res.data.images;
      //  console.log(JSON.stringify(this.data))
         
        this.data.forEach(x => { 
        //  console.log(x.url);
          this.imageList.push(x.url)
          let imageData: imagedata = {
            url: x.url,likes: x.likes
          };
          this.imageCompleteDetails.push(imageData);
        
        });       
      
      })
     // console.log("Image List: " + JSON.stringify(this.imageList));
      console.log("Image Complete Details: " + JSON.stringify(this.imageCompleteDetails));  
  }
  imageURL(url :any) {
   // console.log(this.sanitizer.bypassSecurityTrustUrl(url));
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  ngInit()
  {
   
  }
}
interface imagedata{
  url: string;
  likes: number;
}
