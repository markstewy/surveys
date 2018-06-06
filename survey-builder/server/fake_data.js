module.exports = [
  {
    id: 1234,
    name: 'Survey 1',
    prompts: [
      {
        promptText: 'Which store location did you visit?',
        inputs: [
          {
            type: 'dropdown',
            label: '',
            placeholder: 'Provo',
            options: [
              {
                text: 'Salt Lake Cty',
                value: '41g41g241a235'
              },
              {
                text: 'San Francisco',
                value: '414e97g79s35'
              },
              {
                text: 'Seattle',
                value: '41g41g241a235'
              }
            ]
          }
        ]
      },
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
      },
    ]
  },
  {
    id: 5678,
    name: 'Survey 2',
    prompts: [
      {
        promptText: 'What was the name of your server?',
        inputs: [
          {
            type: 'short_text',
            label: 'First Name',
            placeholder: '',
            options: []
          },
          {
            type: 'short_text',
            label: 'Last Name',
            placeholder: '',
            options: []
          }
        ]
      },
      {
        promptText: 'How satisfied are you with your service?',
        inputs: [
          {
            type: 'multiple_choice',
            label: '',
            placeholder: 'neither satisfied nor dissatisfied',
            options: [
              {
                text: 'very satisfied',
                value: '5'
              },
              {
                text: 'niether satisfied nor dissatisfied',
                value: '3'
              },
              {
                text: 'very dissatisfied',
                value: '1'
              },
            ]
          }
        ]
      },
    ]
  }
]
