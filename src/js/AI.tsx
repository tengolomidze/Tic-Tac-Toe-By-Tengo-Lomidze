const Eazy = (values:number[]) => {
    
    let freeValues:number[] = []

    for(let i = 0; i < values.length; i++){
        if(values[i] ===0){
        freeValues.push(i)
        }
    }

    const random = Math.floor(Math.random() * freeValues.length);

    return freeValues[random]
}

const Impossible = (values:number[], player:number) => {
    let bestScore = -Infinity
    let bestMove = 0

    for(let i = 0; i < values.length; i++){
       if(values[i] === 0){
            let newValues = values.slice(0)
            newValues[i] = -player
            let score:any = minimax(newValues, false, player)

            if(score > bestScore){
                bestScore = score
                bestMove = i
            }
       }
    }
    return bestMove
}

const minimax = (values:number[], isMaximizing:boolean, player:number) => {
    if (calculateWinner(values, player) !== null){
        return -calculateWinner(values, player)!
    }
    
    if(isMaximizing){
        let bestScore = -Infinity

        for(let i = 0; i < values.length; i++){
            if(values[i] === 0){
                let newValues = values.slice(0)
                newValues[i] = -player
                let score:any = minimax(newValues, false, player)
    
                bestScore = Math.max(score, bestScore)
            }
        }

        return bestScore
    }else{
        let worstScore = Infinity

        for(let i = 0; i < values.length; i++){
            if(values[i] === 0){
                let newValues = values.slice(0)
                newValues[i] = player
                let score:any = minimax(newValues, true, player)
    
                worstScore = Math.min(score, worstScore)
            }
        }

        return worstScore
    }
}

const calculateWinner = (values:number[], player:number) => {
    const patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ]

    for(let i = 0; i < patterns.length; i++){
      if(values[patterns[i][0]] !== 0 && values[patterns[i][0]] === values[patterns[i][1]] && values[patterns[i][1]] === values[patterns[i][2]]){
        return values[patterns[i][0]] === player ? 1 : -1
      }
    }

    if(values.filter(v => v === 0).length === 0){
        return 0
    }
    
    return null
  }

export {Eazy, Impossible, calculateWinner}