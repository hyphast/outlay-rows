import React from 'react'
import cn from 'classnames'
import { PropsWithClassname } from '../types/commonTypes.types'
import moreSVG from '../../assets/img/moreIcon.svg'
import undoSVG from '../../assets/img/undoIcon.svg'
import styles from './Header.style.module.sass'

export function Header({ className }: PropsWithClassname) {
  return (
    <header className={cn(styles.root, className)}>
      <img className={styles.icon} src={moreSVG} alt="show more" />
      <img
        className={cn(styles.undoIcon, styles.icon)}
        src={undoSVG}
        alt="undo"
      />
      <ul className={styles.menu}>
        <li className={styles.active}>Просмотр</li>
        <li>Управление</li>
      </ul>
    </header>
  )
}

Header.defaultProps = {
  className: '',
}
