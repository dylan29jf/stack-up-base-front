import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { message } from 'antd'
import { t } from 'i18next'

import { api } from '../api'

interface IGetCatalogProps {
  catalog: string
  queries?: string
  skip?: number
  limit?: number
  disablePagination: boolean
  abortSingal: AbortSignal
}

export const getCatalog = async <T>({
  catalog,
  limit,
  queries,
  skip,
  abortSingal,
  disablePagination,
}: IGetCatalogProps): Promise<AxiosResponse<T> | null> => {
  const pagination = disablePagination ? '' : `limit=${limit}&skip=${skip}`

  const query = queries ? (pagination ? `&${queries}` : queries) : ''

  try {
    const data = await api.get<any, AxiosResponse<T>>(
      `${catalog}?${pagination}${query}`,
      { signal: abortSingal },
    )
    if (data.status !== 200) {
      throw new Error(`${t('auth.errorQuerying')} ${catalog}`)
    }

    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        message.error(t('auth.errorSessionExpired'))
      }
      if (error.message !== 'canceled' && error.response?.status !== 401) {
        message.error(`${t('auth.errorQuerying')} ${catalog}`)
        console.error(
          `[ERROR_GET_CATALOG_${catalog.toLocaleUpperCase().replace(/\//g, '_')}]`,
          error,
        )
      }
    }
    return null
  }
}

export const patchStateCatalog = async (
  catalog: string,
  status: number,
  id: string,
) => await api.patch(`${catalog}/${id}`, { status })

export const postCatalog = async (
  catalog: string,
  values: any,
  config?: AxiosRequestConfig,
) => await api.post(`${catalog}`, values, config)

export const patchCatalog = async (
  catalog: string,
  id: string,
  values: any,
  isParamId?: boolean,
  params?: string,
) => {
  const param = params ?? (isParamId ? `?id=${id}` : `/${id}`)

  return await api.patch(`${catalog}${param}`, values)
}
