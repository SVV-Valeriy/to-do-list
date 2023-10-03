import React from 'react'
import style from './App.module.css'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './components/homePage/homePage'
import { Header } from './components/header/header'
import { SeparateTask } from './components/separateTask/separateTask'

export const App = () => {
    return (
        <div className={style.container}>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:id" element={<SeparateTask />} />
            </Routes>
        </div>
    )
}
