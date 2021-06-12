import { ObjectId } from "bson";

export const comicSchema = {
  name: 'comic',
  properties: {
    _id: 'objectId?',
    country: 'string?',
    edition: 'string?',
    no: 'int?',
    owned_comics: 'comic_owned_comics[]',
    owner_id: 'string?',
    publisher: 'string?',
    title: 'string?',
    year: 'string?',
  },
  primaryKey: '_id',
};

export const comic_owned_comicsSchema = {
  name: 'comic_owned_comics',
  embedded: true,
  properties: {
    condition: 'string?',
    price: 'comic_owned_comics_price',
  },
};

export const comic_owned_comics_priceSchema = {
  name: 'comic_owned_comics_price',
  embedded: true,
  properties: {
    currency: 'string?',
    value: 'string?',
  },
};
