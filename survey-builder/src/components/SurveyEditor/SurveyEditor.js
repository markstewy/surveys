import React, { Component } from 'react'
import './SurveyEditor.scss'

class SurveyEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editedSurvey: this.props.activeSurvey
    }
  }
// ADD SURVEYS, add prompts, add inputs and input fields
// Delete Survey

  handleChange(e, name, prompt_index, input_index, option_index, option_key) {
    let editedSurvey = Object.assign({}, this.state.editedSurvey)
    switch (name) {
      case 'name': 
        editedSurvey.name = e.target.value
        break
      case 'prompt_text': 
        editedSurvey.prompts[prompt_index].promptText = e.target.value
        break
      case 'input_type': 
        editedSurvey.prompts[prompt_index].inputs[input_index].type = e.target.value
        break
      case 'placeholder':
        editedSurvey.prompts[prompt_index].inputs[input_index].placeholder = e.target.value
        break
      case 'label':
        editedSurvey.prompts[prompt_index].inputs[input_index].label = e.target.value
        break
      case 'option':
        editedSurvey.prompts[prompt_index].inputs[input_index].options[option_index][option_key] = e.target.value
        break
      default:
        console.warn('SurveyEditor.js handleChange switch found no match')
    }
    this.setState({
      editedSurvey: editedSurvey
    })
  }

  addInput(prompt_index) {
    // e.preventDefault()
    const editedSurvey = Object.assign({}, this.state.editedSurvey)
    editedSurvey.prompts[prompt_index].inputs.push(
      {
        type: 'text_area',
        label: '',
        placeholder: 'type response here',
        options: []
      }
    )
    this.setState({
      editedSurvey: editedSurvey
    })
  }

  deletePrompt(prompt_index) {
    const editedSurvey = Object.assign({}, this.state.editedSurvey)
    editedSurvey.prompts.splice(prompt_index, 1)
    this.setState({
      editedSurvey: editedSurvey
    })
  }

  addPrompt() {
    const editedSurvey = Object.assign({}, this.state.editedSurvey)
    editedSurvey.prompts.push(
      {
        promptText: 'How was your overall experience?',
        inputs: [
          {
            type: 'text_area',
            label: '',
            placeholder: 'type response here',
            options: []
          }
        ]
      }
    )
    this.setState({
      editedSurvey: editedSurvey
    })
  }

  deleteInput(prompt_index, input_index) {
    // e.preventDefault()
    const editedSurvey = Object.assign({}, this.state.editedSurvey)
    editedSurvey.prompts[prompt_index].inputs.splice(input_index, 1)
    this.setState({
      editedSurvey: editedSurvey
    })
  }

  addOption(e, prompt_index, input_index) {
    // e.preventDefault()
    const editedSurvey = Object.assign({}, this.state.editedSurvey)
    editedSurvey.prompts[prompt_index].inputs[input_index].options.push({text: '', value: ''})
    this.setState({
      editedSurvey: editedSurvey
    })
  }

  deleteOption(e, prompt_index, input_index, option_index) {
    // e.preventDefault()
    const editedSurvey = Object.assign({}, this.state.editedSurvey)
    editedSurvey.prompts[prompt_index].inputs[input_index].options.splice(option_index, 1)
    this.setState({
      editedSurvey: editedSurvey
    })
  }

  render() {
    return (
      <div className={'modal-container'}>

        <div onClick={(e) => this.props.toggleEdit()} className="modal-backdrop"></div>
        
        <div className={'modal-card'}>
          <div onClick={(e) => this.props.toggleEdit()} className={'modal-close-x'}>x</div>
          <form onSubmit={(e) => this.props.saveSurvey(e, this.state.editedSurvey, this.props.activeSurveyIndex)}>
            <label>
              Survey Name:
                <input value={this.state.editedSurvey.name} onChange={(e) => this.handleChange(e, 'name')} />
            </label><br />
            <button type='button' onClick={(e) => this.addPrompt()}>add prompt</button><br/>
            Prompts:<br />
            {this.state.editedSurvey.prompts.map((prompt, prompt_index) => {
              return (
                <div 
                key={`prompt-text-${prompt_index}`}
                style={{'border' : '1px solid black', 'margin' : '20px', 'boxShadow' : ' 5px 10px #80808040'}}>
                  <button type='button' onClick={(e) => this.deletePrompt(prompt_index)}>delete prompt</button><br/>
                  <p>
                    <textarea style={{ width: '100%' }} value={prompt.promptText} onChange={(e) => this.handleChange(e, 'prompt_text', prompt_index)} required />
                  </p>
                  <button type='button' onClick={(e) => this.addInput(prompt_index)}>add input</button>
                  {prompt.inputs.reduce((agg, input, input_index) => {
                    if (input.type === 'short_text' || input.type === 'text_area') {
                      agg.push(
                        <div key={`prompt${prompt_index}-input${input_index}-${input.type}`}>
                          input type:
                          <select defaultValue={input.type} onChange={(e) => this.handleChange(e, 'input_type', prompt_index, input_index)}>
                            <option value={'short_text'}>short text</option>
                            <option value={'text_area'}>text area</option>
                            <option value={'multiple_choice'}>multiple choice</option>
                            <option value={'dropdown'}>dropdown</option>
                          </select>
                          <button type='button' onClick={(e) => this.deleteInput(prompt_index, input_index)}>delete input</button>
                          <br />
                          Placeholder: <input value={input.placeholder} onChange={(e) => this.handleChange(e, 'placeholder', prompt_index, input_index)} />
                          Label: <input value={input.label} onChange={(e) => this.handleChange(e, 'label', prompt_index, input_index)}/>
                        </div>
                      )
                    } else if (input.type === 'multiple_choice' || input.type === 'dropdown') {
                      agg.push(
                        <div key={`prompt${prompt_index}-input${input.type}-${input.type}`}>
                          input type:
                          <select defaultValue={input.type} onChange={(e) => this.handleChange(e, 'input_type', prompt_index, input_index)}>
                            <option value={'short_text'}>short text</option>
                            <option value={'text_area'}>text area</option>
                            <option value={'multiple_choice'}>multiple choice</option>
                            <option value={'dropdown'}>dropdown</option>
                          </select>
                          <button type='button' onClick={(e) => this.deleteInput(prompt_index, input_index)}>delete input</button>
                          <br/>
                          <button type='button' onClick={(e) => this.addOption(e, prompt_index, input_index)}>add option</button>
                          <br />
                          {input.options.map((option, option_index) => {
                            return (
                              <div key={`${option_index}-${input.type}`}>
                                Text: <input value={option.text} onChange={(e) => this.handleChange(e, 'option', prompt_index, input_index, option_index, 'text')}/>
                                Value: <input value={option.value} onChange={(e) => this.handleChange(e, 'option', prompt_index, input_index, option_index, 'value')}/>
                                <button type='button' onClick={(e) => this.deleteOption(e, prompt_index, input_index, option_index)}>delete option</button>
                              </div>
                            )
                          })}
                        </div>
                      )
                    }
                    return agg
                  }, [])}
                </div>
              )
            })}

            <div className={'modal-footer'}>
              <button type='submit'>Save</button>
            </div>
          </form>


        </div>
      </div>
    )
  }
}

export default SurveyEditor