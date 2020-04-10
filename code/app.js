// Express server config

var express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'));
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));

// -----------------------------------------------------------------------------------

//starting it up
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// somewhat dangerous global variables that I haven't sorted out yet.
var amznWorkId;
var json;

//self explanatory
function getDate() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

function writeSaveJSON(results) {
    let data_final = JSON.stringify(results, null, 2);
    var filepath = "data/user_" + amznWorkId + ".json";
    fs.writeFileSync(filepath, data_final, (err) => {
        if (err) throw err;
    })
}

function makeRandId(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// --------------------------------- PRE-EXPERIMENT ------------------------------------------
//get's worker ID from first screen and adds it to the json structure
app.post('/workerid', function(req, res) {
    //not reall the worker id, randomly generated string
    amznWorkId = req.body.workerid;
    amznWorkId = makeRandId(5);
    var datetime = getDate();
    json = {
        "user_data": [
        {
            "id": amznWorkId,
            "datetime": datetime
        }]
    }
    return res.redirect('2_consent/consent.html');
});

app.post('/consentResponse', function(req, res) {
    var consentResponse = req.body.resp;
    json.user_data[0]["consent_resp"] = consentResponse;
    if (consentResponse == "yes") {
        return res.redirect('/2_consent/loc_check.html');
    } else {
        let data_final = JSON.stringify(json, null, 2);
        var filepath = "data/user_" + amznWorkId + ".json";
        fs.writeFileSync(filepath, data_final, (err) => {
            if(err) throw err;
        });
        return res.redirect('8_bye/debrief.html');
    } 
});


app.post('/loc', function(req, res) {
    var loc_resp = req.body.loc;
    if (loc_resp == "yes") {
        json.user_data[0]["loc_check"] = loc_resp;
        return res.redirect('/4_video_tutorial/prequiz.html');
    } else {
        json.user_data[0]["loc_check"] = loc_resp;
        let data_final = JSON.stringify(json, null, 2);
        var filepath = "data/user_" + amznWorkId + ".json";
        fs.writeFileSync(filepath, data_final, (err) => {
            if(err) throw err;
        });
        return res.redirect('8_bye/debrief.html');
    }
});

app.post('/done_video', function(req, res) {
    return res.redirect('/4_video_tutorial/prequiz.html');
});

app.post('/prequiz_ready', function(req, res) {
    return res.redirect('/5_quiz_practice/practice.html');
});

app.post('/answer_practice', function(req, res) {
    var pqa_response =  [
    {
        practice_answer:req.body.pqa,
        practice_describe:req.body.describe
    }]
    json.user_data[0]["pqa_response"] = pqa_response;
    return res.redirect('/6_experiment/pre_exp.html');
});

// --------------------------------- EXPERIMENT ------------------------------------------
// starting the experiment and the start and end time calculations! (miliseconds)
var start = ""

app.post('/exp_ready', function(req, res) {
    start = new Date();
    return res.redirect('/6_experiment/voyager.html');
});

app.post('/exp_1', function(req, res) {
    var end = new Date();
    var time = end - start;
    var exp1_resp =  [
    {
        exp1:req.body.qe1,
        exp1_describe:req.body.describe,
        timeto:time
    }]
    json.user_data[0]["exp1"] = exp1_resp;
    return res.redirect('/6_experiment/exp1_diff.html');
});

app.post('/exp1_diff', function(req, res) {

    var exp1_diff =  [
    {
        1:req.body.diff1_1,
        2:req.body.diff1_2,
        3:req.body.diff1_3,
        4:req.body.diff1_4,
        5:req.body.diff1_5
    }]
    json.user_data[0]["exp1_diff"] = exp1_diff;
    start = new Date();
    return res.redirect('/6_experiment/voyager2.html');
});

// --------------------------------- ROUND 2:

app.post('/exp_2', function(req, res) {
    var end = new Date();
    var time = end - start;
    var exp2_resp =  [
    {
        exp2_var:req.body.qe2,
        exp2_agg:req.body.qe2_agg,
        exp2_describe:req.body.describe,
        timeto:time
    }]
    json.user_data[0]["exp2"] = exp2_resp;
    return res.redirect('/6_experiment/exp2_diff.html');
});

app.post('/exp2_diff', function(req, res) {
    start = new Date();
    var exp2_diff =  [
    {
        1:req.body.diff2_1,
        2:req.body.diff2_2,
        3:req.body.diff2_3,
        4:req.body.diff2_4,
        5:req.body.diff2_5
    }]
    json.user_data[0]["exp2_diff"] = exp2_diff;
    return res.redirect('/6_experiment/voyager3.html');
});


// --------------------------------- ROUND 3:
app.post('/exp_3', function(req, res) {
    var end = new Date();
    var time = end - start
    var exp3_resp =  [
    {
        exp3a:req.body.qe3a,
        exp3b:req.body.qe3b,
        exp3_describe:req.body.describe,
        timeto:time
    }]
    json.user_data[0]["exp3"] = exp3_resp;
    return res.redirect('/6_experiment/exp3_diff.html');
});

app.post('/exp3_diff', function(req, res) {

    var exp3_diff =  [
    {
        1:req.body.diff3_1,
        2:req.body.diff3_2,
        3:req.body.diff3_3,
        4:req.body.diff3_4,
        5:req.body.diff3_5
    }]
    json.user_data[0]["exp3_diff"] = exp3_diff;

    let data_final = JSON.stringify(json, null, 2);
    var filepath = "data/user_" + amznWorkId + ".json";
    fs.writeFileSync(filepath, data_final, (err) => {
        if(err) throw err;
    });

    return res.redirect('/3_demogs/demogs.html');//!!!!!!!!
});


// --------------------------------- POST SURVEY:

app.post('/demogs', function(req, res) {
    var demogs_resps =[
    {
        1:req.body.one,
        2:req.body.two,
        3:req.body.three,
        4:req.body.four,
        5:req.body.five,
        6:req.body.six
    }]
    json.user_data[0]["demogs_resps"] = demogs_resps;
    return res.redirect('/7_post_survey/feedback.html');
});

//--------------------------------??

app.post('/feedback', function(req, res) {
    var feedback =[
    {
        1:req.body.open,
    }]

    json.user_data[0]["post_survey_results"] = feedback;
    let data_final = JSON.stringify(json, null, 2);
    var filepath = "data/user_" + amznWorkId + ".json";
    fs.writeFileSync(filepath, data_final, (err) => {
        if(err) throw err;
    });

    return res.redirect('/8_bye/debrief.html');
});

app.post('/debrief', function(req, res) {

    return res.redirect('https://www.mturk.com/');
});


function sendToLog(results) {
    //add convo data to json structure
    json.user_data[0]["convo"] = results;
    //stringify that json structure for writing
    let dataToWrite = JSON.stringify(json, null, 2);
    //gather filename for writing
    var filename = "data/user_" + amznWorkId + ".json";
    //write the json structure to a file
    fs.writeFileSync(filename, dataToWrite, (err) => {
        if(err) throw err;
        console.log("success!");
    });
}


function reopenAndWriteTheRest(amznWorkId) {
    var filename = "data/user_" + amznWorkId + ".json";
    fetch("filename")
    .then(response => response.json());
}