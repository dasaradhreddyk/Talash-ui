import { Component ,SimpleChanges,Input, OnInit,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdventureTimeService } from '../Shared/services/adventure-time.service';

import { Apollo } from 'apollo-angular';

import { GET_IMAGES } from '../Shared/graphql.queries/graphql.countries.queries';
import { ImageViewerService} from './services/imageservice'
import { stringify } from 'querystring';
import { DomSanitizer } from "@angular/platform-browser";
import { AppSignalRService } from '../Shared/services/app-signalr.service';





@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css'],

  
  
})
export class ImageViewerComponent implements OnInit {

  data: any[] = [];
  //searchword: string = "";
  @Input() searchword: string="";
  searchwords1: string="landing";
  type: string="video";
  imageList: any[] = [];
  imageCompleteDetails: any[] = [];
  loading : boolean = true;
  ShowLikes : boolean = false;
  receivedMessage: string ="";

  constructor( private atService: AdventureTimeService,private apollo : Apollo
    , private imageViewerService:ImageViewerService,private sanitizer: DomSanitizer
    ,private signalRService: AppSignalRService
  ) {
    this.searchword ="nature";    

  
      // this.apollo.watchQuery({
      //   query: this.imageViewerService.getBookById,
        
  
      // }).valueChanges.subscribe((res:any)=>{
      
      
  
    

  }
ngOnInit(): void {
    this.signalRService.startConnection().subscribe(() => {
      this.signalRService.receiveMessage().subscribe((message) => {
        this.receivedMessage = message;
         this.imageCompleteDetails.forEach((item) => {
      if (item.url === message) {
        item.likes += 1; // Increment likes for the specific image
      }
    });
        console.log(this.receivedMessage);
      });
    });
    this.searchword ="nature";    

  
      this.apollo.watchQuery({
        query: this.imageViewerService.getBookById,
        
  
      }).valueChanges.subscribe((res:any)=>{
      
        this.data = res.data.images;
      //  console.log(JSON.stringify(this.data))
         this.data.forEach(x => { 
        //  console.log(x.url);
          //this.imageList.push(x.url)
          let imageData: imagedata = {
            url: x.url,likes: x.likes
          };
          this.imageCompleteDetails.push(imageData);
        
        });      
        
      })
  
  }
  
  downloadItem(url: string) {
this.apollo.mutate({
        mutation: this.imageViewerService.updatedownloadcount,
        variables: {
          applicationId:"",         
          actionId:"2", // Assuming you have an enum for actions
           url: url,
          
        },
        refetchQueries: [{
          query: this.imageViewerService.getBookById,
        }]
      }).subscribe();
    
  }

  deleteItem(url: string) {
this.apollo.mutate({
        mutation: this.imageViewerService.updatedelete,
        variables: {
          applicationId:"",         
          actionId:"1", // Assuming you have an enum for actions
           url: url,
          
        },
        refetchQueries: [{
          query: this.imageViewerService.getBookById,
        }]
      }).subscribe();
    
  }
  UpdateLikes(url: string) {
  {
    
    
    this.apollo.mutate({
        mutation: this.imageViewerService.updateLikes,
        variables: {
           applicationId: "0", // fixed typo here
          actionId:"0",
           url: url,
          
        },
         refetchQueries: [{
          query: this.imageViewerService.getBookById,
        }]
      }).subscribe();

    this.sendMessage( url);
    // this.imageCompleteDetails.forEach((item) => {
    //   if (item.url === url) {
    //     item.likes += 1; // Increment likes for the specific image
    //   }
    // });
    console.log("Show Likes: " + this.ShowLikes);
  }
}

sendMessage(message: string): void {
    this.signalRService.sendMessage(message);
  }

  ngOnChanges(changes: SimpleChanges) {

    let query = this.imageViewerService.getBookById1;
     if(this.searchword == "" || this.searchword == "Pets" || this.searchword == "Fashion"
       || this.searchword == "Sports")
    {
        
      this.searchword = "nature1";

      this.apollo.watchQuery({
        query: this.imageViewerService.getBookById1,  
        variables: {
          category: this.searchword || "nature1", // Assign a default value if searchword is empty
        },
        fetchPolicy: 'no-cache'     
  
      }).valueChanges.subscribe((res:any)=>{
        
        this.data = res.data.images;
         
        this.data.forEach(x => { 
       //   this.imageList.push(x.url)
          let imageData: imagedata = {
            url: x.url,likes: x.likes
          };
          this.imageCompleteDetails.push(imageData);
        
        });       
      
      })
    }
      else
      {
        
      this.apollo.watchQuery({
        query: query,
        variables: {
          category: this.searchword || "nature1", // Assign a default value if searchword is empty
        },
        fetchPolicy: 'no-cache'     
  
      }).valueChanges.subscribe((res:any)=>{
        
        this.data = res.data.imagesByCategory;
       
        this.data.forEach(x => { 
      
          let imageData: imagedata = {
            url: x.url,likes: x.likes
          };
          this.imageCompleteDetails.push(imageData);
          this.imageCompleteDetails.reverse(); // Reverse the array to show the latest images first
        
        });       
      
      })

      }
  }
  imageURL(url :any) {
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
