import { SchemaFactory, trimmedString } from "@random-guys/bucket"

export const PersonSchema = SchemaFactory({
  firstname: { ...trimmedString, required: true, index: true },
  lastname: { ...trimmedString, required: true, index: true },
  email: { ...trimmedString, index: true, required: true, unique: true },
  phonenumber: { ...trimmedString, index: true, required: true, unique: true }
})