import React from 'react'

const App = () => {
  return (
    <div className="main">
      <div className="logo">
        <a href="https://github.com/VCCD/dwellplayd" target="_blank" rel="noopener noreferrer">
          <img src="/dwellplayd_logo.png" />
        </a>
      </div>
      <span>dwellplayd is a react native app designed to gamify and incentivize completing communal tasks in a shared living space</span>
      <a href="https://github.com/VCCD/dwellplayd" target="_blank" rel="noopener noreferrer">
        <div id="gifs">
          <img src="/dwellplayd-gif-1.gif" />
          <img src="/dwellplayd-gif-2.gif" />
          <img src="/dwellplayd-gif-3.gif" />
        </div>
      </a>
    </div>
  )
}

export default App
