export interface RawDictionary<V = string>{
  [key: string]: V;
}

export type Dictionary<V = string> = Map<string, V>;
