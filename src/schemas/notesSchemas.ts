
import Joi from 'joi';

const regexCreated: RegExp = /(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/


export const addNoteSchema = Joi.object({
    name: Joi.string().required(),
    created: Joi.string().required().pattern(regexCreated, "yyyy-mm-dd"),
    category: Joi.string().valid("Task", "Random Thought", "Idea", "Quote").required(),
    content: Joi.string().required(),
    archived: Joi.boolean(),
});

export const updateNoteSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().valid("Task", "Random Thought", "Idea", "Quote").required(),
    content: Joi.string().required(),
});

export const updateArchivedSchema = Joi.object({
    archived: Joi.boolean().required(),
});

