import * as functions from 'firebase-functions';

import {S_TO_MS, US_TO_MS} from '../../models/constants';
import {Environment} from './environment';

interface CustomErrorBase{
  code: number;
  message: string;
}

interface CustomError extends CustomErrorBase{
  gatewayError?: CustomErrorBase;
}

declare const env: Environment;

export interface ExtendedResponse extends functions.Response{
  startTime?: [number, number];
}

export const Statuses: {[key: string]: number} = {
  OK: 200, NO_CONTENT: 204, FORBIDDEN: 403, SERVER_ERROR: 500, GATEWAY_ERROR: 502
};

export function getDuration(time: [number, number]): string{
  time = process.hrtime(time);

  return (time[0] * S_TO_MS + time[1] / US_TO_MS).toFixed(3);
}

export function sendResponse(res: ExtendedResponse, code: number, content?: string | object): void{
  res.set('Cowtech-Version', env.version);
  res.set('X-Response-Time', `${getDuration(res.startTime)} ms`);

  res.status(code);

  if(content && typeof content === 'object')
    res.json(content);
  else
    res.end(content);
}

export function handleError(res: ExtendedResponse, error: Error | CustomError): void{
  if(error instanceof Error){
    console.error(error);

    return sendResponse(res, Statuses.SERVER_ERROR, {name: error.name, message: error.message, stack: error.stack});
  }

  const response: {code: number, message: string, gatewayError?: any} = {code: error.code, message: error.message};

  if(error.gatewayError)
    response.gatewayError = error.gatewayError;

  return sendResponse(res, Statuses.SERVER_ERROR, response);
}
