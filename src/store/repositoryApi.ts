import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = ["repository"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getRepositoryById: build.query<
        GetRepositoryByIdApiResponse,
        GetRepositoryByIdApiArg
      >({
        query: (queryArg) => ({ url: `/repositories/${queryArg.id}` }),
        providesTags: ["repository"],
      }),
      updateRepository: build.mutation<
        UpdateRepositoryApiResponse,
        UpdateRepositoryApiArg
      >({
        query: (queryArg) => ({
          url: `/repositories/${queryArg.id}`,
          method: "PUT",
          body: queryArg.repositoryUpdateForm,
        }),
        invalidatesTags: ["repository"],
      }),
      deleteRepository: build.mutation<
        DeleteRepositoryApiResponse,
        DeleteRepositoryApiArg
      >({
        query: (queryArg) => ({
          url: `/repositories/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["repository"],
      }),
      getAllRepositories: build.query<
        GetAllRepositoriesApiResponse,
        GetAllRepositoriesApiArg
      >({
        query: () => ({ url: `/repositories` }),
        providesTags: ["repository"],
      }),
      createRepository: build.mutation<
        CreateRepositoryApiResponse,
        CreateRepositoryApiArg
      >({
        query: (queryArg) => ({
          url: `/repositories`,
          method: "POST",
          body: queryArg.repositoryCreateForm,
        }),
        invalidatesTags: ["repository"],
      }),
      searchRepositories: build.mutation<
        SearchRepositoriesApiResponse,
        SearchRepositoriesApiArg
      >({
        query: (queryArg) => ({
          url: `/repositories/search`,
          method: "POST",
          body: queryArg.repositorySearchRequest,
        }),
        invalidatesTags: ["repository"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type GetRepositoryByIdApiResponse = /** status 200 OK */ Repository;
export type GetRepositoryByIdApiArg = {
  id: number;
};
export type UpdateRepositoryApiResponse = /** status 200 OK */ Repository;
export type UpdateRepositoryApiArg = {
  id: number;
  repositoryUpdateForm: RepositoryUpdateForm;
};
export type DeleteRepositoryApiResponse = unknown;
export type DeleteRepositoryApiArg = {
  id: number;
};
export type GetAllRepositoriesApiResponse = /** status 200 OK */ Repository;
export type GetAllRepositoriesApiArg = void;
export type CreateRepositoryApiResponse = /** status 200 OK */ Repository;
export type CreateRepositoryApiArg = {
  repositoryCreateForm: RepositoryCreateForm;
};
export type SearchRepositoriesApiResponse =
  /** status 200 OK */ RepositorySearchResponse;
export type SearchRepositoriesApiArg = {
  repositorySearchRequest: RepositorySearchRequest;
};
export type Repository = {
  id?: number;
  name: string;
  url?: string;
  description?: string;
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
export type RepositoryUpdateForm = {
  name: string;
  description?: string;
};
export type RepositoryCreateForm = {
  name: string;
  description?: string;
};
export type RepositorySearchResponse = {
  items?: Repository[];
  total?: number;
};
export type RepositorySearchRequest = {
  name?: string;
};
export const {
  useGetRepositoryByIdQuery,
  useUpdateRepositoryMutation,
  useDeleteRepositoryMutation,
  useGetAllRepositoriesQuery,
  useCreateRepositoryMutation,
  useSearchRepositoriesMutation,
} = injectedRtkApi;
