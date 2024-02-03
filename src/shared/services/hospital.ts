import save from "./save";
import deleteEntity from "./delete";
import read from "./read";
import update from "./update";
import { Entity } from "@/shared/services/endpoints";
import list from "@/shared/services/list";

export class Hospital {
  public static ENTITY_NAME: Entity = "hospital";
  static find(params: unknown) {
    return list<any>(Hospital.ENTITY_NAME, params);
  }
  static findOne(id?: number): Promise<any> | null {
    const params = {
      fields: [],
    };
    return id
      ? read<Hospital>(Hospital.ENTITY_NAME, id, params)
      : null;
  }
  static save(values: any) {
    return save(Hospital.ENTITY_NAME, values);
  }
  static update(values: any) {
    return update(Hospital.ENTITY_NAME, values);
  }
  static delete(id: number) {
    return deleteEntity({ entity: Hospital.ENTITY_NAME, id });
  }
}
