
import { Component, input, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdventureTimeService } from '../../Shared/services/adventure-time.service';
import { filesearchattributesdata } from '../../Shared/Models/FileAdditionalInfo';
import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { concatMap } from 'rxjs';

@Component({
    selector: 'my-video',
    templateUrl: './videoplayer.component.html',
    styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent {
    name = 'Angular 6';
    safeSrc: SafeResourceUrl;
    safeSrc2: SafeResourceUrl[] = [];
    videoids: WeatherForecast1[] = [];
    @Input() searchword: string = "";
    @Input() type: string = "";
    @Input() landing: boolean = false;
    fileAdditonalData!: filesearchattributesdata;
    keywords: string = "";
    items: Array<string>;
    //searchword: string = "";
    data: any[] = [];
    userid: string = "Ananymous";
    profile: any;

    constructor(private sanitizer: DomSanitizer, 
        private atService: AdventureTimeService,
        public auth: AuthService
    , private _http: HttpClient ) {
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/c9F5kMUfFKk");

        this.items = this.atService.getVideodata(this.searchword);
        
        // this.safeSrc2.push(this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/c9F5kMUfFKk"));

    }
    ngOnChanges(changes: SimpleChanges) {
         if (this.landing === true) {
            this.atService.getvideodata1(this.searchword)
                .subscribe((res: any) => {
                    this.data = res;
                  
                         this.safeSrc = this.safeSrc2.push(this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.data[0].name));
                    
                    
                }, (err: any) => {
                    console.log(err);
                });
                return;
        }

        // add delay 
         setTimeout(() => {
    
    }, 1000);

       
       // if (this.auth.isAuthenticated()) 
       {
      this.auth.getProfile((err: any, profile: any) => {
        this.profile = profile;
        if (profile)
          this.userid= profile.name;
           if(this.type === 'video'  && this.landing == false && this.userid !== "Ananymous") {
        
          this.safeSrc2 = [];
            this.atService.getvideodataByUserId(this.userid,this.searchword)
                .subscribe((res: any) => {
                    this.data = res;
                    
                    this.data.forEach(x => this.safeSrc2.push(this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + x.name)));

                }, (err: any) => {
                    console.log(err);
                });
            return;
           }
       
      });
    }

       


        if (this.type === 'videosearch') {
            this.atService.getvideodata1(this.searchword)
                .subscribe((res: any) => {
                    this.data = res;
                  
                    if(this.landing) {  
                        this.safeSrc = this.safeSrc2.push(this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.data[0].name));
                    }
                    else
                    this.data.forEach(x => this.safeSrc2.push(this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + x.name)));

                }, (err: any) => {
                    console.log(err);
                });
        }
        else if (this.type === 'advancedsearch') {
            this.safeSrc2 = [];
            this.atService.GetVidoesByCategory(this.searchword).subscribe((res: any) => {
                this.data = res;
                this.data.forEach(x => {
                    if (x.fileName != null && x.fileName.includes("youtube")
                    ) {
                        
                        // if(x.filename != null && x.fileName.includes("youtube")) 
                        this.safeSrc2.push(this.sanitizer.bypassSecurityTrustResourceUrl(x.fileName));
                        
                    }
                })
            }, (err: any) => {
                console.log(err);
            });
        }

    }
    UpdateKeywords(event: any) {
        this.keywords = event.target.value;
       
    }
    UpdaeKeyWrods(event: any) {
       
        let filename = event.changingThisBreaksApplicationSecurity;
       
        this.fileAdditonalData = {
            username: "Anonymous",
            fileName: filename,
            keywords: this.keywords.split(','),
            videourls: this.data.map(x => "https://www.youtube.com/embed/" + x.name),
            fileCategory: this.searchword,
            summary: "NA"


        };
        this.atService.updateMongoDBFileInfo(this.fileAdditonalData);
    }   
    UpdateLandingPage(event: any) {
        let filename = "\n"+event.changingThisBreaksApplicationSecurity ;
        filename = HttpUrlEncodingCodec.prototype.encodeValue(filename);
        filename = filename.replace("www.youtube.com/embed/" ,  'youtu.be/');
        let url = 'https://talashvideo.azurewebsites.net/PromoteToLandingPage_post?input=' + filename;
        let body = {
            fileName: filename,
        }
        this._http.post(url, body).subscribe((res: any) => {
            console.log("Promote to landing page response: " + JSON.stringify(res));
        }, (err: any) => {
            console.log("Promote to landing page error: " + JSON.stringify(err));
        }   );
        
    }
}
interface WeatherForecast1 {
    name: string;

}
