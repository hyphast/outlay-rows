import React from 'react'
import { MainLayout } from './layouts/MainLayout'
import { ProjectData } from './pages/ProjectData'

function App() {
  return (
    <div className="appContainer">
      <MainLayout>
        <ProjectData />
      </MainLayout>
    </div>
  )
}

export default App
