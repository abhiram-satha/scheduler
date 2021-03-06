import { useState } from 'react';

export default function useVisualMode(initial) {


  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => {
        const historyCopy = [...prev];
        historyCopy.pop()
        historyCopy.push(newMode)
        return historyCopy;
      })
    } else {
      setHistory((prev)=>[...prev, newMode]);
    }
  }
  
  function back() {
    if (history.length > 1) {

      setHistory(prev => {
        const historyCopy = [...prev];
          historyCopy.pop()
          return historyCopy
      })
    }
  }

  return {
    mode: history[history.length - 1],
    transition,
    back,
  }

}

