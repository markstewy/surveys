import React, { Component } from 'react'
import axios from 'axios'
import SurveyEditor from '../SurveyEditor/SurveyEditor'
import './SurveyList.scss'

import { Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { grey400 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

class SurveyList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      surveys: [],
      activeSurvey: {},
      activeSurveyIndex: '',
      surveysOriginal: '',
      modalOpen: false,
    }
    this.saveSurvey = this.saveSurvey.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deletePrompt = this.deletePrompt.bind(this)
    this.deleteInput = this.deleteInput.bind(this)
    this.addInput = this.addInput.bind(this)
    this.deleteOption = this.deleteOption.bind(this)
    this.addOption = this.addOption.bind(this)
  }

  componentDidMount() {
    axios.get(`http://localhost:3100/fake_data`)
      .then(response => {
        this.setState({
          surveys: response.data,
          surveysOriginal: JSON.stringify(response.data)
        })
      })
  }

  toggleModal(survey, survey_index) {
    if (survey === 'reset') {
      this.setState({
        surveys: JSON.parse(this.state.surveysOriginal),
        modalOpen: !this.state.modalOpen,
        activeSurvey: JSON.parse('{}'),
        activeSurveyIndex: null
      })
    } else {
      this.setState({
        modalOpen: !this.state.modalOpen,
        activeSurvey: survey,
        activeSurveyIndex: survey_index
      })
    }
  }

  // SURVEY METHODS
  saveSurvey() {
    axios.patch(`http://localhost:3100/editSurvey/${this.state.activeSurveyIndex}`, { survey: this.state.activeSurvey })
      .then(res => {
        const surveys = this.state.surveys.slice()
        surveys.splice(this.state.activeSurveyIndex, 1, res.data)
        this.setState({
          modalOpen: !this.state.modalOpen,
          surveys: surveys,
          surveysOriginal: JSON.stringify(surveys)
        })
      })
      .catch(err => console.warn(err))

  }
  addSurvey() {
    axios.post('http://localhost:3100/addSurvey')
      .then(res => {
        const surveys = this.state.surveys.slice()
        surveys.push(res.data)
        this.setState({
          surveys: surveys,
          surveysOriginal: JSON.stringify(surveys)
        })
      })
      .catch(err => console.warn(err))
  }
  deleteSurvey(index) {
    axios.delete(`http://localhost:3100/deleteSurvey/${index}`)
      .then(res => {
        const surveys = this.state.surveys.slice()
        surveys.splice(res.data, 1)
        this.setState({
          surveys: surveys,
          surveysOriginal: JSON.stringify(surveys)
        })
      })
      .catch(err => console.warn(err))
  }

  // PROMPT METHODS
  addPrompt() {
    const activeSurvey = Object.assign({}, this.state.activeSurvey)
    activeSurvey.prompts.push(
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
      activeSurvey: activeSurvey
    })
  }
  deletePrompt(prompt_index) {
    const activeSurvey = Object.assign({}, this.state.activeSurvey)
    // const activeSurvey = {...this.state.activeSurvey, myproperty: "stuff"}
    activeSurvey.prompts.splice(prompt_index, 1)
    this.setState({
      activeSurvey: activeSurvey
    })
  }

  // INPUT METHODS
  addInput(prompt_index) {
    const activeSurvey = Object.assign({}, this.state.activeSurvey)
    activeSurvey.prompts[prompt_index].inputs.push(
      {
        type: 'text_area',
        label: '',
        placeholder: 'type response here',
        options: []
      }
    )
    this.setState({
      activeSurvey: activeSurvey
    })
  }
  deleteInput(prompt_index, input_index) {
    const activeSurvey = Object.assign({}, this.state.activeSurvey)
    activeSurvey.prompts[prompt_index].inputs.splice(input_index, 1)
    this.setState({
      activeSurvey: activeSurvey
    })
  }

  // OPTION METHODS
  addOption(prompt_index, input_index) {
    const activeSurvey = Object.assign({}, this.state.activeSurvey)
    activeSurvey.prompts[prompt_index].inputs[input_index].options.push({ text: '', value: '' })
    this.setState({
      activeSurvey: activeSurvey
    })
  }

  deleteOption(prompt_index, input_index, option_index) {
    const activeSurvey = Object.assign({}, this.state.activeSurvey)
    activeSurvey.prompts[prompt_index].inputs[input_index].options.splice(option_index, 1)
    this.setState({
      activeSurvey: activeSurvey
    })
  }

  // ALL PURPOSE handleChange - prompt, input and option array edit
  handleChange(e, name, prompt_index, input_index, option_index, option_key) {
    let activeSurvey = Object.assign({}, this.state.activeSurvey)
    switch (name) {
      case 'name':
        activeSurvey.name = e.target.value
        break
      case 'prompt_text':
        activeSurvey.prompts[prompt_index].promptText = e.target.value
        break
      case 'input_type':
        console.log(e.target.value, 'hit input type', prompt_index, input_index)
        activeSurvey.prompts[prompt_index].inputs[input_index].type = e.target.value
        break
      case 'placeholder':
        activeSurvey.prompts[prompt_index].inputs[input_index].placeholder = e.target.value
        break
      case 'label':
        activeSurvey.prompts[prompt_index].inputs[input_index].label = e.target.value
        break
      case 'option':
        activeSurvey.prompts[prompt_index].inputs[input_index].options[option_index][option_key] = e.target.value
        break
      default:
        console.warn('handleChange switch found no match')
    }
    this.setState({
      activeSurvey: activeSurvey
    })
  }

  render() {
    const dialogActions = (
      <span>
        <RaisedButton
          style={{ 'marginRight': '20px' }}
          label="Cancel"
          secondary={true}
          onClick={() => this.toggleModal('reset')}
        />
        <RaisedButton
          style={{ 'marginRight': '20px' }}
          label="Save"
          primary={true}
          keyboardFocused={true}
          onClick={(e) => this.saveSurvey()}
        />
      </span>
    )
    return (
      <div>
        <Dialog
          title={
            <div>
              <TextField
                id="text-field-default"
                value={this.state.activeSurvey.name}
                onChange={(e) => this.handleChange(e, 'name')}
              />
              <RaisedButton
                style={{ 'float': 'right' }}
                label="Add Question"
                primary={true}
                onClick={() => this.addPrompt()}
              />
            </div>
          }
          actions={dialogActions}
          modal={true}
          open={this.state.modalOpen}
          autoScrollBodyContent={true}>
          <SurveyEditor
            activeSurvey={this.state.activeSurvey}
            activeSurveyIndex={this.state.activeSurveyIndex}
            handleChange={this.handleChange}
            deletePrompt={this.deletePrompt}
            deleteInput={this.deleteInput}
            addInput={this.addInput}
            deleteOption={this.deleteOption}
            addOption={this.addOption} />
        </Dialog>

        <Card className={'survey-card-container'}>
          <CardHeader
            title={ <RaisedButton onClick={() => this.addSurvey()} label='Add Survey' primary={true} />}
          />
          <List>
            {this.state.surveys.map((survey, survey_index) => {
              return (
                <div key={`survey-list-item-${survey_index}`}>
                  <Divider inset={false} />
                  <ListItem
                    rightIconButton={
                      <IconMenu
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        iconButtonElement={
                          <IconButton
                            touch={true}
                            tooltip="more"
                            tooltipPosition="bottom-left">
                            <MoreVertIcon color={grey400} />
                          </IconButton>
                        }>
                        <MenuItem onClick={(e) => this.toggleModal(survey, survey_index)}>Edit</MenuItem>
                        <MenuItem onClick={(e) => this.deleteSurvey(survey_index)}>Delete</MenuItem>
                      </IconMenu>
                    }
                    primaryText={survey.name}
                  />
                </div>
              )
            })}
          </List>
        </Card>
      </div>
    )
  }
}

export default SurveyList