import { useSoundStore } from '../../store/sound'
import { SolarPlaybackSpeedBold } from '../icons/SolarPlaybackSpeedBold'
import './column-chord.css'

type ColumnProps = {
  grade: string
  chord: string
  notes: string[]
  majorOrMinor?: 'major' | 'minor'
  minorType?: 'natural' | 'harmonic' | 'melodic'
}

function ColumnChord({ grade, chord, notes }: ColumnProps) {

  const { playableInstrument } = useSoundStore()

  function playChord() {
    notes.forEach(note => {
      playableInstrument?.start({ note: `${note}4` })
    })
  }

  return (
    <>
      <div className='column'>
        <SolarPlaybackSpeedBold onClick={playChord}></SolarPlaybackSpeedBold>
        <h3>
          {grade}({chord})
        </h3>
        {notes.map((note) => (
          <p className='note' key={note}>
            {note}
          </p>
        ))}
      </div>
    </>
  )
}

export default ColumnChord
