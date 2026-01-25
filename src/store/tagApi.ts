import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = ["tag"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllTags: build.query<GetAllTagsApiResponse, GetAllTagsApiArg>({
        query: () => ({ url: `/tags` }),
        providesTags: ["tag"],
      }),
      createTag: build.mutation<CreateTagApiResponse, CreateTagApiArg>({
        query: (queryArg) => ({
          url: `/tags`,
          method: "POST",
          body: queryArg.tag,
        }),
        invalidatesTags: ["tag"],
      }),
      getTagById: build.query<GetTagByIdApiResponse, GetTagByIdApiArg>({
        query: (queryArg) => ({ url: `/tags/${queryArg.id}` }),
        providesTags: ["tag"],
      }),
      deleteTag: build.mutation<DeleteTagApiResponse, DeleteTagApiArg>({
        query: (queryArg) => ({
          url: `/tags/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["tag"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type GetAllTagsApiResponse = /** status 200 OK */ Tag;
export type GetAllTagsApiArg = void;
export type CreateTagApiResponse = /** status 200 OK */ Tag;
export type CreateTagApiArg = {
  tag: Tag;
};
export type GetTagByIdApiResponse = /** status 200 OK */ Tag;
export type GetTagByIdApiArg = {
  id: number;
};
export type DeleteTagApiResponse = unknown;
export type DeleteTagApiArg = {
  id: number;
};
export type Tag = {
  id?: number;
  name: string;
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
export const {
  useGetAllTagsQuery,
  useCreateTagMutation,
  useGetTagByIdQuery,
  useDeleteTagMutation,
} = injectedRtkApi;
