import { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { useAuth } from '@clerk/nextjs'

const useSavedData = function useSavedData() {
  const { userId } = useAuth()
  const [data, setData] = useState([])
  useEffect(() => {
    const getSmoothie = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('userId', userId)

      if (error) {
        console.log(error)
      }
      setData(data)
    }
    getSmoothie()
  }, [userId])

  /*
  Id | UserId | NodeName    | NodeState
  1  | A      | hello-world | selected
  2  | A      | pi-aware    | not selected
  */

  return data.reduce((acc, item) => {
    acc[item.title] = {
      optional: false,
      noteState: 'selected',
    }
    return acc
  }, {})
}

const Read = () => {
  const savedState = useSavedData()
  return <>{JSON.stringify(savedState, null, '  ')}</>
}

export default Read
