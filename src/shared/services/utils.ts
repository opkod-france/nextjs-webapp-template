import { GridFilterModel } from '@mui/x-data-grid';
import { FormikValues } from 'formik';
import {
  get,
  set,
  toNumber,
  unset,
  isObject,
  omitBy,
  isNil,
  keyBy,
} from 'lodash';

import { Comment } from '../../types/models/Site';

export interface Option {
  value: string;
  label: string;
}

const OperatorsMap = {
  startsWith: {
    number: '$startsWith',
    string: '$startsWithi',
  },
  contains: {
    number: '$contains',
    string: '$containsi',
  },
  isAnyOf: '$in',
  equals: {
    number: '$eq',
    string: '$eqi',
  },
} as const;

export type Operator = keyof typeof OperatorsMap;

type FileFieldKey = string;

export const convertToFormData = (
  values: FormikValues,
  uploadFileFields?: FileFieldKey[]
): FormData => {
  const formData = new FormData();

  // Créez une copie des valeurs pour éviter de les modifier directement.
  const valuesCopy = { ...values };

  // Traitement des champs de fichiers et ajout à formData avec le préfixe "files."
  if (Array.isArray(uploadFileFields) && uploadFileFields.length > 0) {
    processUploadFileFields(formData, valuesCopy, uploadFileFields);
  }

  // Convertissez les valeurs restantes en JSON et ajoutez-les sous la clé "data".
  formData.append('data', JSON.stringify(valuesCopy));
  return formData;
};

const processUploadFileFields = (
  formData: FormData,
  values: FormikValues,
  uploadFileFields: FileFieldKey[]
) => {
  for (const fileField of uploadFileFields) {
    const fileFieldValue = get(values, fileField, null);

    if (Array.isArray(fileFieldValue)) {
      appendMultipleFilesToFormData(formData, fileField, fileFieldValue);
    } else if (fileFieldValue instanceof File) {
      appendSingleFileToFormData(formData, fileField, fileFieldValue);
    }

    // Supprimez le champ traité de values pour éviter d'ajouter les fichiers au JSON.
    unset(values, fileField);
  }
};

const appendMultipleFilesToFormData = (
  formData: FormData,
  fileField: FileFieldKey,
  files: File[]
) => {
  files
    .filter(file => file instanceof File)
    .forEach((file, index) => {
      formData.append(`files.${fileField}[${index}]`, file, file.name);
    });
};

const appendSingleFileToFormData = (
  formData: FormData,
  fileField: FileFieldKey,
  file: File
) => {
  formData.append(`files.${fileField}`, file, file.name);
};

export const strapiModelAttributeGetter = <T>(
  modelValue: unknown,
  attribute: string
): T => {
  return get(modelValue, `attributes.${attribute}`, null) as T;
};

export const getServerFilters = (filterModel: GridFilterModel) => {
  const serverFilters = {};
  filterModel.items.forEach(filterItem => {
    if (filterItem.operator) {
      const operator = filterItem.operator as Operator;

      let strapiOperator;
      switch (operator) {
        case 'startsWith':
        case 'contains':
        case 'equals':
          if (isNaN(toNumber(filterItem.value))) {
            strapiOperator = OperatorsMap[operator].string;
          } else {
            strapiOperator = OperatorsMap[operator].number;
          }
          break;
        default:
          strapiOperator = OperatorsMap[operator];
          break;
      }
      const serverFilterName = `${filterItem.field}.${strapiOperator}`;
      set(serverFilters, serverFilterName, filterItem.value);
    }
  });
  console.log('serverFilters', serverFilters);

  return serverFilters;
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

type NestedObject = {
  [key: string]: string | number | boolean | null | NestedObject;
};

export const removeEmptyKeysRecursively = (obj: NestedObject): NestedObject => {
  Object.keys(obj).forEach(key => {
    const value = obj[key];

    if (isObject(value)) {
      removeEmptyKeysRecursively(value as NestedObject);

      if (Object.keys(value).length === 0) {
        delete obj[key];
      }
    } else if (value === '') {
      delete obj[key];
    }
  });

  return omitBy(obj, isNil);
};

export const calculateDiminution = (
  montantDegrevement: number,
  montantTf: number
) => {
  const result = (montantDegrevement * 100) / montantTf;
  return result || 0;
};

// Function to convert the array of objects to an object map with keys as IDs
export const createObjectMap = (
  data: Comment[]
): { [key: number]: Comment } => {
  const keyByData = keyBy(data, 'id');

  for (const item of data) {
    if (item.children && item.children.length > 0) {
      const childrenMap = createObjectMap(item.children);
      keyByData[item.id].replies = childrenMap;
    }
  }

  return keyByData;
};

export const getLabelsFromArray = (arr: Option[]) => {
  const labelsArray = arr.map(elem => {
    if (typeof elem === 'object') {
      return elem.label;
    } else return elem;
  });
  // Create a Set to remove duplicates
  const uniqueLabels = new Set(labelsArray);

  // Convert the Set back to an array
  const uniqueLabelsArray = Array.from(uniqueLabels);

  return uniqueLabelsArray;
};
