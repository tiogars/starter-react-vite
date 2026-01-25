import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = ["feature"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      deleteFeaturesById: build.mutation<
        DeleteFeaturesByIdApiResponse,
        DeleteFeaturesByIdApiArg
      >({
        query: (queryArg) => ({
          url: `/features/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["feature"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export type DeleteFeaturesByIdApiResponse = unknown;
export type DeleteFeaturesByIdApiArg = {
  id: number;
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
export const { useDeleteFeaturesByIdMutation } = injectedRtkApi;
