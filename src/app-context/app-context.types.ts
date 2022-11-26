import {
  CHANGE_EQUIP_COSTS,
  CHANGE_EST_PROFIT,
  CHANGE_OVERHEADS,
  CHANGE_ROW_NAME,
  CHANGE_SALARY,
  SET_OUTLAY_ROWS,
  DELETE_OUTLAY_ROW,
  CREATE_OUTLAY_ROW,
  UPDATE_OUTLAY_ROW,
} from './action'

export interface IOutlayRowData {
  rowName: string //Наименование работы
  salary: number //Зарплата
  equipmentCosts: number //Оборудование
  overheads: number //Накладные расходы
  estimatedProfit: number //Сметная прибыль
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  supportCosts: number
}

export interface IOutlayRowState extends IOutlayRowData {
  id: number
  child?: IOutlayRowState[]
  isLocal?: boolean
  parentId?: number | null
  total?: number
}

export type API = {
  onRowNameChange: (id: number, rowName: string) => void
  onSalaryChange: (id: number, salary: number) => void
  onEquipmentCostsChange: (id: number, equipmentCosts: number) => void
  onOverheadsChange: (id: number, overheads: number) => void
  onEstimatedProfitChange: (id: number, estimatedProfit: number) => void
  setRowsTree: (rowsData: IOutlayRowState[]) => void
  deleteOutlayRow: (id: number) => void
  createOutlayRow: (parentId: number | null) => void
  updateOutlayRow: (id: number, rowData: IOutlayRowState) => void
}

export type Actions =
  | { type: typeof CHANGE_ROW_NAME; payload: { id: number; rowName: string } }
  | { type: typeof CHANGE_SALARY; payload: { id: number; salary: number } }
  | {
      type: typeof CHANGE_EQUIP_COSTS
      payload: { id: number; equipmentCosts: number }
    }
  | {
      type: typeof CHANGE_OVERHEADS
      payload: { id: number; overheads: number }
    }
  | {
      type: typeof CHANGE_EST_PROFIT
      payload: { id: number; estimatedProfit: number }
    }
  | {
      type: typeof SET_OUTLAY_ROWS
      payload: IOutlayRowState[]
    }
  | {
      type: typeof DELETE_OUTLAY_ROW
      payload: { id: number }
    }
  | {
      type: typeof CREATE_OUTLAY_ROW
      payload: { parentId: number | null }
    }
  | {
      type: typeof UPDATE_OUTLAY_ROW
      payload: { id: number; rowData: IOutlayRowState }
    }
