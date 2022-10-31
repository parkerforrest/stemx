import { SkillTreeGroup, SkillTree, SkillProvider } from 'beautiful-skill-tree'
import { useAuth } from '@clerk/nextjs'
import supabase from '../lib/supabaseClient'
import Update from './Update'

import { useEffect, useState } from 'react'

const data = [
  {
    id: 'hello-world',
    title: 'Create STEMx Account',
    tooltip: {
      content:
        'This node is the top most level, and will be unlocked, and ready to be clicked.',
    },
    children: [
      {
        id: 'pi-aware',
        title: 'Pi-Aware',
        tooltip: {
          content:
            'This is a parent of the top node, and will locked while the parent isn’t in a selected state.',
        },
        children: [
          {
            id: 'pi-aware-one',
            title: 'Ordered PiAware Kit',
            tooltip: {
              content:
                'This is the child of ‘Hello World and the sibling of ‘Hello Sun’. Notice how the app takes care of the layout automatically? That’s why this is called Beautiful Skill Tree and not just ‘Skill Tree’. (Also the npm namespace had already been taken for the latter so (flick hair emoji).',
            },
            children: [],
          },
        ],
      },
      {
        id: 'tak-plugins',
        title: 'TAK Plugins',
        tooltip: {
          content:
            'This is the child of ‘Hello World and the sibling of ‘Hello Sun’. Notice how the app takes care of the layout automatically? That’s why this is called Beautiful Skill Tree and not just ‘Skill Tree’. (Also the npm namespace had already been taken for the latter so (flick hair emoji).',
        },
        children: [
          {
            id: 'tak-plugins-one',
            title: 'Joined TAK Server',
            tooltip: {
              content:
                'This is the child of ‘Hello World and the sibling of ‘Hello Sun’. Notice how the app takes care of the layout automatically? That’s why this is called Beautiful Skill Tree and not just ‘Skill Tree’. (Also the npm namespace had already been taken for the latter so (flick hair emoji).',
            },
            children: [],
          },
        ],
      },
      {
        id: 'ai-ml',
        title: 'AI/ML',
        tooltip: {
          content:
            'This is the child of ‘Hello World and the sibling of ‘Hello Sun’. Notice how the app takes care of the layout automatically? That’s why this is called Beautiful Skill Tree and not just ‘Skill Tree’. (Also the npm namespace had already been taken for the latter so (flick hair emoji).',
        },
        children: [
          {
            id: 'ai-ml-one',
            title: 'Labeled data',
            tooltip: {
              content:
                'This is the child of ‘Hello World and the sibling of ‘Hello Sun’. Notice how the app takes care of the layout automatically? That’s why this is called Beautiful Skill Tree and not just ‘Skill Tree’. (Also the npm namespace had already been taken for the latter so (flick hair emoji).',
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

export default function SkillTreePage() {
  const { savedData, loading } = useSkillTreeState()

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
              title="Skill Tree"
              data={data}
              collapsible
              description="My first skill tree"
              savedData={savedData}
            />
          )}
        </SkillTreeGroup>
      </SkillProvider>

      <Update />
    </>
  )
}
