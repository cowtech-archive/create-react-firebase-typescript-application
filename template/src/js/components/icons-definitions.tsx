import * as React from "react";

import {BEM, BEMClass} from "../utils/dom-utils";

interface IconDefinition{
  tag: string;
  reference: string;
  definition: string;
}

declare const ICONS: {[name: string]: IconDefinition};
const bem: BEMClass = BEM("IconsDefinitions");

export default class IconsDefinitions extends React.Component<{}, {}>{
  render(): JSX.Element{
    const defs: string = Object.values(ICONS).map((i: IconDefinition) => i.definition).join("");

    return (
      <svg className={bem(null, null, "icons-definition")} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs dangerouslySetInnerHTML={{__html: defs}}/>
      </svg>
    );
  }

  shouldComponentUpdate(): boolean{
    return false;
  }
}
