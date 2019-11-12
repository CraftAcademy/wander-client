import React from 'react'
import { Button, Input, TextArea, Form, Rating } from 'semantic-ui-react'

const CreateTrailForm = () => {
  return (
    <>
      <h2>Share your adventure</h2>
      <div>
        <Input fluid id='title-input' name='title' placeholder='Title' onChange={props.inputHandler} />
      </div>
      <div>
        <TextArea style={{ minHeight: 200 }} id='description-input' name='description' placeholder='Description' onChange={props.inputHandler} />
      </div>
      <div>
        <Input fluid id='extra-input' name='extra' placeholder='Good to know' onChange={props.inputHandler} />
      </div>
      <div>
        <Input fluid id='location-input' name='location' placeholder='Location' onChange={props.inputHandler} />
      </div>
      <div>
        <Input fluid id='duration-input' name='duration' placeholder='Duration' onChange={props.inputHandler} />
      </div>
      <div>
        <div>Rating: { intensity }</div>
        <input 
          type='range'
          min={1}
          max={5}
          name='intensity'
          value={intensity}
          onChange={props.inputHandler}
        />
        <Rating id='intensity-rating' name='intensity' intensity={props.state.intensity} defaultRating={3} maxRating={5}/>
      </div>

    </>
  )
}

export default CreateTrailForm