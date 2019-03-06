import React from 'react'

import Button from '../../../components/button.js'

import '../b.css'

const B = (props) => (
    <div className='B'>
        {props.children}
        <Button>Button A</Button>
    </div>
)

export default B