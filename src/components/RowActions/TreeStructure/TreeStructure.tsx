import React from 'react'
import { TreeStructureProps } from './TreeStructure.types'
import styles from './TreeStructure.style.module.sass'

export function TreeStructure({ lvl }: TreeStructureProps) {
  return (
    <>
      {lvl > 1 && (
        <div className={styles.root}>
          {lvl >= 3 && <span className={styles.straightLine} />}
          <span className={styles.topLine} />
          <span className={styles.leftLine} />
        </div>
      )}
    </>
  )
}
