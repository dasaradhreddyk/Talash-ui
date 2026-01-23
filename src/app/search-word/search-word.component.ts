import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdventureTimeService } from '../services/adventure-time.service';
import { ActivatedRoute } from '@angular/router';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FormsModule } from '@angular/forms';
import { resultKeyNameFromField } from '@apollo/client/utilities';
import { concat } from 'rxjs';
import { CloudData, CloudOptions, TagCloudComponent } from "angular-tag-cloud-module";
import { SearchwordService } from './service/searchword.service';

@Component({
  selector: 'app-events',
  templateUrl: './search-word.component.html',
  styleUrls: ['./search-word.component.css'],
  standalone: true,
  imports: [AutocompleteLibModule, FormsModule, TagCloudComponent]
})
export class SearchWordComponent implements OnInit {

  tagCloudData: CloudData[] = [];
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 300,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 400,
    overflow: false,

    zoomOnHover: {
      scale: 1.2,
      transitionTime: 0.3
    },
    background: "#f6f6f6",
    realignOnResize: true,
    step: 2
  };

  data: CloudData[] = [
    {
      text: "w1",
      weight: 1,
      external: false,
      rotate: 0
    },    
    {
      text: "w6-link",
      weight: 6,
      link: "http://example.org",
      external: true,
      rotate: 0
    },
    {
      text: "w1-link-ext",
      weight: 6,
      link: "http://example.org",
      external: true,
      rotate: 0
    },

    {
      text: "w2",
      weight: 2,
      external: false,
      rotate: 0
    }
  ];
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
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    }
  ];
  constructor( public searchwordService: SearchwordService,
    private route: ActivatedRoute) {

  }

  public Events1: Array<string> = ["live", "fastsearch", "fastsearch"];
  @Output() searchword = new EventEmitter<{ searchword: string, type: string }>();
  typeId!: string;
  placeId!: string;
  advancedkeywords: string = "";

  SearchByKeywords() {
    // this.advancedkeywords= "aivideo";
    console.log("advanced search KKK);" + this.advancedkeywords);
    this.searchword.emit({ searchword: this.advancedkeywords, type: 'advancedsearch' });
  }
  sendNotification(placeId: any, type: any) {

    this.searchword.emit({ searchword: placeId, type: this.typeId });
  }

  selectEvent(item: any) {
    console.log(JSON.stringify(item));
    this.advancedkeywords = item.id;
    console.log("selected item" + this.advancedkeywords);
    // do something with selected item
  }

  onChangeSearch(search: string) {
    console.log('selected *****************' + search);
    this.advancedkeywords = search;

  }

  onFocused(e: any) {
    // do something
  }
  
  ngOnInit(): void {
    const contenttype: string | null = new URLSearchParams(window.location.search).get('type');
    const searchword: string | null = new URLSearchParams(window.location.search).get('searchword');

    const finalContentType: string = contenttype ?? "image";
    const finalSearchword: string = searchword ?? "rise";
    this.searchword.emit({ searchword: finalSearchword, type: finalContentType });

    this.searchwordService.InitializeComponent(this);

  };

}
interface keywordlist {
  id: string;
  value: string;
} 
