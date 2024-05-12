import { Request } from "express";
import { PostType } from "../types";

export interface responseDB {
  _id?: string | number; //Types.ObjectId
  id?: string | number;
  //title: string;
  __v?: number;
}

export const databaseResponseParser = (data: responseDB | responseDB[]) => {
  if (Array.isArray(data)) {
    return data.map((i: responseDB) => {
      delete i.__v;
      i._id = i.id;
      delete i.id;
      return i;
    });
  }
  delete data.__v;
  data.id = data._id;
  delete data._id;
  //console.log('database', data);
  return data;
};

export const deepCopyParser = (data: responseDB | responseDB[]) => {
  return JSON.parse(JSON.stringify(data));
};
