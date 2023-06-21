import { Museums } from "./museums";

export class Api {
  constructor(public records: Fields[]) {}
}

export class Fields {
  constructor(public fields: Museums) {}
}
