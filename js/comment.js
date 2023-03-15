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
        if (area.value != "") text.innerHTML = area.value;
        else text.innerHTML = "Текст"
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
        //объявление блоков без атрибутов
        let message = document.createElement('div')
        message.className = 'message'
        let content = document.createElement('div')
        content.className = 'content'
        let contentName = document.createElement('div')
        contentName.className = 'content__nameTime'
        let tools = document.createElement('div')
        tools.className = 'tools'
        let del = document.createElement('div')
        del.className = 'del'

        // объявление, перенос и проверка Имени
        let messageName = document.createElement('div')
        messageName.className = 'name'
        messageName.innerHTML = nameInp.value
        if (messageName.innerHTML == "" || messageName.innerHTML.length > 18) error.style.display = 'block'
        else error.style.display = 'none';

        //объявление, перенос и проверка времени (-10800000 - адаптация под часовой пояс)
        let messageTime = document.createElement('div')
        messageTime.className = 'time'
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
                messageTime.innerHTML = `Сегодня, ${nowH}:${nowM} по МСК`
                break
            case yesterday:
                messageTime.innerHTML = `Вчера, ${nowH}:${nowM} по МСК`
                break
            case tomorrow:
                messageTime.innerHTML = `Завтра, ${nowH}:${nowM} по МСК`
                break
            case dateInp.valueAsNumber - 10800000:
                messageTime.innerHTML = `${dateInp.value}, ${nowH}:${nowM} по МСК`
                break
            default:
                messageTime.innerHTML = `Сегодня, ${nowH}:${nowM} по МСК`
                break
        }
        //объявление и перенос текста
        let messageText = document.createElement('div')
        messageText.className = 'content__text'
        messageText.textContent = text.textContent

        //объявление, перенос и работа с лайками
        let like = document.createElement('input')
        like.className = 'like'
        like.setAttribute('id', `like${arrLike.length}`)
        like.setAttribute('type', 'checkbox')
        like.setAttribute('name', 'like')
        like.checked = false
        arrLike.push(like)

        // объявление лейбла
        let likeLabel = document.createElement('label')
        likeLabel.className = 'like__label'
        likeLabel.setAttribute('for', 'like')
        likeLabel.htmlFor = `${like.id}`

        // создание древа блоков Message
        contentName.appendChild(messageName)
        contentName.appendChild(messageTime)
        tools.appendChild(like)
        tools.appendChild(likeLabel)
        tools.appendChild(del)
        content.appendChild(contentName)
        content.appendChild(messageText)
        content.appendChild(tools)
        message.appendChild(content)

        //создание блока message
        if (error.style.display != 'block') {
            view.append(message)
            view.scrollTop = view.scrollHeight
        }
    }

}