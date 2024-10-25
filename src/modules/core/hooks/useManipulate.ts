import { message } from 'antd'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { t } from 'i18next'

import { patchCatalog, patchStateCatalog, postCatalog } from '@core/services'

interface IManipulateDataProps {
  endpoint: string
  invalidQuery?: string
  enableInvalidQuery?: boolean
}

interface IHandleSendDataProps {
  values: any
  selected?: any
  postValidation?: boolean
  onSuccess?: (data: AxiosResponse<any, any>) => void
  onFail?: (error: AxiosError | string) => void
  isParamId?: boolean
  params?: string
  invalidQuery?: string
  config?: AxiosRequestConfig
}

interface ReturnManipulateData {
  handleDeactivate: (id: string) => Promise<AxiosResponse<any, any>>
  handleTerminate: (id: string) => Promise<AxiosResponse<any, any>>
  handleReopen: (id: string) => Promise<AxiosResponse<any, any>>
  handleActivate: (id: string) => Promise<AxiosResponse<any, any>>
  isPending: boolean
  handleSendData: ({
    values,
    onFail,
    onSuccess,
    selected,
    isParamId,
    config,
    invalidQuery,
    params,
    postValidation,
  }: IHandleSendDataProps) => Promise<AxiosResponse<any, any>>
}

// useManipulateCatalog
/**
 * The function `useManipulateCatalog` handles deactivating and sending data for a catalog with error
 * handling and success callbacks.
 * Description
 * @returns The `useManipulateCatalog` function returns an object with two properties:
`handleDeactivate` and `handleSendData`. These properties are functions that can be used to handle
deactivating items in a catalog and sending data to update or create items in the catalog,
respectively.
 * @param {() => {}} updater
 * @returns {ReturnManipulateData}
 */
export const useManipulate = ({
  endpoint: catalog,
  invalidQuery,
  enableInvalidQuery = true,
}: IManipulateDataProps): ReturnManipulateData => {
  const clientQuery = useQueryClient()

  const status = {
    activate: {
      value: 1,
      textRes: t('modals.successSave'),
      textErr: t('modals.errorSave'),
    },
    deactivate: {
      value: 0,
      textRes: t('modals.successSave'),
      textErr: t('modals.errorSave'),
    },
    end: {
      value: 2,
      textRes: t('modals.successSave'),
      textErr: t('modals.errorSave'),
    },
    reopen: {
      value: 3,
      textRes: t('modals.successSave'),
      textErr: t('modals.errorSave'),
    },
  }

  interface IPatchStateProps {
    id: string
    newState: keyof typeof status
  }

  const patchStateMutation = useMutation({
    mutationKey: [`patch${catalog}StateMutation`],
    mutationFn: async (values: IPatchStateProps) =>
      await patchStateCatalog(
        catalog,
        status[values.newState].value,
        values.id,
      ),
    onSuccess: async (data, variables) => {
      if (data?.status !== 200) {
        message.error(status[variables.newState].textErr)
      }

      if (enableInvalidQuery) {
        await clientQuery.invalidateQueries({
          queryKey: [invalidQuery ?? catalog],
          type: 'active',
        })
      }

      message.success(status[variables.newState].textRes)
      return data
    },

    onError: (error, variables) => {
      console.error(error)
      message.error(status[variables.newState].textErr)
      return error
    },
  })

  const postMutation = useMutation({
    mutationKey: [`post${catalog}Mutation`],
    mutationFn: async (values: IHandleSendDataProps) =>
      await postCatalog(catalog, values.values, values.config),
    onSuccess: async (data, variables) => {
      if (data?.status === 200 || data.status === 201) {
        if (enableInvalidQuery) {
          await clientQuery.invalidateQueries({
            queryKey: [variables.invalidQuery ?? catalog],
            type: 'active',
          })
        }

        variables.onSuccess && variables.onSuccess(data)
        return data
      } else {
        variables.onFail && variables.onFail('')
      }
    },

    onError: (error, variables) => {
      console.error(`[ERROR_HANDLE_POST_SEND_DATA_${catalog}]:`, error)
      if (error instanceof AxiosError) {
        variables.onFail && variables.onFail(error)
      }
      return error
    },
  })

  const patchMutation = useMutation<
    AxiosResponse<any, any>,
    AxiosError,
    IHandleSendDataProps
  >({
    mutationKey: [`patch${catalog}Mutation`],
    mutationFn: async (values: IHandleSendDataProps) =>
      await patchCatalog(
        catalog,
        values.selected,
        values.values,
        values.isParamId,
        values.params,
      ),
    onSuccess: async (data, variables) => {
      if (data?.status === 200 || data.status === 201) {
        if (enableInvalidQuery) {
          await clientQuery.invalidateQueries({
            queryKey: [variables.invalidQuery ?? catalog],
            type: 'active',
          })
        }

        variables.onSuccess && variables.onSuccess(data)
        return data
      } else {
        variables.onFail && variables.onFail('')
      }
    },

    onError: (error, variables) => {
      console.error(`[ERROR_HANDLE_PATCH_SEND_DATA_${catalog}]:`, error)
      if (error instanceof AxiosError) {
        variables.onFail && variables.onFail(error)
      }
      return error
    },
  })

  const handleDeactivate = async (id: string) =>
    patchStateMutation.mutateAsync({ newState: 'deactivate', id })
  const handleActivate = async (id: string) =>
    patchStateMutation.mutateAsync({ newState: 'activate', id })
  const handleTerminate = async (id: string) =>
    patchStateMutation.mutateAsync({ newState: 'end', id })
  const handleReopen = async (id: string) =>
    patchStateMutation.mutateAsync({ newState: 'reopen', id })

  const handleSendData = async ({
    values,
    selected,
    postValidation = false,
    onSuccess = () => {},
    onFail = () => {},
    isParamId = false,
    params,
    invalidQuery,
    config,
  }: IHandleSendDataProps) => {
    if (postValidation || selected?.id) {
      return patchMutation.mutateAsync({
        onFail,
        onSuccess,
        selected: selected?.id,
        values,
        isParamId,
        params,
        invalidQuery,
      })
    }

    return postMutation.mutateAsync({
      onFail,
      onSuccess,
      values,
      invalidQuery,
      config,
    })
  }

  return {
    handleDeactivate,
    handleTerminate,
    handleReopen,
    handleActivate,
    handleSendData,
    isPending:
      patchStateMutation.isPending ||
      postMutation.isPending ||
      patchMutation.isPending,
  }
}
