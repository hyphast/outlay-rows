import { IOutlayRowData } from '../app-context/app-context.types'

export interface ICreateRowRequest extends IOutlayRowData {
  parentId: number | null
}

interface IRowData extends IOutlayRowData {
  id: number
  total: number
}

export interface IRowResponse {
  changed: IRowData[]
  current: IRowData
}

export interface IGetTreeResponse extends IRowData {
  child: IRowData
}
