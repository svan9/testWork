function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
    return this;
};

function addQuestion(array) {
    for (let i = 0; i < array.length; i++) {
        /**
         * @type {Array<String>}
         */
        let new_q = array[i].answers.insert(getRandomInt(1, 4), array[i].trueAnsw);
        document.getElementById("test").innerHTML += `
        <div class="question" name="${i+1}">
        <label>${i+1}. ${array[i].name}</label>
            <div class="answers">
                <label><input type="radio" value="${new_q[0]}" name="${i+1}" checked>${new_q[0]}</label>
                <label><input type="radio" value="${new_q[1]}" name="${i+1}">${new_q[1]}</label>
                <label><input type="radio" value="${new_q[2]}" name="${i+1}">${new_q[2]}</label>
                <label><input type="radio" value="${new_q[3]}" name="${i+1}">${new_q[3]}</label>
            </div>
        </div>`;
    };
    document.getElementById("test").innerHTML += `
    <button id="check">ОТПРАВИТЬ</button>
    `;
    $("#check").on("click", function() {
        const input = document.querySelectorAll("input[type=radio]");
        const quest = document.getElementById("test").children;
        let arr = [];
        input.forEach(e => {
            if (arr[e.name-1] == undefined) arr.push([]);
            arr[e.name-1].push(e);
           
        });
        let outvar = [];
        arr.forEach(e => {
            for (let i in e) {
                if (e[i].checked)
                {
                    outvar.push(e[i].value);
                }
            }
        });
        for (let i = 0; i < array.length; i++) {
            if (array[i].trueAnsw == outvar[i]) {
                quest[i].style.border = "1px solid green";
            } else {
                quest[i].style.border = "1px solid red";
            }
        }
        
    });
    $("#check-true").on("click", function() {
        document.body.innerHTML = `
        1. Как аббревиатура переводится на русский:<br>
        сокращение<br>
        2. сложение двух и более слов и последующее их сокращение называется<br>
        аббревиация <br>
        3. Графическое сокращение - это<br>
        слово записывается кратко, но произносится полностью<br>
        4. Усечением называется<br>
        образование нового слова путем отбрасывания конечной части исходного слова. <br>
        5. сложение двух и более слов и последующее их сокращение называется<br>
        образование нового слова путем отбрасывания конечной части исходного слова. <br>
        6. как парильно произноситься СССР в официальной речи<br>
        эс-эс-эс-эр<br>
        7. Как парвильно проихноситься аббревиатура ГУМ<br>
        г-у-м<br>
        8. Поставте ударение правильно в аббревиатуре ЖКХ<br>
        жэ-ка-ХА<br>
        `
    });
}