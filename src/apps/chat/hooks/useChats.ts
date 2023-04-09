import { useContext } from 'react'
import { ChatsContext } from '../components/ChatsProvider'

export function useChats() {
  return useContext(ChatsContext)
}

