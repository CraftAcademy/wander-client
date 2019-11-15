import React from 'react'
import { Button, Input, TextArea, Form, Rating, Header } from 'semantic-ui-react'
import ImageUploader from 'react-images-upload'

const CreateTrailForm = (props) => {
  let { intensity } = props

  return (
    <>
    <Header as='h2' textAlign='center'>Share your adventure with the world!</Header>
    <div id='create-trail-wrapper'>
      <Form id='trail-form' size='small'>
        <div>
          <Input fluid name='title' id='title-input' className='input-trail' placeholder='Title' onChange={props.inputHandler} />
        </div>
        <div>
          <TextArea style={{ minHeight: 200 }} id='description-input' className='input-trail' name='description' placeholder='Description' onChange={props.inputHandler} />
        </div>
        <div>
          <Input fluid id='extra-input' className='input-trail' name='extra' placeholder='Good to know' onChange={props.inputHandler} />
        </div>
        <div>
          <Input fluid id='location-input' className='input-trail' name='location' placeholder='Location' onChange={props.inputHandler} />
        </div>
        <div>
          <Input fluid id='duration-input' className='input-trail' name='duration' placeholder='Duration' onChange={props.inputHandler} />
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
          <ImageUploader
            className='file-input'
            buttonText={'Upload your snapshots'}
            withPreview
            withIcon
            withLabel={false}
            onChange={props.onAvatarDropHandler}
            imgExtension={[".jpg", ".png"]}
            maxFileSize={5242880}
            singleImage={true}
          />
        </div>
        <div>
          <Button id='submit-trail' onClick={props.submitTrailHandler}>Submit Trail</Button>
        </div>
      </Form>
      </div>
    </>
  )
}

export default CreateTrailForm