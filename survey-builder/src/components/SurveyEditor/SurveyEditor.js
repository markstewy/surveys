import React from 'react'
import './SurveyEditor.scss'

import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

function SurveyEditor(props) {
  return (
    <div>
      {/*PROMPTS ARRAY */}
      {props.activeSurvey.prompts.map((prompt, prompt_index) => {
        return (
          <div key={`prompt-text-${prompt_index}`}>
          <br/>
          <Card>
              <CardTitle title="Card title" subtitle="Card subtitle" />
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions>
                <FlatButton label="Add User Input" />
                <FlatButton label="Delete Question" />
              </CardActions>
            </Card>




            <TextField
              hintText="Question Text"
              floatingLabelText="Question Text"
              multiLine={true}
              rowsMax={4}
              value={prompt.promptText}
              onChange={(e) => props.handleChange(e, 'prompt_text', prompt_index)}
            />
            {/* <button onClick={() => props.deletePrompt(prompt_index)}>delete prompt</button><br /> */}
            <br/>

            {/* <button onClick={() => props.addInput(prompt_index)}>add input</button> */}
            <br /><br />
            {/* INPUTS ARRAY */}
            {prompt.inputs.reduce((aggregator, input, input_index) => {
              aggregator.push(
                <div key={`prompt${prompt_index}-input${input_index}-${input.type}`}>
                  {/* // Render the following for every input type: */}
                  input type:
                          <select defaultValue={input.type} onChange={(e) => props.handleChange(e, 'input_type', prompt_index, input_index)}>
                    <option value={'short_text'}>short text</option>
                    <option value={'text_area'}>text area</option>
                    <option value={'multiple_choice'}>multiple choice</option>
                    <option value={'dropdown'}>dropdown</option>
                  </select>
                  <button onClick={() => props.deleteInput(prompt_index, input_index)}>delete input</button>
                  <br />
                  {(input.type === 'short_text' || input.type === 'text_area') ?
                    // Only render the following for short and long text types:
                    <div>
                      Placeholder: <input value={input.placeholder} onChange={(e) => props.handleChange(e, 'placeholder', prompt_index, input_index)} />
                      Label: <input value={input.label} onChange={(e) => props.handleChange(e, 'label', prompt_index, input_index)} />
                    </div>
                    :
                    //Only render the following for multiple choice and dropdown types:
                    <div>
                      <button onClick={() => props.addOption(prompt_index, input_index)}>add option</button>
                      <br />
                      {/* OPTIONS ARRAY */}
                      {input.options.map((option, option_index) => {
                        return (
                          <div key={`${option_index}-${input.type}`}>
                            Text: <input value={option.text} onChange={(e) => props.handleChange(e, 'option', prompt_index, input_index, option_index, 'text')} />
                            Value: <input value={option.value} onChange={(e) => props.handleChange(e, 'option', prompt_index, input_index, option_index, 'value')} />
                            <button onClick={() => props.deleteOption(prompt_index, input_index, option_index)}>delete option</button>
                          </div>
                        )
                      })}
                    </div>
                  }
                </div>
              )
              return aggregator
            }, [])}
          </div>
        )
      })}
    </div>
  )
}


export default SurveyEditor