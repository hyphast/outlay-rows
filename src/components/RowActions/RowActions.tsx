import React, { useState } from 'react'
import cn from 'classnames'
import fileSVG from '../../assets/img/file.svg'
import folder1SVG from '../../assets/img/folder1.svg'
import folder2SVG from '../../assets/img/folder2.svg'
import trashSVG from '../../assets/img/trash.svg'
import { useRowStateAPI } from '../../app-context/app-context'
import { TreeStructure } from './TreeStructure'
import { OutlayRowsAPI } from '../../API/api'
import { RowActionsProps } from './RowActions.types'
import styles from './RowActions.style.module.sass'

export function RowActions({ rowData, editMode }: RowActionsProps) {
  const [isActionsVisible, setIsActionsVisible] = useState(false)

  const { lvl } = rowData

  const { deleteOutlayRow, createOutlayRow, updateOutlayRow } = useRowStateAPI()

  const onDeleteRow = async () => {
    try {
      if (!rowData.isLocal) {
        const data = await OutlayRowsAPI.deleteRow(rowData.id)
        data.changed.forEach((i) => updateOutlayRow(i.id, i))
      }
      deleteOutlayRow(rowData.id)
    } catch (e) {
      console.log(e)
    }
  }

  const onClickFolder1 = () => {
    if (!editMode) {
      createOutlayRow(null)
    }
  }

  const onClickFolder2 = () => {
    if (!editMode) {
      createOutlayRow(rowData.id)
    }
  }

  return (
    <div className={styles.root}>
      <div
        onMouseLeave={() => {
          setIsActionsVisible(false)
        }}
        className={cn(styles.back, {
          [styles.background]: isActionsVisible,
        })}
      >
        <div
          className={cn(styles.actions, {
            [styles.firstLayout]: lvl < 3,
            [styles.secondLayout]: lvl >= 3,
          })}
        >
          <TreeStructure isActionsVisible={isActionsVisible} lvl={lvl} />
          <button
            type="button"
            onClick={onClickFolder1}
            className={cn(
              {
                [styles.hideAction]: lvl > 1,
              },
              styles.folder1
            )}
            onMouseEnter={() => {
              setIsActionsVisible(true)
            }}
          >
            <img src={folder1SVG} alt="row icon" />
          </button>
          <button
            type="button"
            onClick={onClickFolder2}
            className={cn(
              {
                [styles.hideAction]:
                  ((lvl < 2 || lvl > 2) && !isActionsVisible) ||
                  (lvl > 2 && isActionsVisible),
              },
              styles.folder2
            )}
            onMouseEnter={() => {
              setIsActionsVisible(true)
            }}
          >
            <img src={folder2SVG} alt="row icon" />
          </button>
          <button
            type="button"
            className={cn(
              {
                [styles.hideAction]: lvl < 3 && !isActionsVisible,
              },
              styles.file
            )}
            onMouseEnter={() => {
              setIsActionsVisible(true)
            }}
          >
            <img src={fileSVG} alt="row icon" />
          </button>
          <button
            type="button"
            className={cn(
              {
                [styles.hideAction]: !isActionsVisible,
              },
              styles.trash
            )}
            onClick={onDeleteRow}
          >
            <img src={trashSVG} alt="row icon" />
          </button>
        </div>
      </div>
    </div>
  )
}
