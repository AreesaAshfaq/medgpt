import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import ThemeToggle from '@/components/ThemeToggle'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/utils/tailwind'
import {
  Bell,
  ChevronDownIcon,
  Menu,
  Settings,
  SquareStack,
  SearchIcon,
  User,
} from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

type Menu = {
  label?: string
  name: string
  icon: React.ReactNode
  submenu?: Submenu[]
  href: string
}

type Submenu = {
  name: string
  icon: React.ReactNode
  href: string
}

export function SidebarMenu() {
  const menus: Menu[] = [
    {
      label: '',
      name: 'Detect Stroke',
      icon: <SearchIcon className="mr-2" />,
      href: '/',
    },
    {
      label: '',
      name: 'AI Support',
      icon: <SquareStack className="mr-2" />,
      href: '/ai',
      submenu: [
        {
          name: 'Caregiver',
          href: '/ai/caregiver',
          icon: <></>,
        },
        {
          name: 'Rehabilitation',
          href: '/ai/rehabilitation',
          icon: <></>,
        },
        {
          name: 'Mental Health',
          href: '/ai/mental-health',
          icon: <></>,
        },
        {
          name: 'Chat Support',
          href: '/ai/chat-support',
          icon: <></>,
        },
      ],
    },
    {
      label: '',
      name: 'Reminders',
      icon: <Bell className="mr-2" />,
      href: '/reminders',
    },
    {
      label: '',
      name: 'Settings',
      icon: <Settings className="mr-2" />,
      href: '/settings',
    },
  ]

  const uniqueLabels = Array.from(new Set(menus.map((menu) => menu.label)))

  return (
    <ScrollArea className="h-screen rounded-md sm:w-full lg:w-64">
      <span className="flex h-24 w-full items-center justify-center bg-background text-3xl font-bold ">
        MedGPT
      </span>
      <div className="mt-5 space-y-4 sm:p-0 md:px-4">
        {uniqueLabels.map((label, index) => (
          <React.Fragment key={label}>
            {label && (
              <p
                className={`mx-4 mb-3 text-left text-lg font-bold tracking-wider text-slate-300 ${
                  index > 0 ? 'mt-10' : ''
                }`}
              >
                {label}
              </p>
            )}
            {menus
              .filter((menu) => menu.label === label)
              .map((menu) => (
                <React.Fragment key={menu.name}>
                  {menu.submenu && menu.submenu.length > 0 ? (
                    <Accordion
                      key={menu.name}
                      type="single"
                      className="mb-[-10px] mt-[-10px] p-0 font-normal"
                      collapsible
                    >
                      <AccordionItem
                        value="item-1"
                        className="m-0 p-0 font-normal"
                      >
                        <AccordionTrigger>
                          <a
                            key={menu.name}
                            className="my-2 flex h-10 w-full items-center justify-start rounded-md bg-background p-6 text-lg font-normal hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background"
                          >
                            <div
                              className={cn(
                                'flex w-full justify-between [&[data-state=open]>svg]:rotate-180',
                              )}
                            >
                              <div className="flex">
                                <div className="w-10">{menu.icon}</div>
                                {menu.name}
                              </div>
                              <ChevronDownIcon className="h-6 w-6 shrink-0 text-muted-foreground transition-transform duration-200" />
                            </div>
                          </a>
                        </AccordionTrigger>
                        <AccordionContent>
                          {menu.submenu.map((submenu) => (
                            <Link
                              key={submenu.name}
                              href={submenu.href}
                              className="my-2 mb-0 mt-0 flex h-10 items-center rounded-md bg-white p-6 text-lg text-gray-400 hover:bg-primary hover:text-white dark:bg-background dark:hover:bg-primary dark:hover:text-background"
                            >
                              <div className="w-6">{submenu.icon}</div>
                              {submenu.name}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <div key={menu.name}>
                      <Link
                        href={menu.href}
                        className="my-2 flex h-10 items-center rounded-md bg-white p-6 text-lg hover:bg-primary hover:text-white dark:bg-background dark:hover:bg-primary dark:hover:text-background"
                      >
                        <div className="w-10">{menu.icon}</div>
                        {menu.name}
                      </Link>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
        <div className="flex w-full items-center justify-center">
          <ThemeToggle />
        </div>
      </div>
    </ScrollArea>
  )
}
