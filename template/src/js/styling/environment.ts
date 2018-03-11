export {debugClassName, colorBlue700 as linkColor, colorBlue300 as linkHighlightColor, colorGrey400 as spinnerColor} from '@cowtech/react-lazily';

import {style} from 'typestyle';
import {debugClassName, systemFontsStack} from '@cowtech/react-lazily';

export const fontSize = '12pt';
export const mainFontFamily = `"Lato", ${systemFontsStack}`;

export const mainClassName = style(
  debugClassName('main')
);
