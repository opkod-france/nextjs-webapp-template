import save from "./save";
import deleteEntity from "./delete";
import read from "./read";
import update from "./update";
import { Entity } from "@/shared/services/endpoints";
import list from "@/shared/services/list";

export class Plane {
  public static ENTITY_NAME: Entity = "plane";
  static find(params: unknown) {
    console.log("aaa==>",Plane.ENTITY_NAME)
    return list<any>(Plane.ENTITY_NAME, params);
  }
  static findOne(id?: number): Promise<any> | null {
    const params = {
      fields: [],
    };
    return id
      ? read<Plane>(Plane.ENTITY_NAME, id, params)
      : null;
  }
  static save(values: any) {
    return save(Plane.ENTITY_NAME, values);
  }
  static update(values: any) {
    return update(Plane.ENTITY_NAME, values);
  }
  static delete(id: number) {
    return deleteEntity({ entity: Plane.ENTITY_NAME, id });
  }
}
