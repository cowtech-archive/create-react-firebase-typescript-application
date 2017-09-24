import * as React from 'react';

import {BEM, BEMClass, BoundHandler} from '../utils/dom-utils';

interface Icons{
  prefix: string;
  tags: {[key: string]: string};
  definitions: string;
}

interface IconProps{
  name: string;
  className?: string;
}

declare const ICONS: Icons;

export class Emoji extends React.Component<{code: string}>{
  render(): JSX.Element{
    return <span className="Emoji" dangerouslySetInnerHTML={{__html: `&#x${this.props.code};`}}/>;
  }
}

export class Icon extends React.Component<IconProps>{
  private bem: BEMClass = BEM('Icon');

  render(): JSX.Element{
    const icon: string = ICONS.tags[this.props.name];

    if(!icon){
      console.error(`Missing icon ${this.props.name}.`);

      return null;
    }

    return <svg className={this.bem(null, this.props.name, ['icon', this.props.className])}><use xlinkHref={`#${icon}`}/></svg>;
  }
}

export class IconsDefinitions extends React.Component{
  render(): JSX.Element{
    return (
      <svg className="IconsDefinitions icons-definition" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <defs dangerouslySetInnerHTML={{__html: ICONS.definitions}}/>
      </svg>
    );
  }

  shouldComponentUpdate(): boolean{
    return false;
  }
}

export function BrowseHappy(): JSX.Element{
  return (
    <div id="browseHappy" className="BrowseHappy BrowseHappy--hidden">
      <span>Your browser is obsolete. For the best browsing experience, update it for free by visiting&nbsp;</span>
      <a href="https://browsehappy.com/" className="BrowseHappy__link" target="_blank" rel="noopener">BrowseHappy</a>.
    </div>
  );
}

export class TopAnchor extends React.Component{
  static animationProgress(startTime: number, duration: number = 350): number{
    return Math.min((new Date().getTime() - startTime) / duration, 1);
  }

  // This is easeInOutQuad taken here: https://gist.github.com/gre/1650294
  static ease(x: number): number{
    return x < 0.5 ? Math.pow(x, 2) * 2 : (4 - x * 2) * x - 1; // tslint:disable-line no-magic-numbers
  }

  private element: HTMLAnchorElement;
  private scrollHandler: BoundHandler;
  private bem: BEMClass = BEM('TopAnchor');

  render(): JSX.Element{
    return (
      <a id="topAnchor" ref={(el: HTMLAnchorElement) => this.element = el} className={this.bem(null, 'hidden')}
        onClick={this.handleScrollToTop.bind(this)} href="#top" title="Top">
        <Icon name="chevron-up"/>
      </a>
    );
  }

  componentDidMount(): void{
    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll.bind(this), false);
  }

  componentWillUnmount(): void{
    window.removeEventListener('scroll', this.scrollHandler);
  }

  shouldComponentUpdate(): boolean{
    return false;
  }

  handleScroll(): void{
    if(!this.element)
      return;

    this.element.classList.toggle(this.bem(null, 'hidden').split(' ').pop(), window.pageYOffset === 0);
  }

  handleScrollToTop(ev: React.SyntheticEvent<MouseEvent>): void{
    ev.preventDefault();

    const startTime: number = new Date().getTime();
    const base: number = document.body.scrollTop;

    // Step function for the the animation
    const animate = function(): void{
      // Compute the progress
      const progress: number = TopAnchor.animationProgress(startTime);

      // Perform scrolling
      const delta: number = base * TopAnchor.ease(progress);
      document.body.scrollTop = Math.max(base - delta, 0);

      // Next step or fail stop
      if(progress < 1)
        requestAnimationFrame(animate);
      else
        document.body.scrollTop = 0;
    };

    animate();
  }
}

export function Spinner({text}: {text?: string}): JSX.Element{
  return (
    <main className="Spinner">
      <svg className="Spinner__icon" viewBox="0 0 66 66">
        <circle className="Spinner__icon-path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"/>
      </svg>
      {text && <h3 className="Spinner__title">{text}</h3>}
    </main>
  );
}