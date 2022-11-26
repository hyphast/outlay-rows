import axios from 'axios'
import { IOutlayRowData } from '../app-context/app-context.types'
import { ICreateRowRequest, IRowResponse } from './api.types'

const eID = 29957
const instance = axios.create({
  baseURL: `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row`,
})

export const OutlayRowsAPI = {
  getTreeRows() {
    return instance.get(`list`).then((response) => {
      return response.data
    })
  },
  createRowInEntity(data: ICreateRowRequest) {
    return instance.post<IRowResponse>('create', data).then((response) => {
      return response.data
    })
  },
  deleteRow(rId: number) {
    return instance.delete<IRowResponse>(`${rId}/delete`).then((response) => {
      return response.data
    })
  },
  updateRow(rId: number, data: IOutlayRowData) {
    return instance
      .post<IRowResponse>(`${rId}/update`, data)
      .then((response) => {
        return response.data
      })
  },
}
