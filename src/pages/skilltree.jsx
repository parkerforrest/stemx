import { SkillTreeGroup, SkillTree, SkillProvider } from 'beautiful-skill-tree'
import { useAuth, useUser } from '@clerk/nextjs'
import supabase from '../lib/supabaseClient'
import Update from './Update'

import { useEffect, useState } from 'react'

const data = [
  {
    id: 'hello-world',
    title: 'Create STEMx Account',
    tooltip: {
      content: 'Unlock this badge by creating an account on STEMx',
    },
    children: [
      {
        id: 'pi-aware',
        title: 'Pi-Aware',
        tooltip: {
          content: 'Unlock this badge by completing the Pi-Aware tutorial',
        },
        children: [
          {
            id: 'pi-aware-one',
            title: 'PiAware Ninja',
            tooltip: {
              content:
                'Unlock this badge by sending a message from your PiAware kit',
            },
            children: [],
          },
        ],
      },
      {
        id: 'tak-plugins',
        title: 'TAK Plugins',
        tooltip: {
          content: 'Unlock this badge by completing the TAK Plugins tutorial',
        },
        children: [
          {
            id: 'tak-plugins-one',
            title: 'Joined TAK Server',
            tooltip: {
              content: 'Unlock this badge by joining the STEMx TAK Server',
            },
            children: [],
          },
        ],
      },
      {
        id: 'ai-ml',
        title: 'AI/ML',
        tooltip: {
          content: 'Unlock this badge by completing the AI/ML tutorial',
        },
        children: [
          {
            id: 'ai-ml-one',
            title: 'Labeled data',
            tooltip: {
              content:
                'Unlock this badge by labeling data for your AI/ML project',
            },
            children: [],
          },
        ],
      },
    ],
  },
]

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

export default function SkillTreePage() {
  const { savedData, loading } = useSkillTreeState()

  const { isLoaded, isSignedIn, user } = useUser()

  if (loading) {
    return <>Loading Skills...</>
  }

  return (
    <>
      <SkillProvider>
        <SkillTreeGroup>
          {({ skillCount }) => (
            <SkillTree
              treeId="first-tree"
              // title is user's name plus skill tree
              title={`${user.firstName}'s Skill Tree`}
              data={data}
              collapsible
              description="My first skill tree"
              savedData={savedData}
            />
          )}
        </SkillTreeGroup>
      </SkillProvider>

      {/* Add this update component if you want to manually toggle nodes from UI <Update /> */}
    </>
  )
}
