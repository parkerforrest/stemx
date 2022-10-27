import {
  SkillTreeGroup,
  SkillTree,
  SkillProvider,
  SkillType,
  SkillGroupDataType,
  SavedDataType,
} from 'beautiful-skill-tree'
import { useAuth } from '@clerk/nextjs'
import supabase from '../lib/supabaseClient'
import TodoList from '../components/TodoList'

import axios from 'axios'

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

const savedData = {
  'hello-world': {
    optional: false,
    nodeState: 'selected',
  },
  'pi-aware': {
    optional: false,
    nodeState: 'selected',
  },
  'ai-ml': {
    optional: false,
    nodeState: 'selected',
  },
}

function handleSave(storage, treeId, skills) {
  return storage.setItem(`skills-${treeId}`, JSON.stringify(skills))
}

export default function SkillTreePage() {
  const userID = axios.get('/api/user').then((response) => {
    console.log(response.data)
  })

  const { getToken } = useAuth()

  const fetchData = async () => {
    // TODO #1: Replace with your JWT template name
    const token = await getToken({ template: 'supabase' })

    supabase.auth.setSession(token)

    // TODO #2: Replace with your database table name
    const { data, error } = await supabase.from('skilltree').select()

    console.log(data)
    console.log(error)

    // TODO #3: Handle the response
  }

  // Defining User Skill Tree node status
  const [fetchError, setFetchError] = useState(null)
  const [tree, setTree] = useState(null)

  useEffect(() => {
    const fetchUserTreeState = async () => {
      const { data, error } = await supabase.from('skilltree').select()

      if (error) {
        setFetchError('Could not fetch user skill tree.')
        console.log(error)
        setTree(null)
      }
      if (data) {
        setTree(data)
        setFetchError(null)
      }
    }
    fetchUserTreeState()
    console.log('user tree fetched')
  }, [])

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
              handleSave={handleSave}
              savedData={savedData}
            />
          )}
        </SkillTreeGroup>
      </SkillProvider>
      <button type="button" onClick={fetchData}>
        Fetch data
      </button>
      <div>
        {fetchError && <p>{fetchError}</p>}
        {tree && (
          <div>
            {tree.map((user) => (
              // eslint-disable-next-line react/jsx-key
              <p>{user.title}</p>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
