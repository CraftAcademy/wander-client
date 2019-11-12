import React from 'react'
import { Button, Input, TextArea, Form, Rating } from 'semantic-ui-react'

const CreateTrailForm = (props) => {
  let { intensity } = props

  return (
    <>
      <h2>Share your adventure</h2>
      <Form id='trail-form' size='small'>
        <div>
          <input name='title' id='title-input' placeholder='Title' onChange={props.inputHandler} />
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
          <div id='rating'>Rating: { intensity }</div>
          <input
            id='intensity-rating'
            type='range'
            min={1}
            max={5}
            name='intensity'
            value={intensity}
            onInput={props.inputHandler}
          />
          <br />
          <Rating name='intensity' rating={intensity} maxRating={5}/>
        </div>
        <div>
          <Button id='submit-trail' onClick={props.submitTrailHandler}>Submit Trail</Button>
        </div>
      </Form>

    </>
  )
}

export default CreateTrailForm