import * as React from 'react';

export default class Emoji extends React.Component<{code: string}>{
  render(): JSX.Element{
    return <span className="Emoji" dangerouslySetInnerHTML={{__html: `&#x${this.props.code};`}}/>;
  }
}
