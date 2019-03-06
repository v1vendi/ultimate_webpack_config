import React from 'react'

import Button from '../../../components/button.js'

import '../a.css'

const A = (props) => (
    <div className='A'>
        {props.children}
        <Button>Button A</Button>
    </div>
)

export default A