import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular'
import { SearchWordComponent } from '../search-word.component';
import { AdventureTimeService } from 'src/app/Shared/services/adventure-time.service';

@Injectable({
    providedIn: 'root'
})
export class SearchwordService {

    constructor(public srv: AdventureTimeService,) { }
    InitializeComponent(component: SearchWordComponent) {
        this.srv.GetKeywordsAndCountforVideoData().subscribe(res => {
            component.countries = [];
            res.forEach(x => {

                component.countries.push({ id: x.keyWord, name: x.keyWord + " (" + x.count + ")" });
                
            });

            this.srv.GetKeywordsAndCountforVideoData().subscribe(res => {
                res.forEach((element: { keyWord: string; count: number; }) => {
                    component.tagCloudData.push({ text: element.keyWord, weight: element.count, external: false, rotate: 0 });
                });
            });

        });

    }
}        
