export const userData = [
  {
    id: 1,
    avatar: '/ai.png',
    messages: [
      {
        id: 1,
        avatar: '/ai.png',
        name: 'AI',
        message: 'Hey, Jakob',
      },
      {
        id: 2,
        avatar: '/person.jpg',
        name: 'Jakob Hoeg',
        message: 'Hey!',
      },
      {
        id: 3,
        avatar: '/ai.png',
        name: 'AI',
        message: 'How are you?',
      },
      {
        id: 4,
        avatar: '/person.jpg',
        name: 'Jakob Hoeg',
        message: 'I am good, you?',
      },
      {
        id: 5,
        avatar: '/ai.png',
        name: 'AI',
        message: 'I am good too!',
      },
      {
        id: 6,
        avatar: '/person.jpg',
        name: 'Jakob Hoeg',
        message: 'That is good to hear!',
      },
      {
        id: 7,
        avatar: '/ai.png',
        name: 'AI',
        message: 'How has your day been so far?',
      },
      {
        id: 8,
        avatar: '/person.jpg',
        name: 'Jakob Hoeg',
        message:
          'It has been good. I went for a run this morning and then had a nice breakfast. How about you?',
      },
      {
        id: 9,
        avatar: '/ai.png',
        name: 'AI',
        message: 'I had a relaxing day. Just catching up on some reading.',
      },
    ],
    name: 'AI',
  },
  {
    id: 2,
    avatar: '/User2.png',
    name: 'John Doe',
  },
  {
    id: 3,
    avatar: '/User3.png',
    name: 'Elizabeth Smith',
  },
  {
    id: 4,
    avatar: '/User4.png',
    name: 'John Smith',
  },
]

export const loggedInUserData = {
  id: 11233,
  avatar: '/person.jpg',
  name: 'Person',
  messages: [],
}

export type UserData = (typeof userData)[number]

export const personData = {
  id: 5,
  avatar: '/person.jpg',
  name: 'Jakob Hoeg',
}

export type personData = typeof personData

export interface Message {
  id: number
  avatar: string
  name: string
  message: string
}

export interface User {
  id: number
  avatar: string
  messages: Message[]
  name: string
}
