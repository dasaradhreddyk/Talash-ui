import { gql } from "apollo-angular";

const GET_IMAGES = gql `
    query{
        images{
            url
        }
    }
`;

export { GET_IMAGES }