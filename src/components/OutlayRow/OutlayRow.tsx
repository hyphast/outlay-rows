import React, { useRef, useState } from 'react'
import { EditOutlayRow } from '../EditOutlayRow'
import { RowActions } from '../RowActions'
import { useRowStateAPI } from '../../app-context/app-context'
import { OutlayRowsAPI } from '../../API/api'
import { OutlayRowProps } from './OutlayRow.types'

export function OutlayRow({ rowData }: OutlayRowProps) {
  const [editMode, setEditMode] = useState(rowData.isLocal || false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { updateOutlayRow } = useRowStateAPI()

  const onClickEdit = () => {
    setEditMode(true)
  }
  const setFocus = () => {
    inputRef.current?.focus()
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === 'Enter' && editMode) {
      try {
        if (rowData.isLocal && rowData.parentId !== undefined) {
          const { parentId, lvl, total, isLocal, ...rest } = rowData

          const data = await OutlayRowsAPI.createRowInEntity({
            parentId,
            ...rest,
          })

          updateOutlayRow(rowData.id, data.current)
          data.changed.forEach((i) => updateOutlayRow(i.id, i))
        } else {
          const { parentId, lvl, total, isLocal: ed, ...rest } = rowData

          const data = await OutlayRowsAPI.updateRow(rowData.id, rest)
          data.changed.forEach((i) => updateOutlayRow(i.id, i))
        }
      } catch (err) {
        console.log(e)
      } finally {
        setEditMode(false)
      }
    }
  }

  return (
    <tr onDoubleClick={onClickEdit} onKeyDown={handleKeyDown}>
      <td>
        <RowActions rowData={rowData} editMode={editMode} />
      </td>
      {editMode ? (
        <EditOutlayRow
          inputRef={inputRef}
          setFocus={setFocus}
          rowData={rowData}
        />
      ) : (
        <>
          <td>{rowData.rowName}</td>
          <td>{rowData.salary}</td>
          <td>{rowData.equipmentCosts}</td>
          <td>{rowData.overheads}</td>
          <td>{rowData.estimatedProfit}</td>
        </>
      )}
    </tr>
  )
}
