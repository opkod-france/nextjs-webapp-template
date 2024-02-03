interface StrapiPaginationObject {
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

export interface StrapiBaseDataObject<T> {
  id: number;
  attributes: T;
}
export type StrapiRelatedEntity<T> = {
  data: StrapiBaseDataObject<T>;
};

export interface StrapiBaseReadResponse<T> {
  data: StrapiBaseDataObject<T>[];
  meta?: StrapiPaginationObject;
}

export interface StrapiBaseSingleReadResponse<T> {
  data: StrapiBaseDataObject<T>;
  meta?: StrapiPaginationObject;
}
