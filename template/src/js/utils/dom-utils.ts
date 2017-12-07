import * as BEMHelper from 'react-bem-helper';

const Defaults = BEMHelper.withDefaults({outputIsString: true});

export type BoundHandler = (...args: Array<any>) => void | Promise<void>;

export type BEMClass = BEMHelper<string>;

export function BEM(name: string, options?: any): BEMClass{
  return new Defaults({name, ...options});
}

export function titleCase(input: string): string{
  return input.toLowerCase().replace(/(?:^[a-z])|(?:\s[a-z])/g, (t: string) => t.toUpperCase());
}

export function handleIOSMinHeight(offset: number): void{
  document.body.style.minHeight = document.getElementById('main').style.height = `${window.innerHeight - offset}px`;
}
