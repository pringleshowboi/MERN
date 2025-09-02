import { Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <h1 className='text-2xl font-bold text-primary font-mono tracking-tight'>
            My Notes
          </h1>
          <div className='flex items-center gap-4'>
            <Link to={"/create"} className='btn btn-primary btn-sm flex items-center'>
              Create Note
              <Plus className='ml-2 h-4 w-4' />
              <span className='sr-only'>Create Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
