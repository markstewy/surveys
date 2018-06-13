import React, { Component } from 'react'
import axios from 'axios'
import './SurveyList.css'
import SurveyEditor from '../SurveyEditor/SurveyEditor'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'



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
        activeSurvey: JSON.parse('{}'),   //?????
        activeSurveyIndex: null             //?????
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
    axios.patch(`http://localhost:3100/editSurvey/${surveyIndex}`, {survey: editedSurvey})
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
        <h1>Survey List</h1>
        <br />
        <button onClick={() => this.addSurvey()}>Add Survey</button>
        <div className={'survey-card-container'}>
          {this.state.surveys.map((survey, survey_index) => {
            return (
              <Card key={`survey-list-item-${survey_index}`}>
                <CardHeader title={survey.name} />
                <CardActions>
                  <FlatButton onClick={(e) => this.toggleEdit(survey, survey_index)} label='Edit' />
                  <FlatButton onClick={(e) => this.deleteSurvey(survey_index)} label='Delete' />
                </CardActions>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SurveyList