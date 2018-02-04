import {style, debugName} from 'typestyle';

export const fontSize: string = '12pt';

export {colorBlue700 as linkColor, colorBlue300 as linkHighlightColor} from '@cowtech/react-lazily/styling/colors';

export const mainClassName: string = style(
  debugName('main')
);
