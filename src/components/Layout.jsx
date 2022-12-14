import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Image from 'next/image'

import { Hero } from '@/components/Hero'
import { Logo, Logomark } from '@/components/Logo'
import { MobileNavigation } from '@/components/MobileNavigation'
import { Navigation } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { Search } from '@/components/Search'
import { ThemeSelector } from '@/components/ThemeSelector'

import { SignedIn, SignedOut } from '@clerk/nextjs'
import { UserButton } from '@clerk/clerk-react'
import { useAuth } from '@clerk/nextjs'

import supabase from '../lib/supabaseClient'

import NodeToggleButton from '@/pages/NodeToggleButton'
import styled, { keyframes } from 'styled-components'

const alreadyUnlockedButton = styled.button`
  background-color: #4caf50; /* Green */
  margin: 1em;
  padding: 0.25em 1em;
  border: 3px solid blue;
  border-radius: 10px;
`

const navigation = [
  {
    title: 'Introduction',
    links: [{ title: 'Getting started', href: '/' }],
  },
  {
    title: 'Tutorials',
    links: [
      { title: 'PiAware', href: '/docs/pi-aware' },
      {
        title: 'TAK Server on Raspberry Pi',
        href: '/docs/tak-server-on-raspberry-pi',
      },
      { title: 'TAK Plugins', href: '/docs/tak-plugins' },
      { title: 'AI/ML Computer Vision', href: '/docs/ai-ml' },
      { title: 'Scholarship Challenge', href: '/docs/scholarship-challenge' },
    ],
  },
  {
    title: 'Events and STEM Kits',
    links: [
      {
        title: 'Search and Rescue with TAK',
        href: '/docs/search-and-rescue-with-tak',
      },
    ],
  },
  {
    title: 'Android Team Awareness Kit',
    links: [
      {
        title: 'Android Studio Setup',
        href: '/docs/android-studio-setup',
      },
      {
        title: 'Android Basics',
        href: '/docs/android-basics',
      },
      {
        title: 'TAK Overview',
        href: '/docs/tak-overview',
      },
      {
        title: 'TAK Install',
        href: '/docs/install-and-run-atak-civ',
      },
      {
        title: 'TAK Plugins',
        href: '/docs/develop-and-run-atak-plugins',
      },
    ],
  },
]

function GitHubIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  )
}

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

