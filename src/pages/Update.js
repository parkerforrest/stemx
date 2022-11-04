import { useParams } from 'react-router-dom'
import supabase from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

const Update = () => {
  const { id } = useParams()

  const [nodeName, setNodeName] = useState('')
  const [nodeState, setNodeState] = useState(false)

  const { isSignedIn, sessionId, userId } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from('btptree')
      .insert({ userId, nodeName, nodeState })

    if (error) {
      console.log(error)
    }

    if (data) {
      console.log('hello there')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Node Name</label>
        <input
          type="text"
          id="title"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
        />
        <label htmlFor="method">Node State</label>
        <input
          type="checkbox"
          id="method"
          checked={nodeState}
          onChange={(e) => setNodeState(e.target.value)}
        />

        <button type="submit">Update Tree</button>

        {/* {formError && <p>{formError}</p>} */}
      </form>
    </div>
  )
}

export default Update
