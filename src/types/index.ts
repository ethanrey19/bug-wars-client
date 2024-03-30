export type SampleUserType = {
  id: number;
  name: string;
  email: string;
  age: number;
};

export type ScriptRequest = {
  name: String;
  body: String
};

export type Script = {
  scriptId: string;
  name: string;
  body: string;
};

export type GameRequest = {
  mapId: string;
  scriptIds: string[];
};

export type PlayerSelection = {
  name: string;
  selection: string;
}
