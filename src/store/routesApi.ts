import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = ["route"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getRouteById: build.query<GetRouteByIdApiResponse, GetRouteByIdApiArg>({
        query: (queryArg) => ({ url: `/routes/${queryArg.id}` }),
        providesTags: ["route"],
      }),
      updateRoute: build.mutation<UpdateRouteApiResponse, UpdateRouteApiArg>({
        query: (queryArg) => ({
          url: `/routes/${queryArg.id}`,
          method: "PUT",
          body: queryArg.route,
        }),
        invalidatesTags: ["route"],
      }),
      deleteRoute: build.mutation<DeleteRouteApiResponse, DeleteRouteApiArg>({
        query: (queryArg) => ({
          url: `/routes/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["route"],
      }),
      getAllRoute: build.query<GetAllRouteApiResponse, GetAllRouteApiArg>({
        query: () => ({ url: `/routes` }),
        providesTags: ["route"],
      }),
      createRoute: build.mutation<CreateRouteApiResponse, CreateRouteApiArg>({
        query: (queryArg) => ({
          url: `/routes`,
          method: "POST",
          body: queryArg.route,
        }),
        invalidatesTags: ["route"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type GetRouteByIdApiResponse = /** status 200 OK */ Route;
export type GetRouteByIdApiArg = {
  id: number;
};
export type UpdateRouteApiResponse = /** status 200 OK */ Route;
export type UpdateRouteApiArg = {
  id: number;
  route: Route;
};
export type DeleteRouteApiResponse = unknown;
export type DeleteRouteApiArg = {
  id: number;
};
export type GetAllRouteApiResponse = /** status 200 OK */ Route[];
export type GetAllRouteApiArg = void;
export type CreateRouteApiResponse = /** status 200 OK */ Route;
export type CreateRouteApiArg = {
  route: Route;
};
export type Route = {
  id?: number;
  name?: string;
  path?: string;
};
export const {
  useGetRouteByIdQuery,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
  useGetAllRouteQuery,
  useCreateRouteMutation,
} = injectedRtkApi;
