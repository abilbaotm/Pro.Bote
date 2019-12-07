/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBCYfRAt78hMiH0z3Bow0OU5oSfPBBCAmE',
    authDomain: 'dw-bote.firebaseapp.com',
    databaseURL: 'https://dw-bote.firebaseio.com',
    projectId: 'dw-bote',
    storageBucket: 'dw-bote.appspot.com',
    messagingSenderId: '53136915015',
    appId: '1:53136915015:web:04ecdbdb6a53e212020f62',
    measurementId: 'G-PKD6CKZGBE',
  },
};
