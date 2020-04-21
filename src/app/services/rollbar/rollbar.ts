// @ts-ignore
import Rollbar from 'rollbar';

import {ErrorHandler, Inject, Injectable, InjectionToken} from '@angular/core';
import {environment} from "../../../environments/environment";

const rollbarConfig = {
  accessToken: environment.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) {
  }

  handleError(err: any): void {
    console.error(err.originalError || err)
    if (environment.production) {
      this.rollbar.error(err.originalError || err);
    }
  }
}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}
