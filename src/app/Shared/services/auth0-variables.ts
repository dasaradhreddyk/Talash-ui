interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
  
    authorizationParams: {
        redirect_uri: string;
    };
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'QWpYDQBJ0zVSOcZq9PcvKi0E0MLb9q1i',
    domain: 'dev-iwjqzqh3tdcsww6r.us.auth0.com',
   // callbackURL: 'http://localhost:4200/',
   callbackURL: 'https://talash.azurewebsites.net/',
     authorizationParams: {
      //  redirect_uri: window.location.origin,
        redirect_uri: 'https://talash.azurewebsites.net/',
      },
};
