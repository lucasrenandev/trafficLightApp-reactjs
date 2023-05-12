import trafficOff from "./assets/desligado.png"
import trafficRed from "./assets/vermelho.png"
import trafficYellow from "./assets/amarelo.png"
import trafficGreen from "./assets/verde.png"
import { useEffect, useRef, useState } from "react"
import './App.css'

export default function App() {
  const imgRef = useRef(null)
  let [indexColor] = useState(0)
  let [breakInterval] = useState(null)

  useEffect(() => {
    const buttons = document.querySelector(".buttons")

    buttons.addEventListener("click", (event) => {
      automaticStop()
      TurnOnTrafficLight[event.target.id]()
    })
  }, [])

  function automaticStop() {
    clearInterval(breakInterval)
  }

  function automaticControl() {
    if(indexColor < 2) {
      indexColor++
    }
    else {
      indexColor = 0
    }
  }

  function automaticColor() {
    const colors = ["red", "yellow", "green"]
    const color = colors[indexColor]
    TurnOnTrafficLight[color]()
    automaticControl()
  }

  const TurnOnTrafficLight = {
    "red": () => imgRef.current.src = trafficRed,
    "yellow": () => imgRef.current.src = trafficYellow,
    "green": () => imgRef.current.src = trafficGreen,
    "automatic": () => breakInterval = setInterval(automaticColor, 600)
  }

  return (
    <>
      <section>
        <figure className="traffic">
          <img ref={imgRef}
          src={trafficOff}
          alt="Semáforo desligado" />
        </figure>

        <main className="buttons">
          <button type="button" id="red">Red</button>
          <button type="button" id="yellow">Yellow</button>
          <button type="button" id="green">Green</button>
          <button type="button" id="automatic">Automatic</button>
        </main>
      </section>
    </>
  )
}