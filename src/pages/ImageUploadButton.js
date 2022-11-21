import { useParams } from 'react-router-dom'
import supabase from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

import styled, { keyframes } from 'styled-components'
import Link from 'next/link'

const pulse = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Button = styled.button`
  background-color: #4caf50; /* Green */
  margin: 1em;
  padding: 0.25em 1em;
  border: 3px solid blue;
  border-radius: 10px;
  animation: ${pulse} 750ms infinite alternate;
`

const NiceButton = styled.button`
  background-color: #4caf50; /* Green */
  margin: 1em;
  padding: 0.25em 1em;
  border: 3px solid blue;
  border-radius: 10px;
`

function useSkillTreeState() {
  const { userId } = useAuth()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getSmoothie = async () => {
      const { data, error } = await supabase
        .from('btptree')
        .select()
        .eq('userId', userId)

      if (error) {
        console.log(error)
      } else {
        setData(data)
        console.log(data)
      }
      setLoading(false)
    }
    getSmoothie()
  }, [userId])

  const savedData = data.reduce((acc, item) => {
    acc[item.nodeName] = {
      optional: false,
      nodeState: item.nodeState ? 'selected' : 'not-selected',
    }
    return acc
  }, {})
  return {
    savedData,
    loading,
  }
}

const NodeToggleButton = (props) => {
  const [nodeName, setNodeName] = useState('')
  const [nodeState, setNodeState] = useState(false)

  const { isSignedIn, sessionId, userId } = useAuth()

  const { savedData, loading } = useSkillTreeState()

  const badge = (props) => {
    if (props.title === 'PiAware') {
      return 'pi-aware'
    }
    if (props.title === 'TAK Plugins') {
      return 'tak-plugins'
    }
    if (props.title === 'AI/ML Computer Vision') {
      return 'ai-ml'
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    nodeName = badge(props)
    console.log(badge(props))
    nodeState = true

    const { data, error } = await supabase
      .from('btptree')
      .insert({ userId, nodeName, nodeState })

    if (error) {
      console.log(error)
    }

    if (data) {
      console.log(data)
    }

    window.location.href = '/skilltree'
  }

  return (
    <div>
      {savedData[badge(props)]?.nodeState === 'selected' ? (
        <Link href="/skilltree">
          <NiceButton>
            Nice! You have already unlocked your {props.title} Badge!
          </NiceButton>
        </Link>
      ) : (
        <Button onClick={handleSubmit}>
          Click here to unlock your {props.title} Badge!
        </Button>
      )}
    </div>
  )
}

export default NodeToggleButton
