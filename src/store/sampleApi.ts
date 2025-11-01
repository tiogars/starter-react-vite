import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = ["sample"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
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
      getSample: build.query<GetSampleApiResponse, GetSampleApiArg>({
        query: (queryArg) => ({ url: `/sample/${queryArg.id}` }),
        providesTags: ["sample"],
      }),
      deleteSample: build.mutation<DeleteSampleApiResponse, DeleteSampleApiArg>(
        {
          query: (queryArg) => ({
            url: `/sample/${queryArg.id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["sample"],
        },
      ),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type GetAllSamplesApiResponse = /** status 200 OK */ Sample[];
export type GetAllSamplesApiArg = void;
export type CreateSampleApiResponse =
  /** status 200 Sample created successfully */ Sample;
export type CreateSampleApiArg = {
  sampleCreateForm: SampleCreateForm;
};
export type GetSampleApiResponse = /** status 200 OK */ Sample;
export type GetSampleApiArg = {
  id: number;
};
export type DeleteSampleApiResponse = unknown;
export type DeleteSampleApiArg = {
  id: number;
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
export type SampleCreateForm = {
  name?: string;
  description?: string;
  active?: boolean;
};
export const {
  useGetAllSamplesQuery,
  useCreateSampleMutation,
  useGetSampleQuery,
  useDeleteSampleMutation,
} = injectedRtkApi;
