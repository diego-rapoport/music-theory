import { create } from 'zustand'

type NoteStoreType = {
  note: string
  updateNote: (newNote: string) => void
}

export const useNoteStore = create<NoteStoreType>()((set) => ({
  note: 'C',
  updateNote: (newNote) => set(() => ({ note: newNote })),
}))
