// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBCYfRAt78hMiH0z3Bow0OU5oSfPBBCAmE',
    authDomain: 'bote.izabil.net',
    databaseURL: 'https://dw-bote.firebaseio.com',
    projectId: 'dw-bote',
    storageBucket: 'dw-bote.appspot.com',
    messagingSenderId: '53136915015',
    appId: '1:53136915015:web:04ecdbdb6a53e212020f62',
    measurementId: 'G-PKD6CKZGBE'
  },
  URLEXTAPI: 'https://api.exchangeratesapi.io/latest',
  WEBCLIENTID: '53136915015-bs2smeqikt7qv64rcj51ta3oba5virds.apps.googleusercontent.com',
  ROLLBAR_ACCESS_TOKEN: '26913d6cce88472a87ad2714a4e54bab',
  BASE_DOMAIN: 'bote.izabil.net',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