function Header({ navigation }) {
  let [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:bg-slate-900/95 dark:backdrop-blur sm:px-6 lg:px-8 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent'
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="relative flex flex-grow basis-0 items-center">
        <Link href="/" aria-label="Home page">
          {/* <Logomark className="h-9 w-9 lg:hidden" /> */}
          {/* <Logo className="hidden h-9 w-auto fill-slate-700 dark:fill-sky-100 lg:block" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100"
            height="100"
            viewBox="0 0 375 374.999991"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
          >
            <defs>
              <g />
              <clipPath id="7cf07a3705">
                <path
                  d="M 248 155.117188 L 359 155.117188 L 359 246.617188 L 248 246.617188 Z M 248 155.117188 "
                  clipRule="nonzero"
                />
              </clipPath>
            </defs>
            <g clipPath="url(#7cf07a3705)">
              <path
                fill="#ff1616"
                d="M 344.199219 155.21875 L 314.84375 191.449219 L 348.496094 218.90625 L 336.417969 218.554688 L 304.359375 192.5625 L 334.625 155.195312 Z M 347.105469 246.617188 L 305.371094 213.015625 L 290.238281 231.828125 L 280.585938 231.902344 L 304.234375 202.523438 L 358.980469 246.617188 Z M 260.679688 155.394531 L 293.042969 181.460938 L 314.238281 155.117188 L 323.738281 155.117188 L 294.152344 191.957031 L 248.476562 155.144531 Z M 249.539062 246.617188 L 284.402344 203.988281 L 251.988281 177.769531 L 263.914062 177.769531 L 294.910156 202.902344 L 259.515625 246.617188 Z M 249.539062 246.617188 "
                fillOpacity="1"
                fillRule="nonzero"
              />
            </g>
            <g fill="#ffffff" fillOpacity="1">
              <g transform="translate(6.023442, 247.617449)">
                <g>
                  <path d="M 52.960938 -69.492188 L -0.0976562 -69.492188 L -0.0976562 -47.121094 L 16.730469 -29.597656 L 17.226562 -29.597656 L 17.226562 -52.070312 L 52.960938 -52.070312 Z M 35.4375 -17.421875 L -0.0976562 -17.421875 L -0.0976562 0 L 52.960938 0 L 52.960938 -25.34375 L 36.332031 -39.003906 L 35.4375 -39.003906 Z M 35.4375 -17.421875 " />
                </g>
              </g>
            </g>
            <g fill="#ffffff" fillOpacity="1">
              <g transform="translate(61.951859, 247.617449)">
                <g>
                  <path d="M 17.324219 -51.972656 L 17.324219 -0.0976562 L 34.546875 -0.0976562 L 34.546875 -51.972656 L 51.871094 -51.972656 L 51.871094 -69.292969 L 0 -69.292969 L 0 -51.972656 Z M 17.324219 -51.972656 " />
                </g>
              </g>
            </g>
            <g fill="#ffffff" fillOpacity="1">
              <g transform="translate(116.791405, 247.617449)">
                <g>
                  <path d="M 51.179688 0 L 51.179688 -17.125 L 17.324219 -17.125 L 17.324219 -25.441406 L 45.238281 -25.441406 L 45.238281 -42.863281 L 17.324219 -42.863281 L 17.324219 -51.871094 L 51.179688 -51.871094 L 51.179688 -69.097656 L 0.0976562 -69.097656 L 0.0976562 -43.457031 L 8.710938 -36.332031 L 0.0976562 -25.441406 L 0.0976562 0 Z M 51.179688 0 " />
                </g>
              </g>
            </g>
            <g fill="#ffffff" fillOpacity="1">
              <g transform="translate(171.037015, 247.617449)">
                <g>
                  <path d="M 29.996094 -51.972656 L 29.996094 -0.0976562 L 47.320312 -0.0976562 L 47.320312 -51.972656 L 59.496094 -51.972656 L 59.496094 -0.0976562 L 77.511719 -0.0976562 L 77.511719 -69.292969 L 59.496094 -69.292969 L 47.320312 -54.445312 L 47.320312 -69.292969 L 29.996094 -69.292969 L 17.820312 -54.445312 L 17.820312 -69.292969 L 0 -69.292969 L 0 -0.0976562 L 17.820312 -0.0976562 L 17.820312 -51.972656 Z M 29.996094 -51.972656 " />
                </g>
              </g>
            </g>
          </svg>{' '}
        </Link>
      </div>
      <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
        <Search />
      </div>
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
        <ThemeSelector className="relative z-10" />
        <UserButton />
      </div>
    </header>
  )
}

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)

  let getHeadings = useCallback((tableOfContents) => {
    return tableOfContents
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        let el = document.getElementById(id)
        if (!el) return

        let style = window.getComputedStyle(el)
        let scrollMt = parseFloat(style.scrollMarginTop)

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        return { id, top }
      })
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0) return
    let headings = getHeadings(tableOfContents)
    function onScroll() {
      let top = window.scrollY
      let current = headings[0].id
      for (let heading of headings) {
        if (top >= heading.top) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [getHeadings, tableOfContents])

  return currentSection
}

export function Layout({ children, title, tableOfContents }) {
  let router = useRouter()
  let isHomePage = router.pathname === '/'
  let allLinks = navigation.flatMap((section) => section.links)
  let linkIndex = allLinks.findIndex((link) => link.href === router.pathname)
  let previousPage = allLinks[linkIndex - 1]
  let nextPage = allLinks[linkIndex + 1]
  let section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )
  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  const { savedData, loading } = useSkillTreeState()

  return (
    <>
      <Header navigation={navigation} />

      {isHomePage && <Hero />}

      <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />
          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5">
            <Navigation
              navigation={navigation}
              className="w-64 pr-8 xl:w-72 xl:pr-16"
            />
          </div>
        </div>

        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <article>
            {(title || section) && (
              <header className="mb-9 space-y-1">
                {section && (
                  <p className="font-display text-sm font-medium text-sky-500">
                    {section.title}
                  </p>
                )}
                {title && (
                  <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
          </article>
          {title === 'PiAware' && <NodeToggleButton title={title} />}
          {/* {title === 'TAK Plugins' && <NodeToggleButton title={title} />}
          {title === 'AI/ML Computer Vision' && (
            <NodeToggleButton title={title} />
          )} */}
          <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
            {previousPage && (
              <div>
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link
                    href={previousPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <span aria-hidden="true">&larr;</span> {previousPage.title}
                  </Link>
                </dd>
              </div>
            )}
            {nextPage && (
              <div className="ml-auto text-right">
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link
                    href={nextPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    {nextPage.title} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ol role="list" className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link
                          href={`#${section.id}`}
                          className={clsx(
                            isActive(section)
                              ? 'text-sky-500'
                              : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                          )}
                        >
                          {section.title}
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ol
                          role="list"
                          className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                        >
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link
                                href={`#${subSection.id}`}
                                className={
                                  isActive(subSection)
                                    ? 'text-sky-500'
                                    : 'hover:text-slate-600 dark:hover:text-slate-300'
                                }
                              >
                                {subSection.title}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}
