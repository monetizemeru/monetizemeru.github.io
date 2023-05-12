/*  Файл с переводом */
(function () {
    var langStrings = {"ru":{"iframe":{"[feature/mfront-123-new-iframe]Благодаря этой рекламе вы слушаете музыку бесплатно":"Благодаря этой рекламе вы слушаете музыку бесплатно","[feature/mfront-123-new-iframe]Войдите, и мы сможем рекомендовать вам похожую музыку.":"Войдите, и мы сможем рекомендовать вам похожую музыку.","[feature/mfront-123-new-iframe]Войти":"Войти","[feature/mfront-123-new-iframe]Добавить в «Мою музыку»":"Добавить в «Мою музыку»","[feature/mfront-123-new-iframe]Играть":"Играть","[feature/mfront-123-new-iframe]Открыть в приложении":"Открыть в приложении","[feature/mfront-123-new-iframe]Ошибочка вышла 😱":"Ошибочка вышла 😱","[feature/mfront-123-new-iframe]Пауза":"Пауза","[feature/mfront-123-new-iframe]Перезагрузить страницу":"Перезагрузить страницу","[feature/mfront-123-new-iframe]Реклама":"Реклама","[feature/mfront-123-new-iframe]Трек не доступен":"Трек не доступен","[feature/mfront-123-new-iframe]Удалить из «Моей музыки»":"Удалить из Коллекции","[feature/mfront-123-new-iframe]Яндекс&nbsp;Музыка":"Яндекс&nbsp;Музыка","[feature/mfront-123-new-iframe]Яндекс.Музыка":"Яндекс.Музыка","[feature/mfront-1286]Плейлист":"Плейлист","[feature/mfront-1286]Следующий трек":"Следующий трек","[feature/mfront-1331-preview]Сейчас играют отрывки треков.":"Сейчас играют отрывки треков.","[feature/mfront-1331-preview]Хочу целиком":"Хочу целиком","[feature/mfront-3300]Оформить подписку":"Оформить подписку","[feature/mfront-3300]Слушайте любые треки с подпиской на Яндекс.Музыку":"Слушайте любые треки с подпиской на Яндекс.Музыку","[feature/mfront-3924]Яндекс Музыка":"Яндекс Музыка","[feature/mfront-3924]Яндекс.Музыка":"Яндекс.Музыка","[feature/mfront-3990-1]Яндекс&nbsp;Музыка":"Яндекс&nbsp;Музыка","[feature/mfront-4200-1]Яндекс Музыка":"Яндекс Музыка","[feature/shots-in-web]Реклама":"Реклама","[feature/shots-in-web]Шот":"Шот","[feature/shots-in-web]Шот от Алисы":"Шот от Алисы","[feature/shots-in-web]от Алисы":"от Алисы"},"calendar":{"января":"января","Январь":"Январь","февраля":"февраля","Февраль":"Февраль","марта":"марта","Март":"Март","апреля":"апреля","Апрель":"Апрель","мая":"мая","Май":"Май","июня":"июня","Июнь":"Июнь","июля":"июля","Июль":"Июль","августа":"августа","Август":"Август","сентября":"сентября","Сентябрь":"Сентябрь","октября":"октября","Октябрь":"Октябрь","ноября":"ноября","Ноябрь":"Ноябрь","декабря":"декабря","Декабрь":"Декабрь","понедельник":"понедельник","вторник":"вторник","среда":"среда","четверг":"четверг","пятница":"пятница","суббота":"суббота","воскресенье":"воскресенье","в понедельник":"в понедельник","во вторник":"во вторник","в среду":"в среду","в четверг":"в четверг","в пятницу":"в пятницу","в субботу":"в субботу","в воскресенье":"в воскресенье"}}};
    var stripBranchPrefix = function (key) {
    return key ? key.replace(/^\[[^\]]+\]/, '') : '';
};
    var i18nLang = "ru";
    var i18nSetLang = function (lang) {
    if (lang) {
        i18nLang = lang;
    }
};
    var i18nTranslate = function (keyset, key) {
    var args = arguments;
    var returnedKey = key;

    var newMode = /^[a-zA-Z0-9\-.]+$/.test(keyset) && key;

    if (newMode) {
        if (
            typeof langStrings !== 'undefined' &&
            langStrings[i18nLang] &&
            langStrings[i18nLang][keyset] &&
            typeof langStrings[i18nLang][keyset][key] !== 'undefined'
        ) {
            returnedKey = langStrings[i18nLang][keyset][key];
        } else {
            returnedKey = stripBranchPrefix(key);
        }
    } else {
        returnedKey = stripBranchPrefix(keyset);
    }

    var interpolatedArgs = Array.prototype.slice.call(args, 1 + (newMode ? 1 : 0));

    // Новый переводчик хранит ключи для числительных прямо массивом, а не строкой
    // поэтому интерполяцию %1, %2, ..., %d для массивов не делаем
    if (interpolatedArgs.length && !Array.isArray(returnedKey)) {
        // Точно объект, работаем как с именованными заменами
        if (typeof interpolatedArgs[0] === 'object' && !Array.isArray(interpolatedArgs[0])) {
            returnedKey = returnedKey.replace(/%([a-zA-Zа-яА-ЯеЁ0-9\-]+)/g, function (_, id) {
                // суть именованных заменам, что их в переводе может и не быть
                // в этом случае возвращаем пустую строку
                return interpolatedArgs[0][id] || '';
            });
            // Работаем по-старинке %1, %2,.. %n
        } else {
            returnedKey = returnedKey.replace(/%(\d+)/g, function (_, id) {
                // с цифровыми такое не прокатит, если не передали,
                // то что-то не так, возвращаем undefined если нет ключа
                return interpolatedArgs[+id - 1];
            });
        }
    }

    if (returnedKey && !Array.isArray(returnedKey) && returnedKey.indexOf('|') > -1) {
        return returnedKey.split('|');
    }

    return returnedKey;
};
    if(typeof window === "undefined" && module.exports){
        module.exports = {
            translate: i18nTranslate,
            setLang: i18nSetLang
        }
    } else {
        window.i18nTranslate = i18nTranslate;
        window.i18nSetLang = i18nSetLang;
    }
})()