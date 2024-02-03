import save from "./save";
import deleteEntity from "./delete";
import read from "./read";
import update from "./update";
import { Entity } from "@/shared/services/endpoints";
import list from "@/shared/services/list";

export class Airport {
  public static ENTITY_NAME: Entity = "airport";
  static find(params: unknown) {
    return list<any>(Airport.ENTITY_NAME, params);
  }
  static findOne(id?: number): Promise<any> | null {
    const params = {
      fields: [],
    };
    return id
      ? read<Airport>(Airport.ENTITY_NAME, id, params)
      : null;
  }
  static save(values: any) {
    return save(Airport.ENTITY_NAME, values);
  }
  static update(values: any) {
    return update(Airport.ENTITY_NAME, values);
  }
  static delete(id: number) {
    return deleteEntity({ entity: Airport.ENTITY_NAME, id });
  }
}
