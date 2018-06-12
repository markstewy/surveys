import React, { Component } from 'react'
import './SurveyList.css'
import SurveyEditor from '../SurveyEditor/SurveyEditor'
import axios from 'axios'


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
    e.preventDefault()
    axios.patch(`http://localhost:3100/editSurvey/${surveyIndex}`, {survey: editedSurvey})
    .then(res => {
      const surveys = this.state.surveys.slice()
      surveys.splice(this.state.activeSurveyIndex, 1, res.data)
      this.setState({
          edit: !this.state.edit,
          surveys: surveys
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
        surveys: surveys
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
        <div className={'survey-card-container'}>
          {this.state.surveys.map((survey, survey_index) => {
            return (
              <div key={`survey-list-item-${survey_index}`} className={'survey-card'}>
                <div>
                  {survey.name}
                </div>
                <div>
                  <button onClick={(e) => this.toggleEdit(survey, survey_index)}>edit</button>
                  <button onClick={(e) => this.deleteSurvey(survey_index)}>delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SurveyList