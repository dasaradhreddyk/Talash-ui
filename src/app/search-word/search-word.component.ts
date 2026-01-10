import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';
import { ActivatedRoute } from '@angular/router';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { FormsModule } from '@angular/forms';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import { concat } from 'rxjs';
@Component({
    selector: 'app-events',
  templateUrl: './search-word.component.html',
  styleUrls: ['./search-word.component.css'],
  standalone: true,
  imports: [AutocompleteLibModule,FormsModule]
})
export class SearchWordComponent implements OnInit {

   keyword = 'name';
   keywordsforvideo: any[] = [];
  public countries = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];
  constructor(public srv : AdventureTimeService,  private route: ActivatedRoute) {     
      this.srv.GetKeywordsforVideoData().subscribe(res => {
        //console.log("search data"+ JSON.stringify(res)  );
        this.keywordsforvideo = res;
        this.countries = [];
          this.keywordsforvideo.forEach(x => {
          this.countries.push({ id: x, name: x });
         // console.log("keyword item"+ JSON.stringify(x) );
        });
       // console.log("search data "+ JSON.stringify(this.countries));
       });
    
  }
 


    
    public Events1: Array<string> = ["live", "fastsearch", "fastsearch"];
    @Output() searchword = new EventEmitter < { searchword: string, type: string }>();
    typeId!: string;
    placeId!: string;
   advancedkeywords: string="";
    
    SearchByKeywords() {
     // this.advancedkeywords= "aivideo";
      console.log("advanced search KKK);" +this.advancedkeywords);
      this.searchword.emit({ searchword: this.advancedkeywords, type: 'advancedsearch' });
    }
    sendNotification(placeId: any,type: any) {
      
        this.searchword.emit({ searchword: placeId, type: this.typeId });
    }

    
    selectEvent(item:any  ) {
      console.log(JSON.stringify(item ) );
      this.advancedkeywords = item.name;
      console.log( "selected item" + this.advancedkeywords);
    // do something with selected item
  }

  onChangeSearch(search: string) {
    console.log('selected *****************' + search);
    this.advancedkeywords = search;
   
  }

  onFocused(e:any) {
    // do something
  }
    // onClick(event: Event): void {
      

    //     this.searchword.emit({ searchword: 'rise', type: 'image' });
       
    // }
    
    
    
    ngOnInit(): void {     
      const contenttype: string | null = new URLSearchParams(window.location.search).get('type');
      const searchword: string | null = new URLSearchParams(window.location.search).get('searchword');
    
      const finalContentType: string = contenttype ?? "image";
      const finalSearchword: string = searchword ?? "rise"; 

      this.searchword.emit({ searchword: finalSearchword, type: finalContentType });
      console.log(this.Events1);
      this.srv.GetKeywordsforVideoData().subscribe(res => {
  
      
        res.forEach(x => {
          this.countries.push({ id: x.id, name: x.value });
          console.log("keyword item"+ x.value);
        });
          
      
        
        
          console.log("countries data"+ JSON.stringify(this.countries));
          //console.log("keywords for video data item"+ x.value));
      });
      
    }

}
interface keywordlist {
  id: string;
  value: string;
} 
