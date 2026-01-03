import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = ["sample"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getSample: build.query<GetSampleApiResponse, GetSampleApiArg>({
        query: (queryArg) => ({ url: `/sample/${queryArg.id}` }),
        providesTags: ["sample"],
      }),
      updateSample: build.mutation<UpdateSampleApiResponse, UpdateSampleApiArg>(
        {
          query: (queryArg) => ({
            url: `/sample/${queryArg.id}`,
            method: "PUT",
            body: queryArg.sampleUpdateForm,
          }),
          invalidatesTags: ["sample"],
        },
      ),
      deleteSample: build.mutation<DeleteSampleApiResponse, DeleteSampleApiArg>(
        {
          query: (queryArg) => ({
            url: `/sample/${queryArg.id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["sample"],
        },
      ),
      getAllSamples: build.query<GetAllSamplesApiResponse, GetAllSamplesApiArg>(
        {
          query: () => ({ url: `/sample` }),
          providesTags: ["sample"],
        },
      ),
      createSample: build.mutation<CreateSampleApiResponse, CreateSampleApiArg>(
        {
          query: (queryArg) => ({
            url: `/sample`,
            method: "POST",
            body: queryArg.sampleCreateForm,
          }),
          invalidatesTags: ["sample"],
        },
      ),
      searchSamples: build.mutation<
        SearchSamplesApiResponse,
        SearchSamplesApiArg
      >({
        query: (queryArg) => ({
          url: `/sample/search`,
          method: "POST",
          body: queryArg.sampleSearchRequest,
        }),
        invalidatesTags: ["sample"],
      }),
      initSamples: build.mutation<InitSamplesApiResponse, InitSamplesApiArg>({
        query: (queryArg) => ({
          url: `/sample/init`,
          method: "POST",
          body: queryArg.sampleInitForm,
        }),
        invalidatesTags: ["sample"],
      }),
      importSamples: build.mutation<
        ImportSamplesApiResponse,
        ImportSamplesApiArg
      >({
        query: (queryArg) => ({
          url: `/sample/import`,
          method: "POST",
          body: queryArg.sampleImportForm,
        }),
        invalidatesTags: ["sample"],
      }),
      exportSamples: build.mutation<
        ExportSamplesApiResponse,
        ExportSamplesApiArg
      >({
        query: (queryArg) => ({
          url: `/sample/export`,
          method: "POST",
          body: queryArg.sampleExportForm,
        }),
        invalidatesTags: ["sample"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type GetSampleApiResponse = /** status 200 OK */ Sample;
export type GetSampleApiArg = {
  id: number;
};
export type UpdateSampleApiResponse =
  /** status 200 Sample updated successfully */ Sample;
export type UpdateSampleApiArg = {
  id: number;
  sampleUpdateForm: SampleUpdateForm;
};
export type DeleteSampleApiResponse = unknown;
export type DeleteSampleApiArg = {
  id: number;
};
export type GetAllSamplesApiResponse = /** status 200 OK */ Sample[];
export type GetAllSamplesApiArg = void;
export type CreateSampleApiResponse =
  /** status 200 Sample created successfully */ Sample;
export type CreateSampleApiArg = {
  sampleCreateForm: SampleCreateForm;
};
export type SearchSamplesApiResponse =
  /** status 200 Search completed successfully */ SampleSearchResponse;
export type SearchSamplesApiArg = {
  sampleSearchRequest: SampleSearchRequest;
};
export type InitSamplesApiResponse =
  /** status 200 Samples initialized successfully */ string;
export type InitSamplesApiArg = {
  sampleInitForm: SampleInitForm;
};
export type ImportSamplesApiResponse =
  /** status 200 Import completed with detailed report */ SampleImportReport;
export type ImportSamplesApiArg = {
  sampleImportForm: SampleImportForm;
};
export type ExportSamplesApiResponse =
  /** status 200 Export completed successfully */ Blob;
export type ExportSamplesApiArg = {
  sampleExportForm: SampleExportForm;
};
export type Sample = {
  id?: number;
  name: string;
  description?: string;
  active?: boolean;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
};
export type ErrorResponse = {
  /** HTTP status code */
  status?: number;
  /** Error type */
  error?: string;
  /** Human-readable error message */
  message?: string;
  /** Map of field names to their specific validation error messages */
  violations?: {
    [key: string]: string;
  };
};
export type SampleUpdateForm = {
  id?: number;
  name?: string;
  description?: string;
  active?: boolean;
};
export type SampleCreateForm = {
  name?: string;
  description?: string;
  active?: boolean;
};
export type SampleSearchResponse = {
  rows?: Sample[];
  rowCount?: number;
};
export type SortItem = {
  field?: string;
  sort?: string;
};
export type FilterItem = {
  field?: string;
  operator?: string;
  value?: any;
};
export type FilterModel = {
  items?: FilterItem[];
  logicOperator?: string;
};
export type SampleSearchRequest = {
  page?: number;
  pageSize?: number;
  sortModel?: SortItem[];
  filterModel?: FilterModel;
};
export type SampleInitForm = {
  numberOfSamples: number;
};
export type SampleImportReportItem = {
  name?: string;
  created?: boolean;
  message?: string;
  alertLevel?: string;
};
export type SampleImportReport = {
  totalProvided?: number;
  totalCreated?: number;
  totalDuplicates?: number;
  totalErrors?: number;
  totalSkipped?: number;
  alertLevel?: string;
  message?: string;
  items?: SampleImportReportItem[];
};
export type SampleImportForm = {
  samples: SampleCreateForm[];
};
export type SampleExportForm = {
  format: string;
  zip?: boolean;
  searchRequest?: SampleSearchRequest;
};
export const {
  useGetSampleQuery,
  useUpdateSampleMutation,
  useDeleteSampleMutation,
  useGetAllSamplesQuery,
  useCreateSampleMutation,
  useSearchSamplesMutation,
  useInitSamplesMutation,
  useImportSamplesMutation,
  useExportSamplesMutation,
} = injectedRtkApi;
