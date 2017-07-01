import * as React from "react";

import {BEM, BEMClass} from "../utils/dom-utils";

declare const ICONS: {[name: string]: {tag: string, reference: string, definition: string}};
const bem: BEMClass = BEM("Icon");

interface IconProps{
  name: string;
  className?: string;
}

export default class Icon extends React.Component<IconProps>{
  render(): JSX.Element{
    const icon: {tag: string} = ICONS[this.props.name];

    if(!icon){
      console.error(`Missing icon ${this.props.name}.`);

      return null;
    }

    return <svg className={bem(null, this.props.name, ["icon", this.props.className])}><use xlinkHref={`#${icon.tag}`}/></svg>;
  }
}
