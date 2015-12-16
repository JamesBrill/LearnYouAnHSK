let express = require('express');
let app = express();
let memoryWords = require("../vocabulary/memory-words.json");

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/static'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/words/:id', function(request, response) {
  let hskVersions = request.params.id.split(',');
  let wordsToSend = [];
  for (let i = 0; i < hskVersions.length; i++) {
    if (memoryWords[hskVersions[i]]) {
      wordsToSend = wordsToSend.concat(memoryWords[hskVersions[i]]);
    }
  }
  if (wordsToSend.length > 0) {
    response.json(wordsToSend);
  }
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
