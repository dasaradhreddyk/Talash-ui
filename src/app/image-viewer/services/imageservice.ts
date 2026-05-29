import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular'

@Injectable({
  providedIn: 'root'
})
export class ImageViewerService {

  
  constructor() { }

  getBookById1 = gql`
    query getBookById1($category: String!) {
      imagesByCategory(category: $category , limit: 100) {
        url
        likes
      }
    }
  `

  getBookById = gql`

query getBookByID{
  images{
    url
    likes

  }

}
`
updatedelete = gql`

mutation deleteContent($applicationId: String!, $actionId: String!, $url: String!){ 

  deletecontent(applicationId: $applicationId, actionId: $actionId, url: $url) {
    status
    
  }
}
  
`
updatedownloadcount = gql`

mutation deleteContent($applicationId: String!, $actionId: String!, $url: String!){ 

  deletecontent(applicationId: $applicationId, actionId: $actionId, url: $url) {
    status
    
  }
}
  
`
 updateLikes  = gql`
  mutation likeContent($applicationId: String!, $actionId: String!, $url: String!){ 
  
  likeContent(applicationId: $applicationId, actionId: $actionId, url: $url) {
    status
    
  }
}
`;



}