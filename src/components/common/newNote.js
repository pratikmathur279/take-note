import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs';

const markdown = ``;

export const newNote = {
    id: uuid(),
    name: 'new note',
    text: markdown,
    category: '',
    favorite: false,
    created: dayjs().format(),
    lastUpdated: dayjs().format(),
}
