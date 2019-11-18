import { BaseRepository, MongooseNamespace } from "@random-guys/bucket";
import mongoose from "mongoose";
import { Person } from "./person.model";
import { PersonSchema } from "./person.schema";


export class PersonRepository extends BaseRepository<Person> {

  constructor(mongoose: MongooseNamespace) {
    super(mongoose, 'User', PersonSchema)
  }

  getByAccount(account: string) {
    return this.byQuery({ account_number: account })
  }

}

export const PersonRepo = new PersonRepository(mongoose)