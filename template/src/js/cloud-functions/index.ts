import * as functions from 'firebase-functions';

import {Environment} from '../models/environment';
import {ExtendedResponse, Statuses, sendResponse} from './modules/http';

declare const env: Environment;

exports.main = functions.https.onRequest(async (req: functions.Request, res: ExtendedResponse) => {
  return sendResponse(res, Statuses.OK, req.query);
});
