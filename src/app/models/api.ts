import { Museums } from "./museums";

export class Api {
  constructor(public records: Fields[], public recordid: string) {}
}

export class Fields {
  constructor(public fields: Museums, public recordid: string) {}
}
