import React, { useEffect } from 'react'
import { TableCols } from './ProjectTable.types'
import { OutlayRow } from '../OutlayRow'
import { useRowState, useRowStateAPI } from '../../app-context/app-context'
import { OutlayRowsAPI } from '../../API/api'
import { treeToFlat } from './ProejctTable.service'
import styles from './ProjectTable.style.module.sass'

const tableCols: TableCols[] = [
  {
    name: 'Уровень',
  },
  {
    name: 'Наименование работ',
  },
  {
    name: 'Основная з/п',
  },
  {
    name: 'Оборудование',
  },
  {
    name: 'Накладные расходы',
  },
  {
    name: 'Сметная прибыль',
  },
]

export function ProjectTable() {
  const state = useRowState()
  const rowsData = treeToFlat(state, 1)

  const { setRowsTree, createOutlayRow } = useRowStateAPI()

  useEffect(() => {
    ;(async function () {
      try {
        const data = await OutlayRowsAPI.getTreeRows()

        setRowsTree(data)

        if (data.length === 0) {
          createOutlayRow(null)
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <thead>
          <tr>
            {tableCols.map((col, i) => (
              <th key={i}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsData.map((row) => {
            return <OutlayRow key={row.id} rowData={row} />
          })}
        </tbody>
      </table>
    </div>
  )
}
