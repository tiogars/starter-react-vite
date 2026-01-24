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
      getAllTags1: build.query<GetAllTags1ApiResponse, GetAllTags1ApiArg>({
        query: () => ({ url: `/sample-tag` }),
        providesTags: ["tag"],
      }),
      createTag1: build.mutation<CreateTag1ApiResponse, CreateTag1ApiArg>({
        query: (queryArg) => ({
          url: `/sample-tag`,
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
      getTagById1: build.query<GetTagById1ApiResponse, GetTagById1ApiArg>({
        query: (queryArg) => ({ url: `/sample-tag/${queryArg.id}` }),
        providesTags: ["tag"],
      }),
      deleteTag1: build.mutation<DeleteTag1ApiResponse, DeleteTag1ApiArg>({
        query: (queryArg) => ({
          url: `/sample-tag/${queryArg.id}`,
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
export type GetAllTags1ApiResponse =
  /** status 200 Tags retrieved successfully */ Tag;
export type GetAllTags1ApiArg = void;
export type CreateTag1ApiResponse =
  /** status 200 Tag created successfully */ Tag;
export type CreateTag1ApiArg = {
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
export type GetTagById1ApiResponse =
  /** status 200 Tag retrieved successfully */ Tag;
export type GetTagById1ApiArg = {
  id: number;
};
export type DeleteTag1ApiResponse = unknown;
export type DeleteTag1ApiArg = {
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
  useGetAllTags1Query,
  useCreateTag1Mutation,
  useGetTagByIdQuery,
  useDeleteTagMutation,
  useGetTagById1Query,
  useDeleteTag1Mutation,
} = injectedRtkApi;
