/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const watson = require('watson-developer-cloud'); // watson sdk

// Create the service wrapper
const conversation = watson.conversation({
  // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
   username: '<user-name>',//enter credentials
  password: '<password>',//enter credentials
  version_date: '2016-10-21',
  version: 'v1'
});

const tone_analyzer = watson.tone_analyzer({
  username: '<user-name>',//enter credentials
  password: '<password>',//enter credentials
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
  version: 'v3',
  version_date: '2016-05-19'
});

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */
const updateMessage = (input, response) => {
  var responseText = null;
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
  if (response.intents && response.intents[0]) {
    var intent = response.intents[0];
    // Depending on the confidence of the response the app can return different messages.
    // The confidence will vary depending on how well the system is trained. The service will always try to assign
    // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
    // user's intent . In these cases it is usually best to return a disambiguation message
    // ('I did not understand your intent, please rephrase your question', etc..)
    if (intent.confidence >= 0.75) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if (intent.confidence >= 0.5) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }
  response.output.text = responseText;
  return response;
};


module.exports = function(app) {

  app.post('/api/message', (req, res) => {
    const workspace = process.env.WORKSPACE_ID || '<workspace-id>';//enter credentials

    if (!workspace || workspace === '<workspace-id>') {
      return res.json({
        output: {
          text: 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' +
            '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> ' +
            'documentation on how to set this variable. <br>' +
            'Once a workspace has been defined the intents may be imported from ' +
            '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> ' +
            'in order to get a working application.'
        }
      });
    }
    const payload = {
      workspace_id: workspace,
      context: {},
    input: {}
    };
    if ( req.body ) {
    if ( req.body.input ) {
      payload.input = req.body.input;
    }
    if ( req.body.context ) {
      // The client must maintain context/state
      payload.context = req.body.context;
    }

  }
  callconv(payload);
// Send the input to the conversation service
// Send the input to the conversation service
function callconv(payload) {
var query_input = JSON.stringify(payload.input);
var context_input = JSON.stringify(payload.context);

tone_analyzer.tone({
  text : query_input,
  tones : 'emotion'
}, function(err, tone) {
  var tone_anger_score = '';
  if (err) {
    console.log('Error occurred while invoking Tone analyzer. ::', err);
    //return res.status(err.code || 500).json(err);
  } else {
    var emotionTones = tone.document_tone.tone_categories[0].tones;

    var len = emotionTones.length;
    for (var i = 0; i < len; i++) {
      if (emotionTones[i].tone_id === 'anger') {
        console.log('Emotion_anger', emotionTones[i].score);
        tone_anger_score = emotionTones[i].score;
        tone_type=emotionTones[i].tone_id;
        break;
      }
    }

  }

  payload.context['tone_anger_score'] = tone_anger_score;
  payload.context['tone_type'] = tone_type;

  conversation.message(payload, function(err, data) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }else{
      //lookup actions
        if (err) {
          return res.status(err.code || 500).json(err);
        }else{
          //console.log('sending response', JSON.stringify(data,null,2));
          return res.json(data);
        }

    }
  });


});
}


  });
};
