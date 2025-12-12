let lc = 0;
let rc = 0;
let radioGroupCounter = 0;
const radioGroups = [];

function show_alert(alert_message) {
    const dialog = document.getElementById("myDialog")
    const dialog_text = document.getElementById("dialogText")
    dialog_text.innerText = alert_message
    dialog.showModal()
}

/* === Range-Frage === */
function range(text, min = 1, max = 5) {
    const div = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = text;

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    const rangeId = "range" + rc++;
    input.id = rangeId;

    const label = document.createElement("label");
    label.id = "label" + lc++;
    label.htmlFor = rangeId;
    label.innerText = input.value;

    input.addEventListener("input", () => {
        label.innerText = input.value;
    });

    div.appendChild(p);
    div.appendChild(input);
    div.appendChild(label);

    document.body.appendChild(div);
}

/* === Checkbox-Gruppe === */
function checkbox(text, options) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = text;
    div.appendChild(p);

    for (let i = 0; i < options.length; i++) {
        const [labelText, value] = options[i];
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = value;
        checkbox.id = "checkbox" + i;

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = labelText;

        div.appendChild(checkbox);
        div.appendChild(label);
        div.appendChild(document.createElement("br"));
    }

    document.body.appendChild(div);
}

/* === Radio-Gruppe === */
function radio(text, options) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = text;
    div.appendChild(p);

    const groupName = "radioGroup" + radioGroupCounter++;
    radioGroups.push(groupName);

    for (let i = 0; i < options.length; i++) {
        const [labelText, value] = options[i];
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.value = value;
        radio.name = groupName;
        radio.id = groupName + "_" + i;

        const label = document.createElement("label");
        label.htmlFor = radio.id;
        label.textContent = labelText;

        div.appendChild(radio);
        div.appendChild(label);
        div.appendChild(document.createElement("br"));
    }

    document.body.appendChild(div);
}

/* === Ergebnis-Button === */
function result_button(text, percentages,alert_message) {
    const div = document.createElement("div");
    const button = document.createElement("button");
    button.textContent = text;

    button.addEventListener("click", () => {
        result(percentages,alert_message);
    });

    div.appendChild(button);
    document.body.appendChild(div);
}

/* === Ergebnis-Berechnung === */
function result(percentages,alert_message) {
    let checked_radio_count = 0
    radioGroups.forEach(name => {
        const checked_radio = document.querySelector(`input[type=radio][name='${name}']:checked`)
        if (checked_radio) {
            checked_radio_count++
        }
    });
    console.log(checked_radio_count,radioGroups.length)
    if (checked_radio_count >= radioGroups.length - 1) {
        let value = 0;
        let max_value = 0;

        // Ranges
        const ranges = document.querySelectorAll("input[type=range]");
        ranges.forEach(r => {
            value += Number(r.value) - Number(r.min);
            max_value += Number(r.max) - Number(r.min);
        });

        // Checkboxes
        const allCheckboxes = document.querySelectorAll("input[type=checkbox]");
        allCheckboxes.forEach(cb => {
            max_value += Number(cb.value);
            if (cb.checked) value += Number(cb.value);
        });

        // Radios
        const checkedRadios = document.querySelectorAll("input[type=radio]:checked");
        checkedRadios.forEach(r => {
            value += Number(r.value);
        });

        // Radio-Gruppen Max
        radioGroups.forEach(name => {
            const group = document.querySelectorAll(`input[name='${name}']`);
            let highest = 0;
            group.forEach(r => {
                if (Number(r.value) > highest) highest = Number(r.value);
            });
            max_value += highest;
        });

        // Prozentuale Bewertung
        const percentage = value / max_value;
        let nearest = percentages[0];
        let minDiff = Math.abs(percentage - percentages[0][0] / 100);

        for (let i = 1; i < percentages.length; i++) {
            const diff = Math.abs(percentage - percentages[i][0] / 100);
            if (diff < minDiff) {
                minDiff = diff;
                nearest = percentages[i];
            }
        }
        document.body.innerHTML = "<div class='result-container'>"+nearest[1]+"</div>"
        
    } else {
        show_alert(alert_message)
    }
}

