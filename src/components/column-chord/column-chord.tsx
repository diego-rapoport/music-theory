import './column-chord.css'

type ColumnProps = {
  grade: string
  chord: string
  notes: string[]
  majorOrMinor?: 'major' | 'minor'
  minorType?: 'natural' | 'harmonic' | 'melodic'
}

function ColumnChord({ grade, chord, notes }: ColumnProps) {
  return (
    <>
      <div className='column'>
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
