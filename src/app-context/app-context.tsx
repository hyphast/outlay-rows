import React, {
  createContext,
  useReducer,
  useMemo,
  useContext,
  PropsWithChildren,
} from 'react'
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
import { Actions, API, IOutlayRowState } from './app-context.types'

export const initialState: IOutlayRowState[] = [
  {
    id: Date.now(),
    rowName: '',
    salary: 0,
    equipmentCosts: 0,
    overheads: 0,
    estimatedProfit: 0,
    child: [],
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    supportCosts: 0,
    isLocal: true,
  },
]

export enum ActionRowType {
  UPDATE_ROW_PROPERTY = 'update_row_property',
  UPDATE_ROW = 'update_row',
  CREATE_ROW = 'create_row',
}
export function nextImmutableState(
  id: number,
  payload: any,
  state: IOutlayRowState[],
  type: ActionRowType
): IOutlayRowState[] {
  return state.map((item) => {
    if (item.child && item.child.length > 0) {
      item.child = nextImmutableState(id, payload, item.child, type)
    }
    if (item.id === id) {
      switch (type) {
        case ActionRowType.UPDATE_ROW_PROPERTY:
          return { ...item, ...payload }
        case ActionRowType.UPDATE_ROW:
          return { ...payload, child: item.child }
        case ActionRowType.CREATE_ROW:
          if (item.child) {
            return {
              ...item,
              child: [
                ...item.child,
                { ...payload, id: Date.now(), parentId: id },
              ],
            }
          }
          break
        default:
          return {}
      }
    }
    return item
  })
}

export function delOutlayRow(
  id: number,
  state: IOutlayRowState[]
): IOutlayRowState[] {
  return state.filter((item) => {
    if (item.child && item.child.length > 0) {
      item.child = delOutlayRow(id, item.child)
    }
    return item.id === id ? 0 : 1
  })
}

const RowStateContext = createContext<IOutlayRowState[]>(initialState)
const RowStateAPIContext = createContext<API>({} as API)

const reducer = (
  state: IOutlayRowState[],
  action: Actions
): IOutlayRowState[] => {
  switch (action.type) {
    case CHANGE_ROW_NAME:
    case CHANGE_SALARY:
    case CHANGE_EQUIP_COSTS:
    case CHANGE_OVERHEADS:
    case CHANGE_EST_PROFIT: {
      return nextImmutableState(
        action.payload.id,
        action.payload,
        state,
        ActionRowType.UPDATE_ROW_PROPERTY
      )
    }
    case SET_OUTLAY_ROWS: {
      return [...action.payload]
    }
    case DELETE_OUTLAY_ROW: {
      return delOutlayRow(action.payload.id, state)
    }
    case CREATE_OUTLAY_ROW: {
      if (action.payload.parentId === null) {
        return [
          ...state,
          { ...initialState[0], id: Date.now(), parentId: null },
        ]
      }
      return nextImmutableState(
        action.payload.parentId,
        initialState[0],
        state,
        ActionRowType.CREATE_ROW
      )
      // return createOutlayRow(action.payload.parentId)
    }
    case UPDATE_OUTLAY_ROW: {
      return nextImmutableState(
        action.payload.id,
        action.payload.rowData,
        state,
        ActionRowType.UPDATE_ROW
      )
    }
    default:
      return state
  }
}

export function DataProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const api = useMemo(() => {
    const onRowNameChange = (id: number, rowName: string) => {
      dispatch({ type: CHANGE_ROW_NAME, payload: { id, rowName } })
    }
    const onSalaryChange = (id: number, salary: number) => {
      dispatch({ type: CHANGE_SALARY, payload: { id, salary } })
    }
    const onEquipmentCostsChange = (id: number, equipmentCosts: number) => {
      dispatch({ type: CHANGE_EQUIP_COSTS, payload: { id, equipmentCosts } })
    }
    const onOverheadsChange = (id: number, overheads: number) => {
      dispatch({ type: CHANGE_OVERHEADS, payload: { id, overheads } })
    }
    const onEstimatedProfitChange = (id: number, estimatedProfit: number) => {
      dispatch({ type: CHANGE_EST_PROFIT, payload: { id, estimatedProfit } })
    }

    const setRowsTree = (rowsData: IOutlayRowState[]) => {
      dispatch({ type: SET_OUTLAY_ROWS, payload: [...rowsData] })
    }
    const deleteOutlayRow = (id: number) => {
      dispatch({ type: DELETE_OUTLAY_ROW, payload: { id } })
    }
    const createOutlayRow = (parentId: number | null) => {
      dispatch({ type: CREATE_OUTLAY_ROW, payload: { parentId } })
    }
    const updateOutlayRow = (id: number, rowData: IOutlayRowState) => {
      dispatch({ type: UPDATE_OUTLAY_ROW, payload: { id, rowData } })
    }

    return {
      onRowNameChange,
      onSalaryChange,
      onEquipmentCostsChange,
      onOverheadsChange,
      onEstimatedProfitChange,
      setRowsTree,
      deleteOutlayRow,
      createOutlayRow,
      updateOutlayRow,
    }
  }, [])

  return (
    <RowStateAPIContext.Provider value={api}>
      <RowStateContext.Provider value={state}>
        {children}
      </RowStateContext.Provider>
    </RowStateAPIContext.Provider>
  )
}

export const useRowStateAPI = () => useContext(RowStateAPIContext)
export const useRowState = () => useContext(RowStateContext)
