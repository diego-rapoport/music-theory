import { Soundfont } from 'smplr'
import { create } from 'zustand'

type SoundStoreType = {
  globalContext: AudioContext
  loaded: boolean
  instrument: string
  changeInstrument: (newInstrument: string) => void
  loadInstrument: (instrumentName: string) => Promise<void>
}

export const useSoundStore = create<SoundStoreType>()((set) => ({
  globalContext: new AudioContext(),
  loaded: false,
  instrument: 'acoustic_grand_piano',
  changeInstrument: (newInstrument) => {
    useSoundStore
      .getState()
      .loadInstrument(newInstrument)
      .then(() => {
        set(() => ({ instrument: newInstrument }))
      })
  },
  loadInstrument: async (instrumentName) => {
    set(() => ({ loaded: false }))
    const context = useSoundStore.getState().globalContext
    const instrument = new Soundfont(context, {
      instrument: instrumentName,
    })
    instrument.load
      .then(() => {
        set(() => ({ loaded: true }))
      })
      .catch((e) => {
        console.log('Error load instrument = ', e)
      })
  },
}))
