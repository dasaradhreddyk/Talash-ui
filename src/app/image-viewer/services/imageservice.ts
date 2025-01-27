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

  }

}
`}