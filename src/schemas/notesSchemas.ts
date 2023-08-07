import { object, string, boolean, ValidationError } from 'yup';

const regexCreated: RegExp = /(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/

export const addNoteSchema = object({
    name: string().required(),
    created: string().required().matches(regexCreated, "Date shoud be in format yyyy-mm-dd"),
    category: string().required(),
    content: string().required(),
    archived: boolean().required(),
});