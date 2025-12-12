fetch('https://co2-fussabdruck.github.io/data.json')
    .then((response) => response.json())
    .then((json) => {
        console.log("xxx", json)
        for (let i = 0; i < json.questions.length; i++) {
            if (json.questions[i].type == "range") {
                range(json.questions[i].text, json.questions[i].min, json.questions[i].max)
            } else if (json.questions[i].type == "checkbox") {
                const answers = []
                for (let j = 0; j < json.questions[i].options.length; j++) {
                    answers.push([json.questions[i].options[j].text, json.questions[i].options[j].value])
                }
                checkbox(json.questions[i].text, answers)
            } else if (json.questions[i].type == "radio") {
                const answers = []
                for (let j = 0; j < json.questions[i].options.length; j++) {
                    answers.push([json.questions[i].options[j].text, json.questions[i].options[j].value])
                }
                radio(json.questions[i].text, answers)
            } else if (json.questions[i].type == "result_button") {
                const percentages = []
                for (let j = 0; j < json.answers.length; j++) {
                    percentages.push([json.answers[j].percentage, json.answers[j].text])
                }
                result_button(json.questions[i].text, percentages,json.alert_message)
            }
        }
    });

