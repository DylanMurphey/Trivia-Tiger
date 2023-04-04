const openTDBapi = 'https://opentdb.com/api.php?amount=1&type=multiple&encode=base64';

function cleanupTrivia(input) {
    const quizQuestion = {};
    quizQuestion.choices = {};
    
    quizQuestion.correct = Math.floor(Math.random() * 4);
    quizQuestion.question = Buffer.from(input.results[0].question,'base64').toString('utf-8');
    quizQuestion.category = Buffer.from(input.results[0].category,'base64').toString('utf-8');;
    
    // thinking emoji at beginning of question
    quizQuestion.thumbnail = 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/53/thinking-face_1f914.png';
    
    let currentFalse = 0;
    for(let i = 0; i < 4; i++) {
        if(i == quizQuestion.correct) {
            quizQuestion.choices[i] = Buffer.from(input.results[0].correct_answer,'base64').toString('utf-8');
        }
        else {
            quizQuestion.choices[i] = Buffer.from(input.results[0].incorrect_answers[currentFalse],'base64').toString('utf-8');
            currentFalse++;
        }
    }

    return quizQuestion;
}

module.exports = {
    GetQuestions: async function GetQuestions(interaction){
        const getData = async url => {
            try {
                const response = await fetch(url);
                const json = await response.json();

                const quizQuestion = cleanupTrivia(json);

                return quizQuestion;
            }
            catch (error) {
                console.log(error);
            }
        };

        let question = await getData(openTDBapi);
        return question;
    }
    }
