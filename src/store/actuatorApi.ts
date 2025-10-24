import { emptySplitApi as api } from "./emptyApi";
export const addTagTypes = [] as const;

export interface ActuatorHealthResponse {
  status: string;
}

const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAlactuatorHealth: build.query<ActuatorHealthResponse, null>({
        query: () => ({ url: `/actuator/health` }),
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };
export const { useGetAlactuatorHealthQuery } = injectedRtkApi;
