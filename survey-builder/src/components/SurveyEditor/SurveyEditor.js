import React from 'react'
import './SurveyEditor.scss'

import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

function SurveyEditor(props) {
  return (
    <div>
      {/*PROMPTS ARRAY */}
      {props.activeSurvey.prompts.map((prompt, prompt_index) => {
        return (
          <div key={`prompt-text-${prompt_index}`}>
            <br />
            <Card>
              <CardText>
                <TextField
                  hintText="Question Text"
                  floatingLabelText="Question Text"
                  fullWidth={true}
                  multiLine={true}
                  rowsMax={4}
                  value={prompt.promptText}
                  onChange={(e) => props.handleChange(e, 'prompt_text', prompt_index)}
                />
              </CardText>
              <CardText>
                {/* INPUTS ARRAY */}
                {prompt.inputs.reduce((aggregator, input, input_index) => {
                  aggregator.push(
                    <div key={`prompt${prompt_index}-input${input_index}-${input.type}`}>
                      {/* // Render the following for every input type: */}
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
                      <br />
                      <Divider inset={true} />
                      <br />
                    </div>
                  )
                  return aggregator
                }, [])}
              </CardText>
              <CardActions>
                <FlatButton primary={true} label="Add User Input" onClick={() => props.addInput(prompt_index)} />
                <FlatButton secondary={true} label="Delete Question" onClick={() => props.deletePrompt(prompt_index)} />
              </CardActions>
            </Card>


          </div>
        )
      })}
    </div>
  )
}


export default SurveyEditor