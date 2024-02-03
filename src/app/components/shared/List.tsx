"use client";

import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import {
  DataGridPro as DataGrid,
  DataGridProProps,
  GetColumnForNewFilterArgs,
  GridColDef,
  GridFilterItem,
  GridFilterModel,
  GridLogicOperator,
} from "@mui/x-data-grid-pro";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

import ErrorBoundary from "@/app/components/shared/ErrorBoundary";
import queryKeys from "@/shared/queryKeys";
import { Entity } from "@/shared/services/endpoints";
import { getServerFilters } from "@/shared/services/utils";
import { CheckAdminAccess } from "@/shared/user";
import { StrapiBaseReadResponse } from "@/types/api-client/StrapiBaseReadResponse";

const DEFAULT_ITEMS_PER_PAGE = 25;
type ListProps<T> = {
  params: object;
  dataFetchFn: (...args: unknown[]) => Promise<StrapiBaseReadResponse<T>>;
  columns: GridColDef[];
  entity: Entity;
  clientToServerFilters?: (filterModel: GridFilterModel) => object;
  initialState?: object;
  dataGridProps?: Omit<DataGridProProps, "columns" | "rows">;
};

const List = <T,>({
  params = {},
  dataFetchFn,
  columns,
  entity,
  clientToServerFilters,
  initialState,
  dataGridProps,
}: ListProps<T>) => {
  const hasAccess: boolean = CheckAdminAccess();
  const [filters, setFilters] = useState({});
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: DEFAULT_ITEMS_PER_PAGE,
  });

  const queryPaginationOptions = useMemo(
    () => ({
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
    }),
    [paginationModel]
  );

  const getColumnForNewFilter = ({
    currentFilters,
    columns,
  }: GetColumnForNewFilterArgs) => {
    const filteredFields = currentFilters?.map(
      ({ field }: GridFilterItem) => field
    );

    const columnForNewFilter = columns
      .filter(
        (colDef: GridColDef) =>
          colDef.filterable && !filteredFields.includes(colDef.field)
      )
      .find((colDef: GridColDef) => colDef.filterOperators?.length);
    return columnForNewFilter?.field ?? null;
  };

  const queryParams = {
    ...params,
    filters,
    pagination: {
      ...queryPaginationOptions,
    },
  };
  const queryKey: QueryKey = queryKeys[entity]?.findAll(queryParams);

  const { data: response, isFetching } = useQuery({
    queryKey,
    queryFn: async () => {
      return await dataFetchFn(queryKey[1]);
    },
  });

  const [rowCountState, setRowCountState] = useState<number>(
    response?.meta?.pagination?.total || 0
  );
  const handleOnFilterChange = useCallback(
    (filterModel: GridFilterModel) => {
      const serverFilters = clientToServerFilters
        ? clientToServerFilters(filterModel)
        : getServerFilters(filterModel);

      setFilters(serverFilters);
    },
    [clientToServerFilters]
  );
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      response !== undefined && response.meta
        ? response.meta.pagination.total
        : prevRowCountState
    );
  }, [response?.meta?.pagination?.total, setRowCountState]);

  console.log("response", response);
  return (
    <Box sx={{ height: 800, width: "100%" }}>
      <ErrorBoundary>
        <DataGrid
          initialState={initialState}
          rows={response?.data || []}
          rowCount={rowCountState}
          columns={columns}
          paginationModel={paginationModel}
          pageSizeOptions={[DEFAULT_ITEMS_PER_PAGE]}
          disableRowSelectionOnClick
          loading={isFetching}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          pagination
          filterMode="server"
          onFilterModelChange={handleOnFilterChange}
          slotProps={{
            filterPanel: {
              columnsSort: "asc",
              logicOperators: [GridLogicOperator.And],
              getColumnForNewFilter,
              filterFormProps: {
                // Customize inputs by passing props
                logicOperatorInputProps: {
                  variant: "outlined",
                  size: "small",
                },
                columnInputProps: {
                  variant: "outlined",
                  size: "small",
                  sx: { mt: "auto" },
                },
                operatorInputProps: {
                  disabled: true, // If you only want to disable the operator
                  sx: { display: "none" }, // If you want to remove it completely
                },
                valueInputProps: {
                  InputComponentProps: {
                    variant: "outlined",
                    size: "small",
                  },
                },
                deleteIconProps: {
                  sx: {
                    "& .MuiSvgIcon-root": { color: "#d32f2f" },
                  },
                },
              },
              sx: {
                border: 1,
                borderColor: grey[300],
                borderTop: 0,
                borderRadius: 2,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                backgroundColor: grey[50],
                boxShadow: 1,
                py: 4,
                px: 2,
              },
            },
            toolbar: {
              entity,
            },
          }}
          {...dataGridProps}
        />
      </ErrorBoundary>
    </Box>
  );
};

export default List;
