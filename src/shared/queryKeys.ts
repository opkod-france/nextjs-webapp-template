import { QueryKey } from "@tanstack/react-query";

import { Entity } from "./services/endpoints";

export type QueryKeyFunctions = Record<
  string,
  (params?: unknown | number) => QueryKey
>;
export type QueryKeysMap = Record<Entity, QueryKeyFunctions>;

const queryKeys: QueryKeysMap = {
  mission: {
    findAll: (params): QueryKey => {
      if (params && Object.keys(params).length > 0) {
        return ["find-mission", params];
      }
      return ["find-missions"];
    },
    findOne: (params): QueryKey => {
      if (params && typeof params === "number") {
        return ["find-site", params];
      }
      return [];
    },
  },
  pilot: {
    findAll: (params): QueryKey => {
      console.log("paramms==>", params);
      if (params && Object.keys(params).length > 0) {
        return ["find-pilot", params];
      }
      return ["find-pilot"];
    },
    findOne: (params): QueryKey => {
      if (params && typeof params === "number") {
        return ["find-site", params];
      }
      return [];
    },
  },
  hospital: {
    findAll: (params): QueryKey => {
      console.log("paramms==>", params);
      if (params && Object.keys(params).length > 0) {
        return ["find-hospital", params];
      }
      return ["find-hospital"];
    },
    findOne: (params): QueryKey => {
      if (params && typeof params === "number") {
        return ["find-site", params];
      }
      return [];
    },
  },
  airport: {
    findAll: (params): QueryKey => {
      console.log("paramms==>", params);
      if (params && Object.keys(params).length > 0) {
        return ["find-airport", params];
      }
      return ["find-airport"];
    },
    findOne: (params): QueryKey => {
      if (params && typeof params === "number") {
        return ["find-site", params];
      }
      return [];
    },
  },
  plane: {
    findAll: (params): QueryKey => {
      console.log("paramms==>", params);
      if (params && Object.keys(params).length > 0) {
        return ["find-plane", params];
      }
      return ["find-plane"];
    },
    findOne: (params): QueryKey => {
      if (params && typeof params === "number") {
        return ["find-site", params];
      }
      return [];
    },
  },
};

export default queryKeys;
