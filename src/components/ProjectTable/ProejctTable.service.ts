import { IOutlayRowState } from '../../app-context/app-context.types'
import { Row } from './ProjectTable.types'

export function treeToFlat(state: IOutlayRowState[], lvl: number) {
  let res: Row[] = []
  state.forEach((item) => {
    const { child, ...rest } = item

    res = res.concat({ ...rest, lvl })

    if (item.child && item.child.length > 0) {
      res = res.concat(treeToFlat(item.child, lvl + 1))
    }
  })
  return res
}
