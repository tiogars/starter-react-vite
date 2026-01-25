import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = ["app"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllApps: build.query<GetAllAppsApiResponse, GetAllAppsApiArg>({
        query: () => ({ url: `/apps` }),
        providesTags: ["app"],
      }),
      createApp: build.mutation<CreateAppApiResponse, CreateAppApiArg>({
        query: (queryArg) => ({
          url: `/apps`,
          method: "POST",
          body: queryArg.app,
        }),
        invalidatesTags: ["app"],
      }),
      getAppById: build.query<GetAppByIdApiResponse, GetAppByIdApiArg>({
        query: (queryArg) => ({ url: `/apps/${queryArg.id}` }),
        providesTags: ["app"],
      }),
      deleteApp: build.mutation<DeleteAppApiResponse, DeleteAppApiArg>({
        query: (queryArg) => ({
          url: `/apps/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["app"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type GetAllAppsApiResponse = /** status 200 OK */ App;
export type GetAllAppsApiArg = void;
export type CreateAppApiResponse = /** status 200 OK */ App;
export type CreateAppApiArg = {
  app: App;
};
export type GetAppByIdApiResponse = /** status 200 OK */ App;
export type GetAppByIdApiArg = {
  id: number;
};
export type DeleteAppApiResponse = unknown;
export type DeleteAppApiArg = {
  id: number;
};
export type App = {
  id?: number;
  name: string;
  version?: string;
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
  useGetAllAppsQuery,
  useCreateAppMutation,
  useGetAppByIdQuery,
  useDeleteAppMutation,
} = injectedRtkApi;
