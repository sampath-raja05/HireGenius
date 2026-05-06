import React from 'react'

export const dynamic = 'force-dynamic';

const MainLayout = ({ children }) => {
  return <div className='flex flex-col min-h-screen'>{children}</div>
}

export default MainLayout