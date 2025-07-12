import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, DefaultOptions, InMemoryCache } from '@apollo/client/core';
import { persistCache } from 'apollo3-cache-persist';

const uri = 'https://talashbff-a4d6dhaab7c5gnah.australiasoutheast-01.azurewebsites.net/graphql'; // <-- add the URL of the GraphQL server her
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const cache = new InMemoryCache();
persistCache({
  cache,
  storage: window.localStorage,
});
const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }

  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,

  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
