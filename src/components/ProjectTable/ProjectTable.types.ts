import { IOutlayRowState } from '../../app-context/app-context.types'

export type TableCols = {
  name: string
}
export type Row = Omit<IOutlayRowState & { lvl: number }, 'child'>
