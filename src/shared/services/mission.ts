import save from "./save";
import deleteEntity from "./delete";
import read from "./read";
import update from "./update";
import { Entity } from "@/shared/services/endpoints";
import list from "@/shared/services/list";

export class Mission {
  public static ENTITY_NAME: Entity = "mission";
  static find(params: unknown) {
    return list<any>(Mission.ENTITY_NAME, params);
  }
  static findOne(id?: number): Promise<any> | null {
    const params = {
      fields: [],
    };
    return id
      ? read<Mission>(Mission.ENTITY_NAME, id, params)
      : null;
  }
  static save(values: any) {
    return save(Mission.ENTITY_NAME, values);
  }
  static update(values: any) {
    return update(Mission.ENTITY_NAME, values);
  }
  static delete(id: number) {
    return deleteEntity({ entity: Mission.ENTITY_NAME, id });
  }
}
