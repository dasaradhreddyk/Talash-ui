import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular'

@Injectable({
  providedIn: 'root'
})
export class ImageViewerService {

  
  constructor() { }

  
  getBookById = gql`

query getBookByID{
  images{
    url
    likes

  }

}
`
 updateLikes  = gql`
  mutation likeContent($applicaitonId: String!, $actionId: String!, $url: String!){ 
  
  likeContent(applicaitonId: $applicaitonId, actionId: $actionId, url: $url) {
    status
    
  }
}
`;



}