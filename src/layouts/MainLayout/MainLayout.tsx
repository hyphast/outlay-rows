import React, { PropsWithChildren } from 'react'
import { Tabs } from '../../components/Tabs'
import { Header } from '../../components/Header'
import { Projects } from '../../components/Projects'
import styles from './MainLayout.style.module.sass'

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.root}>
      <Header className={styles.header} />
      <Projects className={styles.projects} />
      <Tabs className={styles.tabs} />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
