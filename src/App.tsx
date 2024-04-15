import './App.css'
import BoxNotes from './components/box-notes/box-notes'

function App() {
  const mainH1 = 'HARMONY!'

  return (
    <>
      <div className='center'>
        <h1>{mainH1}</h1>
      </div>
      <BoxNotes />
    </>
  )
}

export default App
