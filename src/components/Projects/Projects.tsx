import React from 'react'
import cn from 'classnames'
import { PropsWithClassname } from '../types/commonTypes.types'
import collapseSVG from '../../assets/img/collapseIcon.svg'
import projectSVG from '../../assets/img/projectItem.svg'
import styles from './Projects.style.module.sass'

export function Projects({ className }: PropsWithClassname) {
  return (
    <div className={cn(styles.root, className)}>
      <div className={styles.newProject}>
        <div>
          <p className={styles.projectName}>Название проекта</p>
          <p className={styles.acronym}>Аббревиатура</p>
        </div>
        <img className={styles.collapseIcon} src={collapseSVG} alt="collapse" />
      </div>
      <ul className={styles.projectList}>
        <li>
          <img src={projectSVG} alt="project icon" />
          По проекту
        </li>
        <li className={styles.active}>
          <img src={projectSVG} alt="project icon" />
          СМР
        </li>
      </ul>
    </div>
  )
}
