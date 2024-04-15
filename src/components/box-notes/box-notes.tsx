import '../../App.css'
import './box-notes.css'
import { useNoteStore } from '../../store/note'
import { Chord, Key } from 'tonal'
import ColumnChord from '../column-chord/column-chord'
import { useState } from 'react'

function BoxNotes() {
  const availableNotes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ]

  const noteStore = useNoteStore()
  const [chords, setChords] = useState<
    ReturnType<typeof Key.majorKey> | ReturnType<typeof Key.minorKey>
  >(Key.majorKey('C'))
  const [kindOfKey, setKindOfKey] = useState('major')
  const [typeMinorKey, setTypeMinorKey] = useState<
    'natural' | 'harmonic' | 'melodic'
  >('natural')

  function getNotesOfChord(chord: string) {
    return Chord.get(chord).notes
  }

  function getChordsFromMajorScale(note: string) {
    return Key.majorKey(note)
  }

  function getChordsFromMinorScale(note: string) {
    return Key.minorKey(note)
  }

  function callTypeOfScale(note: string, kind: string) {
    switch (kind) {
      case 'major':
        const newMajorChords = getChordsFromMajorScale(note)
        setChords(newMajorChords)
        break
      case 'minor':
        const newMinorChords = getChordsFromMinorScale(note)
        setChords(newMinorChords)
        break
    }
    setKindOfKey(kind)
  }

  function changeNote(newNote: string) {
    noteStore.updateNote(newNote)
    callTypeOfScale(newNote, kindOfKey)
  }

  function changeKindOfKey(kind: string) {
    callTypeOfScale(noteStore.note, kind)
  }

  return (
    <>
      <div className='center'>
        <select
          name='note'
          id='note'
          onChange={(e) => changeNote(e.target.value)}
        >
          {availableNotes.map((note) => (
            <option value={note} key={note}>
              {note}
            </option>
          ))}
        </select>
        <select
          name='kind'
          id='kind'
          defaultValue='major'
          onChange={(e) => changeKindOfKey(e.target.value)}
        >
          <option value='major'>Major</option>
          <option value='minor'>Minor</option>
        </select>
        {chords.type === 'minor' && (
          <select
            name='minorType'
            id='minorType'
            defaultValue='natural'
            onChange={(e) =>
              setTypeMinorKey(
                e.target.value as 'natural' | 'harmonic' | 'melodic',
              )
            }
          >
            <option value='natural'>Natural</option>
            <option value='harmonic'>Harmonic</option>
            <option value='melodic'>Melodic</option>
          </select>
        )}
      </div>
      <div className='chords'>
        {chords.type === 'major'
          ? chords.grades.map((grade, index) => (
              <ColumnChord
                key={index}
                grade={grade}
                chord={chords.chords[index]}
                notes={getNotesOfChord(chords.chords[index])}
              />
            ))
          : chords[typeMinorKey].grades.map((grade, index) => (
              <ColumnChord
                key={index}
                grade={grade}
                chord={chords[typeMinorKey].chords[index]}
                notes={getNotesOfChord(chords[typeMinorKey].chords[index])}
              />
            ))}
      </div>
    </>
  )
}

export default BoxNotes
