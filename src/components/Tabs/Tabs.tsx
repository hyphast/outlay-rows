import React from 'react'
import cn from 'classnames'
import { PropsWithClassname } from '../types/commonTypes.types'
import styles from './Tabs.style.module.sass'

export function Tabs({ className }: PropsWithClassname) {
  return (
    <div className={cn(styles.root, className)}>
      <ul className={styles.tabs}>
        <li className={styles.tabItem}>Строительно-монтажные работы</li>
      </ul>
    </div>
  )
}
