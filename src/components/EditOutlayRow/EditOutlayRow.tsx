import React, { useEffect } from 'react'
import { useRowStateAPI } from '../../app-context/app-context'
import { EditOutlayRowProps } from './EditOutlayRow.types'
import styles from './EditOutlayRow.style.module.sass'

export function EditOutlayRow({
  rowData,
  inputRef,
  setFocus,
}: EditOutlayRowProps) {
  useEffect(() => {
    setFocus()
  }, [])

  const {
    onRowNameChange,
    onSalaryChange,
    onEquipmentCostsChange,
    onOverheadsChange,
    onEstimatedProfitChange,
  } = useRowStateAPI()

  const onChangeRowName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onRowNameChange(rowData.id, e.target.value)
  }
  const onChangeSalary = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onSalaryChange(rowData.id, Number(e.target.value))
  }
  const onChangeEquipCosts = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onEquipmentCostsChange(rowData.id, Number(e.target.value))
  }
  const onChangeOverheads = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onOverheadsChange(rowData.id, Number(e.target.value))
  }
  const onChangeEstProfit = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onEstimatedProfitChange(rowData.id, Number(e.target.value))
  }

  return (
    <>
      <td>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder={rowData.rowName}
          value={rowData.rowName}
          onChange={onChangeRowName}
          type="text"
        />
      </td>
      <td>
        <input
          className={styles.input}
          placeholder={rowData.salary.toString()}
          value={rowData.salary}
          onChange={onChangeSalary}
          type="number"
        />
      </td>
      <td>
        <input
          className={styles.input}
          placeholder={rowData.equipmentCosts.toString()}
          value={rowData.equipmentCosts}
          onChange={onChangeEquipCosts}
          type="number"
        />
      </td>
      <td>
        <input
          className={styles.input}
          placeholder={rowData.overheads.toString()}
          value={rowData.overheads}
          onChange={onChangeOverheads}
          type="number"
        />
      </td>
      <td>
        <input
          className={styles.input}
          placeholder={rowData.estimatedProfit.toString()}
          value={rowData.estimatedProfit}
          onChange={onChangeEstProfit}
          type="number"
        />
      </td>
    </>
  )
}
