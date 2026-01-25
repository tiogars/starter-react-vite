import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = ["repository"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
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
          body: queryArg.repository,
        }),
        invalidatesTags: ["repository"],
      }),
      getRepositoryById: build.query<
        GetRepositoryByIdApiResponse,
        GetRepositoryByIdApiArg
      >({
        query: (queryArg) => ({ url: `/repositories/${queryArg.id}` }),
        providesTags: ["repository"],
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
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type GetAllRepositoriesApiResponse = /** status 200 OK */ Repository;
export type GetAllRepositoriesApiArg = void;
export type CreateRepositoryApiResponse = /** status 200 OK */ Repository;
export type CreateRepositoryApiArg = {
  repository: Repository;
};
export type GetRepositoryByIdApiResponse = /** status 200 OK */ Repository;
export type GetRepositoryByIdApiArg = {
  id: number;
};
export type DeleteRepositoryApiResponse = unknown;
export type DeleteRepositoryApiArg = {
  id: number;
};
export type Repository = {
  id?: number;
  name: string;
  url?: string;
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
export const {
  useGetAllRepositoriesQuery,
  useCreateRepositoryMutation,
  useGetRepositoryByIdQuery,
  useDeleteRepositoryMutation,
} = injectedRtkApi;
