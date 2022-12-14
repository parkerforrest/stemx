import Head from 'next/head'
import { slugifyWithCounter } from '@sindresorhus/slugify'

import { Layout } from '@/components/Layout'

import 'focus-visible'
import '@/styles/tailwind.css'


import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, RedirectToSignUp, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import {useEffect} from "react";
import Router from 'next/router';

import {AnalyticsProvider} from '../components/analytics';

import supabase from '../lib/supabaseClient'


const publicPages = [];

function getNodeText(node) {
  let text = ''
  for (let child of node.children ?? []) {
    if (typeof child === 'string') {
      text += child
    }
    text += getNodeText(child)
  }
  return text
}

function collectHeadings(nodes, slugify = slugifyWithCounter()) {
  let sections = []

  for (let node of nodes) {
    if (node.name === 'h2' || node.name === 'h3') {
      let title = getNodeText(node)
      if (title) {
        let id = slugify(title)
        node.attributes.id = id
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error(
              'Cannot add `h3` to table of contents without a preceding `h2`'
            )
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          })
        } else {
          sections.push({ ...node.attributes, title, children: [] })
        }
      }
    }

    sections.push(...collectHeadings(node.children ?? [], slugify))
  }

  return sections
}

export default function App({ Component, pageProps }) {
  let title = pageProps.markdoc?.frontmatter.title

  let pageTitle =
    pageProps.markdoc?.frontmatter.pageTitle ||
    `${pageProps.markdoc?.frontmatter.title} - Docs`

  let description = pageProps.markdoc?.frontmatter.description

  let tableOfContents = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);

  // Added below for supabase integration
  // const { getToken } = useAuth()

  // const fetchData = async () => {
  //   // TODO #1: Replace with your JWT template name
  //   const token = await getToken({ template: 'supabase' })

  //   supabase.auth.setAuth(token)

  //   // TODO #2: Replace with your database table name
  //   const { data, error } = await supabase.from('your_table').select()

  //   // TODO #3: Handle the response
  // }


  return (

    
     <ClerkProvider {...pageProps}>
      <AnalyticsProvider writeKey="kEjpLqjXfqMMjsP9SyFlUs47MXeYAFgw">
      <Head>
        
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}


        
      </Head>
      <SignedIn>
        <Layout title={title} tableOfContents={tableOfContents}>
          <Component {...pageProps} />
        </Layout>
       
        
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      </AnalyticsProvider>
    </ClerkProvider>
  )
  }