import Cell from './components/Cell'
import {useState, useEffect} from "react"
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {Eazy, Impossible, calculateWinner} from "./js/AI"
import place from './assets/place.wav';
import win from './assets/win.wav';
import loose from './assets/loose.wav';


function App() {
  const [values, setValues] = useState(Array(9).fill(0))
  const [player, setPlayer] = useState([-1, 1][Math.floor(Math.random() * 2)])
  const [AI, setAI]:any = useState("Eazy")
  const [current, setCurrent] = useState(1)
  
  const [playerScore, setPlayerScore] = useState(0)
  const [AIScore, setAIScore] = useState(0)


  let placeAudio = new Audio(place)
  let winAudio = new Audio(win)
  let looseAudio = new Audio(loose)

  const isWin = (win:any) => {
    if(win === 1){
      winAudio.play()
      setPlayerScore(playerScore + 1)
    }else if(win === -1){
      looseAudio.play()
      setAIScore(AIScore + 1)
    }
  }

  const AISet = () => {
    placeAudio.play()
    setCurrent(-current)

    let pos:any = null;
    switch (AI) {
      case 'Eazy':
        pos = Eazy(values)
        break;
      case 'Impossible':
        pos = Impossible(values, player)
        break;
      default:
        pos = Eazy(values)
    }

    setValues((prev) =>
      prev.map((v, i) => {
        if(pos === i){
          return -player
        }else{
          return v
        }
      }));

  }

  useEffect(() => {
    if(current !== player && calculateWinner(values, player) === null){
      setTimeout(AISet, 400 + Math.random() * 400 - 200);
    }
  }, [current])
  
  useEffect(() => {
    isWin(calculateWinner(values, player))
  }, [values])

  const click = (id:number) => {
    if(calculateWinner(values, player) === null && current === player && values[id] === 0){
      placeAudio.play()
      setCurrent(-current)
      setValues((prev) =>
      prev.map((el, i) => {
        return id !== i ? el : player
      }));
    }
  }

  const restart = () => {
      setValues(Array(9).fill(0)); 
      setCurrent(-current); 
      setPlayer([-1, 1][Math.floor(Math.random() * 2)])
  }
  
  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen font-extrabold'>
      <div className='flex flex-col justify-evenly items-center h-full w-screen p-2'>
        <p className='text-6xl'><span className='text-red-400'>Tic</span> <span className='text-blue-400'>Tac</span> <span className='text-emerald-400'>Toe</span></p>
        <p className='text-2xl text-main'><span className='text-red-400'>You {playerScore}</span> : <span className='text-blue-400'>{AIScore} AI</span></p>
        <Dropdown options={["Eazy", "Impossible"]} onChange={(e) => {setAI(e.value); restart(); setPlayerScore(0); setAIScore(0)}} value={"Eazy"} placeholder="Difficulty" />
        <div className='grid grid-cols-3 grid-rows-3  max-w-[350px] w-full'>
          <Cell value={values[0]} onClick ={() => click(0)}/>    
          <Cell value={values[1]} onClick={() => click(1)}/>
          <Cell value={values[2]} onClick={() => click(2)}/>

          <Cell value={values[3]} onClick={() => click(3)}/>
          <Cell value={values[4]} onClick={() => click(4)}/>
          <Cell value={values[5]} onClick={() => click(5)}/>

          <Cell value={values[6]} onClick={() => click(6)}/>
          <Cell value={values[7]} onClick={() => click(7)}/>
          <Cell value={values[8]} onClick={() => click(8)}/>
        </div>

        <button onClick={restart}
          className='text-main text-2xl bg-purple p-1 px-2 rounded-lg mt-4 duration-200 hover:bg-violet-800'>Restart</button>
      </div>
      <p className='text-main'>© Tic-Tac-Toe by Tengo Lomidze 2023</p>
    </div>
  )
}

export default App
