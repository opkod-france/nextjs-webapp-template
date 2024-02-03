import save from "./save";
import deleteEntity from "./delete";
import read from "./read";
import update from "./update";
import { Entity } from "@/shared/services/endpoints";
import list from "@/shared/services/list";

export class Pilot {
  public static ENTITY_NAME: Entity = "pilot";
  static find(params: unknown) {
    return list<any>(Pilot.ENTITY_NAME, params);
  }
  static findOne(id?: number): Promise<any> | null {
    const params = {
      fields: [],
    };
    return id
      ? read<Pilot>(Pilot.ENTITY_NAME, id, params)
      : null;
  }
  static save(values: any) {
    return save(Pilot.ENTITY_NAME, values);
  }
  static update(values: any) {
    return update(Pilot.ENTITY_NAME, values);
  }
  static delete(id: number) {
    return deleteEntity({ entity: Pilot.ENTITY_NAME, id });
  }
}
