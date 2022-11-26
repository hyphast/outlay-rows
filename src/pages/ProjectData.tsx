import React from 'react'
import { ProjectTable } from '../components/ProjectTable'
import { DataProvider } from '../app-context/app-context'

export function ProjectData() {
  return (
    <DataProvider>
      <ProjectTable />
    </DataProvider>
  )
}
