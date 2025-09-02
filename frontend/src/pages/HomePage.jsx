import { useEffect, useState } from 'react'
import React from 'react'
import Navbar from '../components/Navbar'
import api from '../lib/axios'
import RateLimitUI from '../components/RateLimitUI'
import NoteCard from '../components/NoteCard' // import

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        setNotes(res.data)
        console.log(res.data)
        setIsRateLimited(false)
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true)
        }
        console.error("Error fetching notes:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitUI onRetry={() => window.location.reload()} />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading ? (
          <div className='text-center text-primary py-10'>Loading notes...</div>
        ) : (
          <>
            {notes.length > 0 && !isRateLimited ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
            ) : (
              <div className='text-center text-base-content/70 py-10'>
                No notes available.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
