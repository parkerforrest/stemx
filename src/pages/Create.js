import { useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useAuth } from '@clerk/nextjs'

const Create = () => {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState([])

  const { isSignedIn, sessionId, userId } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError(['Please fill out all fields'])
      return
    }

    console.log(title, rating, method)
    const { data, error } = await supabase
      .from('smoothies')
      .select()
      .eq('userId', userId)

    if (error) {
      console.log(error)
      setFormError(['Please fill out all fields'])
    }

    if (data) {
      console.log(data)
      setFormError(null)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="method">Method</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button type="submit">Submit</button>

        {formError && <p>{formError}</p>}
      </form>
    </div>
  )
}

export default Create
