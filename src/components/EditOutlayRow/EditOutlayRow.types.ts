import React from 'react'
import { Row } from '../ProjectTable/ProjectTable.types'

export type EditOutlayRowProps = {
  rowData: Row
  inputRef: React.Ref<HTMLInputElement>
  setFocus: () => void
}
