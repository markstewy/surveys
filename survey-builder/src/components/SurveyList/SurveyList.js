import React, { Component } from 'react'
import axios from 'axios'
import SurveyEditor from '../SurveyEditor/SurveyEditor'
import './SurveyList.scss'

import { Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { grey400 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'



class SurveyList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      surveys: [],
      surveysOriginal: '',
      edit: false,
      activeSurvey: {},
      activeSurveyIndex: ''
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.saveSurvey = this.saveSurvey.bind(this)
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

  toggleEdit(survey, survey_index) {
    if (!survey) {
      this.setState({
        surveys: JSON.parse(this.state.surveysOriginal),
        edit: !this.state.edit,
        activeSurvey: JSON.parse('{}'),   
        activeSurveyIndex: null
      })
    } else {
      this.setState({
        edit: !this.state.edit,
        activeSurvey: survey,
        activeSurveyIndex: survey_index
      })
    }
  }

  saveSurvey(e, editedSurvey, surveyIndex) {
    axios.patch(`http://localhost:3100/editSurvey/${surveyIndex}`, { survey: editedSurvey })
      .then(res => {
        const surveys = this.state.surveys.slice()
        surveys.splice(this.state.activeSurveyIndex, 1, res.data)
        this.setState({
          edit: !this.state.edit,
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

  render() {
    return (
      <div>
        {this.state.edit ? <SurveyEditor activeSurvey={this.state.activeSurvey} activeSurveyIndex={this.state.activeSurveyIndex} toggleEdit={this.toggleEdit} saveSurvey={this.saveSurvey} /> : null}
        <Card className={'survey-card-container'}>
          <CardHeader
            title='Survey Manager'
          />
          <RaisedButton onClick={() => this.addSurvey()} label='Add' primary={true} />
          <List>
          {this.state.surveys.map((survey, survey_index) => {
            return (
              <div key={`survey-list-item-${survey_index}`}>
                <Divider inset={false} />
                <ListItem
                  rightIconButton={
                    <IconMenu iconButtonElement={
                      <IconButton
                      touch={true}
                      tooltip="more"
                      tooltipPosition="bottom-left">
                      <MoreVertIcon color={grey400} />
                    </IconButton>
                    }>
                      <MenuItem onClick={(e) => this.toggleEdit(survey, survey_index)}>Edit</MenuItem>
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