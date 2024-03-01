# Okta examples

This repo contains a few okta examples on different branches:

- main: okta + react router v5
- react-router-6: okta + react router v6
- tanstack-router: okta + tanstack router (file based routing)

## Env variables

To test these examples you have to add a `.env` file in the root or this repo containing the following

```
VITE_CLIENT_ID=your client id e.g. 0ao123e12ef
VITE_ISSUER=your issuer e.g. https://{yourOktaDomain}.com/oauth2/default
```

To run the application:

```
npm install
npm run dev
```
