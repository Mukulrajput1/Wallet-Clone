'use client'
import React from 'react'
import Navbar from '../components/navigation/Navbar'
import { ProvideContext, useContexter } from './contexter'
import { Toaster } from 'react-hot-toast'

function Layout({ children }) {

  return (
    <ProvideContext>
      <div>
        <Navbar></Navbar>
        {children}
        <div><Toaster
          position="bottom-center"
          reverseOrder={false}
        /></div>
      </div>
    </ProvideContext>
  )
}

export default Layout
