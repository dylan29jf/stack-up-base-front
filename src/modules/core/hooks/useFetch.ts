import { useQuery } from '@tanstack/react-query'

import { AxiosError, AxiosResponse } from 'axios'
import { getCatalog } from '../services'

interface IFetchCatalogProps {
  endpoint: string
  queries?: string
  skip?: number
  limit?: number
  refeching?: boolean
  enabled?: boolean
  disablePagination?: boolean
}

export const useFetch = <T>({
  endpoint: catalog,
  limit = 10,
  queries = '',
  skip = 0,
  refeching = true,
  enabled = true,
  disablePagination = false,
}: IFetchCatalogProps) => {
  const newSkip = skip > 0 ? skip * limit : skip

  return useQuery<any, AxiosError, AxiosResponse<T>>({
    queryKey: [catalog, limit, queries, skip],
    queryFn: async ({ signal }) =>
      await getCatalog<T>({
        catalog,
        limit,
        queries,
        skip: newSkip,
        abortSingal: signal,
        disablePagination,
      }),
    enabled,
    refetchOnWindowFocus: refeching,
  })
}
