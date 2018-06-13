import React, { Component } from 'react'
import SurveyList from './components/SurveyList/SurveyList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <SurveyList />
      </MuiThemeProvider>
    );
  }
}

export default App
