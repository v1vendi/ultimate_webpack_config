import React from 'react'
import ReactDOM from 'react-dom'
import isOdd from 'is-odd'

import A from './components/A_component.js'

console.log(isOdd(2))
ReactDOM.render(<A>hello A</A>, document.body)