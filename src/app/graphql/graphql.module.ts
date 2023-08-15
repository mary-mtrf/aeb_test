import { HttpClientModule } from '@angular/common/http';
import {
  APOLLO_OPTIONS,
  APOLLO_NAMED_OPTIONS,
  ApolloModule,
} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  ApolloClientOptions,
  ApolloLink,
  InMemoryCache,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { environment } from 'src/environments/environment';

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  // React only on graphql errors
  if (graphQLErrors && graphQLErrors.length > 0) {
    if (
      (graphQLErrors[0] as any)?.statusCode >= 400 &&
      (graphQLErrors[0] as any)?.statusCode < 500
    ) {
      // handle client side error
      console.error(`[Client side error]: ${graphQLErrors[0].message}`);
    } else {
      // handle server side error
      console.error(`[Server side error]: ${graphQLErrors[0].message}`);
    }
  }
  if (networkError) {
    // handle network error
    console.error(`[Network error]: ${networkError.message}`);
  }
});

const basicContext = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Accept: 'charset=utf-8',
      authorization: `Bearer random token`,
      'Content-Type': 'application/json',
    },
  };
});

export function createDefaultApollo(
  httpLink: HttpLink
): ApolloClientOptions<any> {
  const cache = new InMemoryCache({});

  // create http
  const http = httpLink.create({
    uri: 'https://rickandmortyapi.com/graphql',
  });

  return {
    connectToDevTools: !environment.production,
    assumeImmutableResults: true,
    cache,
    link: ApolloLink.from([basicContext, errorLink, http]),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  };
}

@NgModule({
  imports: [BrowserModule, HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createDefaultApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
