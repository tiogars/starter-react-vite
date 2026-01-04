import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = ["tag"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllTags: build.query<GetAllTagsApiResponse, GetAllTagsApiArg>({
        query: () => ({ url: `/sample-tag` }),
        providesTags: ["tag"],
      }),
      createTag: build.mutation<CreateTagApiResponse, CreateTagApiArg>({
        query: (queryArg) => ({
          url: `/sample-tag`,
          method: "POST",
          body: queryArg.sampleTag,
        }),
        invalidatesTags: ["tag"],
      }),
      getTagById: build.query<GetTagByIdApiResponse, GetTagByIdApiArg>({
        query: (queryArg) => ({ url: `/sample-tag/${queryArg.id}` }),
        providesTags: ["tag"],
      }),
      deleteTag: build.mutation<DeleteTagApiResponse, DeleteTagApiArg>({
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
export type GetAllTagsApiResponse =
  /** status 200 Tags retrieved successfully */ SampleTag;
export type GetAllTagsApiArg = void;
export type CreateTagApiResponse =
  /** status 200 Tag created successfully */ SampleTag;
export type CreateTagApiArg = {
  sampleTag: SampleTag;
};
export type GetTagByIdApiResponse =
  /** status 200 Tag retrieved successfully */ SampleTag;
export type GetTagByIdApiArg = {
  id: number;
};
export type DeleteTagApiResponse = unknown;
export type DeleteTagApiArg = {
  id: number;
};
export type SampleTag = {
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
