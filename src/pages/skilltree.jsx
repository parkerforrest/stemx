import {
    SkillTreeGroup,
    SkillTree,
    SkillProvider,
    SkillType,
    SkillGroupDataType
  } from 'beautiful-skill-tree';
  import { useAuth } from '@clerk/nextjs'
import supabase from '../lib/supabaseClient'


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
              }
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
              }
          ],
        },
        {
            id: 'ai-ml',
            title: 'AI/ML',
            tooltip: {
              content:
                'This is the child of ‘Hello World and the sibling of ‘Hello Sun’. Notice how the app takes care of the layout automatically? That’s why this is called Beautiful Skill Tree and not just ‘Skill Tree’. (Also the npm namespace had already been taken for the latter so (flick hair emoji).',
            },
            children: [{
                id: 'ai-ml-1',
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
  ];

  export default function SkillTreePage(){

    const { getToken } = useAuth()

    const fetchData = async () => {
      // TODO #1: Replace with your JWT template name
      const token = await getToken({ template: 'supabase' })
  
      supabase.auth.setSession(token)
  
      // TODO #2: Replace with your database table name
      const { data, error } = await supabase.from('skilltree').select()

      console.log(data);
      console.log(error);
  
      // TODO #3: Handle the response
    }

return <><SkillProvider>
    <SkillTreeGroup>
        {({ skillCount }) => (
            <SkillTree
                treeId="first-tree"
                title="Skill Tree"
                data={data}
                collapsible
                description="My first skill tree" />
        )}
    </SkillTreeGroup>
</SkillProvider><button type="button" onClick={fetchData}>
        Fetch data
    </button></>

    }