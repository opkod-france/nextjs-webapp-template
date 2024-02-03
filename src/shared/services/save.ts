import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { get } from "lodash";

import ENDPOINTS, { Entity } from "./endpoints";
import api from "@/shared/services/api";
import { convertToFormData } from "@/shared/services/utils";

const save = (entity: Entity, values: FormikValues): Promise<AxiosResponse> => {
  
  const endpoint = get(ENDPOINTS, entity) as string;
  const options = { headers: { "Content-Type": "multipart/form-data" } };

  const formData = convertToFormData(values);
  return api.post(endpoint, formData, options);
};

export default save;
