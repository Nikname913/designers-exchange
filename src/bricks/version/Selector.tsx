import React from 'react'
import Main from './desktop/Main'

const Selector: React.FC = () => {

  return (
    <React.Fragment>
      { true && <Main></Main> }
    </React.Fragment>
  )

}

export default Selector