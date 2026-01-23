import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TableComponent } from './Shared/table/table.component';
import { TableRowComponent } from './Shared/table-row/table-row.component';
import {  TableRowMixedComponent} from './Shared/table-row-mixed/table-row-mixed.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AdventureTimeService } from './Shared/services/adventure-time.service';
import { TableRowIncorrectComponent } from './Shared/table-row-incorrect/table-row-incorrect.component';
import { FileuploadComponent } from './file-upload/file-upload.component';
import { SearchWordComponent } from './search-word/search-word.component';
import { HomeComponent } from './AddOns/home/home.component';
import {  BlobuploadComponent} from './blobupload/blobupload.component'

import { NguiInViewComponent } from './ngui-in-view/ngui-in-view.component';
import { VideoplayerComponent } from './MainApp/video-viewer/videoplayer.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component'
import { PreviewComponent } from './preview/preview.component';
import { ShareComponent } from './share/share.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthService } from './Shared/services/auth.service';
import { ProfileComponent } from './Shared/profile/profile.component';
// import { MeetingsComponent } from './meetings/meetings.component'
// import { DyteComponentsModule } from '@dytesdk/angular-ui-kit';
// import { ChatroomsComponent} from './chatrooms/chatrooms.component'
import { AppstoreComponent } from './appstore/appstore.component'
import { ContentuploadComponent} from './contentupload/contentupload.component'
import {  GraphQLModule } from './graphql.module'
import { TagCloudModule } from "angular-tag-cloud-module";



@NgModule({
    declarations: [
        AppComponent,        
        TableComponent,
        TableRowComponent,
        TableRowIncorrectComponent,
        TableRowMixedComponent,
        FileuploadComponent,
        SearchWordComponent,
        HomeComponent,        
        NguiInViewComponent,
        VideoplayerComponent,
        ImageViewerComponent,
        PreviewComponent,
        ShareComponent,
        NavMenuComponent,
        
        BlobuploadComponent,
        ProfileComponent,
        // MeetingsComponent,
        // ChatroomsComponent,
        AppstoreComponent,
        ContentuploadComponent,
        

    ],
    imports: [

        BrowserModule,
        FormsModule,
        TagCloudModule,
        ReactiveFormsModule,
    
        HttpClientModule,
        RouterModule.forRoot([{
            path: 'mysite/:id',component: AppComponent
        },
            
        ]),
        GraphQLModule, 
        
            
    ],
    providers: [AdventureTimeService , AuthService

        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }