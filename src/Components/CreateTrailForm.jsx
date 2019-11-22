import React from 'react'
import { Button, Header, TextArea, Form, Rating, Container } from 'semantic-ui-react'
import ImageUploader from 'react-images-upload'
import CreateMap from './CreateMap'

const CreateTrailForm = props => {
  let { intensity, mapClicked, coordinates } = props

  return (
    <>
    <Header as='h2' textAlign='center'>Share your adventure with the world!</Header>
    <div id='create-trail-wrapper'>
      <Form id='trail-form' size='small'>
        <div>
          <Form.Input fluid name='title' id='title-input' className='input-trail' placeholder='Title' onChange={props.inputHandler} />
        </div>
        <div>
          <TextArea style={{ minHeight: 200 }} id='description-input' className='input-trail' name='description' placeholder='Description' onChange={props.inputHandler} />
        </div>
        <div>
          <Form.Input fluid id='extra-input' className='input-trail' name='extra' placeholder='Good to know' onChange={props.inputHandler} />
        </div>
        <div>
          <Form.Input fluid id='city-input' className='input-trail' name='city' placeholder='City' onChange={props.inputHandler} />
        </div>
        <div>
          <Form.Input fluid id='country-input' className='input-trail' name='country' placeholder='Country' onChange={props.inputHandler} />
        </div>
        <div>
          <select id='continent-input' type='input' placeholder='Select Continent' name='continent' onChange={props.inputHandler}>
            <option value='Asia'>Asia</option>
            <option value='Africa'>Africa</option>
            <option value='Australia'>Australia</option>
            <option value='Europe'>Europe</option>
            <option value='North America'>North America</option>
            <option value='South America'>South America</option>
          </select>
        </div>
        <div>
          <Form.Input fluid id='duration-input' className='input-trail' name='duration' placeholder='Duration in hours' onChange={props.inputHandler} />
        </div>
        <div>
          <div id='rating'>Intensity: { intensity }</div>
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
        <Container textAlign='center'>
        <div>
          <Button id='submit-trail' onClick={props.submitTrailHandler}>Submit Trail</Button>
        </div>
        </Container>
        <br />
        <Header textAlign='center' as='h3'>Map out your trail!</Header>
        <CreateMap 
          coordinates={coordinates}
          mapClicked={mapClicked}
        />
      </Form>
      </div>
    </>
  )
}

export default CreateTrailForm