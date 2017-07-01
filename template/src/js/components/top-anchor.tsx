import * as React from "react";

import {BEM, BEMClass, BoundHandler} from "../utils/dom-utils";

import Icon from "./icon";

const bem: BEMClass = BEM("TopAnchor");

export default class TopAnchor extends React.Component{
  static animationProgress(startTime: number, duration: number = 350): number{
    return Math.min((new Date().getTime() - startTime) / duration, 1);
  }

  // This is easeInOutQuad taken here: https://gist.github.com/gre/1650294
  static ease(x: number): number{
    return x < 0.5 ? Math.pow(x, 2) * 2 : (4 - x * 2) * x - 1; // tslint:disable-line no-magic-numbers
  }

  private element: HTMLAnchorElement;
  private scrollHandler: BoundHandler;

  render(): JSX.Element{
    return (
      <a ref={(el: HTMLAnchorElement) => this.element = el} className={bem(null, "hidden")} onClick={this.handleScrollToTop} href="#top" title="Top">
        <Icon name="chevron-up"/>
      </a>
    );
  }

  componentDidMount(): void{
    this.scrollHandler = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll.bind(this), false);
  }

  componentWillUnmount(): void{
    window.removeEventListener("scroll", this.scrollHandler);
  }

  shouldComponentUpdate(): boolean{
    return false;
  }

  handleScroll(): void{
    if(!this.element)
      return;

    this.element.classList.toggle(bem(null, "hidden"), window.pageYOffset === 0);
  }

  handleScrollToTop(): void{
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
