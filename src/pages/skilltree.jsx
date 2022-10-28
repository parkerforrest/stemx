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
import Create from './Create'
import StudentCard from '@/components/StudentCard'
import Update from './Update'
import Read from './Read'

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
  // 'pi-aware': {
  //   optional: false,
  //   nodeState: 'selected',
  // },
  // 'ai-ml': {
  //   optional: false,
  //   nodeState: 'selected',
  // },
}

function handleSave(storage, treeId, skills) {
  return storage.setItem(`skills-${treeId}`, JSON.stringify(skills))
}

function useSkillTreeState() {
  const { userId } = useAuth()
  const [data, setData] = useState([])
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
    }
    getSmoothie()
  }, [userId])

  return data.reduce((acc, item) => {
    acc[item.nodeName] = {
      optional: false,
      nodeState: item.nodeState ? 'selected' : 'not-selected',
    }
    return acc
  }, {})
}

export default function SkillTreePage() {
  const { isSignedIn, sessionId, userId } = useAuth()
  console.log(isSignedIn, sessionId, userId)

  const [helloWorld, setHelloWorld] = useState()
  const [piAware, setPiAware] = useState()
  const [takPlugins, setTakPlugins] = useState()

  useEffect(() => {
    async function fetchUserSkills() {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('userId', userId)

      if (error) {
        console.log('error', error)
      }

      if (data) {
        setHelloWorld(data.title)
        setPiAware(data.method)
        setTakPlugins(data.rating)
      }
    }
    fetchUserSkills()
  }, [userId])

  console.log(helloWorld, piAware, takPlugins)

  const addData = async () => {
    const { data, error } = await supabase
      .from('users')
      .insert([{ userId }, { helloWorld }])

    console.log(error)
  }

  const { getToken } = useAuth()
  const savedTree = useSkillTreeState()

  // Defining User Skill Tree node status using NetNinja example
  const [fetchError, setFetchError] = useState(null)
  const [tree, setTree] = useState(null)

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
              savedData={savedTree}
            />
          )}
        </SkillTreeGroup>
      </SkillProvider>
      <button type="button" onClick={addData}>
        Fetch data
      </button>
      <p>top node is {helloWorld}</p>
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
      <Read />
      <Create />
      <Update />
    </>
  )
}
