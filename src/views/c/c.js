import React from 'react'
import ReactDOM from 'react-dom'
import isOdd from 'is-odd'

import OtherButton from '../../components/other_button'

console.log(isOdd(3))
ReactDOM.render(<OtherButton />, document.body)
