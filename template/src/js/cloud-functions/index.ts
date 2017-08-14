import * as functions from 'firebase-functions';

import {Environment} from '../models/environment';
import {ExtendedResponse, Statuses, sendResponse} from './modules/http';

declare const env: Environment;

require('core-js/fn/object/values');
require('core-js/fn/object/entries');

exports.main = functions.https.onRequest(async (req: functions.Request, res: ExtendedResponse) => {
  return sendResponse(res, Statuses.OK, req.query);
});
