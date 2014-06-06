var Proprio = {
    'prepositions': [],
    'currentPreposition': null
};

Proprio['attach'] = function (id, event, fnc) {

    var el = document.getElementById(id);

    if (el == null) {
        return false;
    }

    if (el.addEventListener) {
        el.addEventListener("on" + event, fnc, false);
    } else {
        el.attachEvent("on" + event, fnc);
    }

    return true;
};

Proprio['findElement'] = function (id) {
    var el = document.getElementById(id);

    if (!el) {
        console.error("Could not find element with id " + id);
        return false;
    }

    return el;
};

Proprio['getNextPreposition'] = function () {
    var index = Math.floor((Math.random() * (this.prepositions.length - 1)) + 0);
    return this.prepositions[index];
};

Proprio['setQuestion'] = function () {

    this.currentPreposition = this.getNextPreposition();
    this.findElement('preposition').innerText = this.currentPreposition.preposition;
    this.findElement('person').innerText = this.currentPreposition.pronoun;
    this.findElement('answer').focus();
};

Proprio['onAnswerSubmit'] = function (form) {
    var answer = this.findElement('answer');
    var messageBox = this.findElement("message");

    if (answer.value == this.currentPreposition.composition) {
        messageBox.className = ('greenShadow');
        messageBox.innerText = "Correct";
        this.fade(messageBox);

    } else {
        messageBox.className = ('redShadow');
        messageBox.innerText = this.currentPreposition.composition;
        this.fade(messageBox);
    }

    this.setQuestion();
    answer.value = '';

    return false;
};
Proprio['fade'] = function (element) {
    this.fadeIn(element, this.fadeOut);
};

Proprio['fadeIn'] = function (element, callback) {
    var op = 0.1;
    element.style.display = 'block';

    var timer = setInterval(function () {
        if (op >= 1) {
            console.log("Canceling fadeIn: " + op);
            clearInterval(timer);

            if (callback) {
                callback(element);
            }
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 30);
    return this;
};

Proprio['fadeOut'] = function (element, callback) {
    var op = 1;

    var timer = setInterval(function () {
        if (op <= 0.1) {
            console.log("Canceling fadeOut: " + op + "\n");
            clearInterval(timer);
            element.style.display = 'none';

            if (callback) {
                callback();
            }
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 30);

    return this;
};