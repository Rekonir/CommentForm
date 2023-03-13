//запуск после прогрузки страницы
window.onload = () => {
    // объявление переменных
    let area = null;
    let text = document.getElementsByClassName('comment__text')[0];

    let arrLike = []
    let like = document.getElementById('like')
    arrLike.push(like)

    let btn = document.getElementsByClassName('comment__btn')[0]
    let view = document.getElementsByClassName('view')[0]
    let error = document.getElementsByClassName('commet__error')[0]

    let mess = document.getElementsByClassName('message')[0]
    let nameInp = document.getElementsByClassName('comment__name')[0];
    let dateInp = document.getElementsByClassName('comment__date')[0];


    // создание бокса для ввода текста
    text.onclick = function () {
        editStart();
    };

    //*активация и деактивация при клике
    function editStart() {
        area = document.createElement('textarea');
        area.className = 'comment__edit';
        area.value = text.innerHTML;
        area.onkeydown = function (event) {
            if (event.key == 'Enter') {
                this.blur();
            }
        };
        area.onblur = function () {
            editEnd();
        };
        text.replaceWith(area);
        area.focus();
    }

    //*замена текста в первоначальном окне
    function editEnd() {
        if (area.value != "") { text.innerHTML = area.value; }
        else { text.innerHTML = "Текст" }
        area.replaceWith(text);
    }

    //удаление сообщения при клике
    view.onclick = function (event) {
        if (event.target.className != 'del') return;
        let delMess = event.target.closest('.message')
        delMess.remove()
    }

    // система эвентов при нажатии на кнопку
    btn.onclick = function () {
        // *дублирование элемента div.message с дочками
        let cloneMess = mess.cloneNode(true)

        // *перенос и проверка Имени
        let nameMess = cloneMess.querySelector('.name')
        nameMess.innerHTML = nameInp.value
        if (nameMess.innerHTML == "" || nameMess.innerHTML.length > 18) error.style.display = 'block'
        else error.style.display = 'none';

        //*перенос и проверка времени (-10800000 - адаптация под часовой пояс)
        let timeMess = cloneMess.querySelector('.time')
        let now = new Date()
        let nowH = now.getHours()
        if (nowH < 10) nowH = '0' + nowH;
        let nowM = now.getMinutes()
        if (nowM < 10) nowM = '0' + nowM;
        let nowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1 - 1).getTime() //**перевод на начало дня
        let yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).getTime()
        let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime()

        switch (dateInp.valueAsNumber - 10800000) {
            case nowStart:
                timeMess.innerHTML = `Сегодня, ${nowH}:${nowM} по МСК`
                break
            case yesterday:
                timeMess.innerHTML = `Вчера, ${nowH}:${nowM} по МСК`
                break
            case tomorrow:
                timeMess.innerHTML = `Завтра, ${nowH}:${nowM} по МСК`
                break
            case dateInp.valueAsNumber - 10800000:
                timeMess.innerHTML = `${dateInp.value}, ${nowH}:${nowM} по МСК`
                break
            default:
                timeMess.innerHTML = `Сегодня, ${nowH}:${nowM} по МСК`
                break
        }

        // *перенос текста
        let textMess = cloneMess.querySelector('.content__text')
        textMess.textContent = text.textContent

        //*создание кнопки лайк и перенос её в общий массив arrLike
        let newLike = cloneMess.querySelector('.like')
        newLike.checked = false
        let newLikeLabel = cloneMess.querySelector('.like__label')
        arrLike.push(newLike)
        newLike.id = `like${arrLike.length}`
        newLikeLabel.htmlFor = `${newLike.id}`
        //создание блока message
        if (error.style.display != 'block') {
            view.append(cloneMess)
            view.scrollTop = view.scrollHeight
        }
    }

}