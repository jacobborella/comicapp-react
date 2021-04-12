import { ObjectId } from "bson";

export const comicSchema = {
  name: 'comic',
  properties: {
    _id: 'objectId?',
    country: 'string?',
    edition: 'string?',
    owned_comics: 'comic_owned_comics[]',
    owner_id: 'string?',
    publisher: 'string?',
    subtitle: 'string?',
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

class Task {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    status = Task.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.status = status;
  }

  static STATUS_OPEN = "Open";
  static STATUS_IN_PROGRESS = "InProgress";
  static STATUS_COMPLETE = "Complete";
  static schema = {
    name: "Task",
    properties: {
      _id: "objectId",
      _partition: "string?",
      name: "string",
      status: "string",
    },
    primaryKey: "_id",
  };
}

export { Task };
