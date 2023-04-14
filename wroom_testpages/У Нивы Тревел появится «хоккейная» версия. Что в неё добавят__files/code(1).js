(function(w, url, ads) {
	var ads = ads;
	var objects = [];
	var params = {
		'use_marked' : false
	};
	var skip = {
		'SCRIPT': 1,
		'NOSCRIPT': 1,
		'STYLE': 1,
		'H1': 1,
		'H2': 1,
		'H3': 1,
		'H4': 1,
		'H5': 1,
		'H6': 1,
		'BIG': 1,
		'A': 1,
		'TH': 1,
		'FIELDSET': 1,
		'TEXTAREA': 1,
		'SELECT': 1,
		'LEGEND': 1,
		'ACRONYM': 1,
		'ADDRESS': 1,
		'LABEL': 1
	};
	var bounds = '(^|$|[^0-9a-zA-Zа-яА-ЯёЁіІїЇ_])';
	var blocks = [];

	var prepareRegexp = function() {
		var i, j, n, w;
		for (i = 0; i < ads.length; ++i) {
			ads[ i ].k_reg = new Array();
			ads[ i ].k_arr = new Array();
			ads[ i ].k_hit = new Array();
			ads[ i ].n_arr = new Array();
			ads[ i ].n_reg = new Array();
			ads[ i ].n_hit = new Array();
			ads[ i ].r_plus = false;
			ads[ i ].r_minus = false;
			if (ads[ i ].k) {
				ads[ i ].k_arr = ads[ i ].k.split(';');
				for (j = 0; j < ads[ i ].k_arr.length; ++j) {
					w = ads[ i ].k_arr[ j ];
					if (w.substr(w.length - 1, 1) == '*')
						w = w.substr(0, w.length - 1) + '[0-9a-zA-Zа-яА-ЯёЁіІїЇ_]+';
					ads[ i ].k_reg[ j ] = new RegExp(bounds + '(' + w + ')' + bounds, 'ig');
				}
			}
			if (ads[ i ].n) {
				ads[ i ].n_arr = ads[ i ].n.split(';');
				for (j = 0; j < ads[ i ].n_arr.length; ++j) {
					n = ads[ i ].n_arr[ j ];
					if (n.substr(n.length - 1, 1) == '*')
						n = n.substr(0, n.length - 1) + '[0-9a-zA-Zа-яА-ЯёЁіІїЇ_]+';
					ads[ i ].n_reg.push(new RegExp(bounds + '(' + n + ')' + bounds, 'ig'));
				}
			}
		}
	};

	var scanBlocks = function(n, b) {
		if (n.nodeType == 3) {
			if (params.use_marked && !b)
				return;
			if (n.data.replace(/\s+/g, ""))
				blocks.push(n);
		} else {
			for (var i = n.firstChild; i != null; i = i.nextSibling) {
				if (skip[ i.nodeName.toUpperCase() ] == 1)
					continue;
				if (i.className) {
					if (params.use_marked && i.className.indexOf("_noreachbanner_") != -1)
						continue;
					if (params.use_marked && i.className.indexOf("_reachbanner_") != -1) {
						scanBlocks(i, true);
						continue;
					}
				}
				if (typeof(i.id)=="string" && i.id.indexOf("y5_direct") != -1)
					continue;
				if (typeof(i.id)=="string" && i.id.indexOf("ya_partner") != -1)
					continue;
				if (typeof n.style != 'undefined')
					if (n.style.display == 'none')
						return false;
				scanBlocks(i, b);
			}
		}
	};

	var scanWords = function() {
		var i, j, n, k, r, n, p, l;

		for (k = 0; k < blocks.length; ++k) {
			n = blocks[ k ];
			for (i = 0; i < ads.length; ++i) {

				for (j = 0; j < ads[ i ].k_arr.length; ++j) {
					r = ads[ i ].k_reg[ j ].exec(n.data);
					if (r != null) {
						p = r.index + r[ 1 ].length;
						l = r[ 2 ].length;
						ads[ i ].k_hit.push(n.data.substr(p, l))
						ads[ i ].r_plus = true;
					}
				}

				for (j = 0; j < ads[ i ].n_reg.length; ++j) {
					r = ads[ i ].n_reg[ j ].exec(n.data);
					if (r != null) {
						p = r.index + r[ 1 ].length;
						l = r[ 2 ].length;
						ads[ i ].n_hit.push(n.data.substr(p, l))
						ads[ i ].r_minus = true;
					}
				}
			}
		}
	};

	var sendResults = function() {
		var kwp = new Array();
		var kwm = new Array();
		for (var i = 0; i < ads.length; ++i) {
			var ad = ads[ i ];
			if (ad.r_plus)
				kwp.push(ad.bid);
			if (ad.r_minus)
				kwm.push(ad.bid);
		}
		var link = url + '&kwp=' + kwp.join(',') + '&kwm=' + kwm.join(',');
		if (typeof w._MT_jsLoadDelayed === 'function')
			w._MT_jsLoadDelayed(decodeURIComponent(link));
	};

	var run = function() {
		var n = document.getElementsByTagName('body')[ 0 ];
		prepareRegexp();
		scanBlocks(n);
		scanWords();
		sendResults();
	};

	run();
})(window, 'https%3A%2F%2Fcatsnetwork.ru%2Fcore%2Fcode.js%3Fpid%3D8836%26rid%3D266968%26rl%3Dhttps%253A%2F%2Fwroom.ru%2F%26ll%3Dhttps%253A%2F%2Fwroom.ru%2Fnews%2F14851%26ow%3D375%26oh%3D667%26sw%3D375%26sh%3D667%26pd%3D30',[ {'bid':78943,'k':'Апатия;Ароматерапия;Асан;Диафрагмальное дыхание;Йога-нидра;Кундалини-йога;Личностный рост;Мантры;Музыкотерапия;Нарушение пищевого поведения;Нарушения пищевого поведения;Неврозы;Нервное расстройство;Нервозность;Отвращение к работе;Переедание;Пилатес;Пищевые расстройства;Рабочий стресс;Расстройства пищевого поведения;Рейки;Рэйки;Самопознание;Самореализация;Синдром хронической усталости;Тантры;Трансцендентальная медитация;Хатха йога;Хатха-йога;Холотропное дыхание;Цигун;Эмоциональное выгорание;авитаминоз;акупунктура;апатия;асана;асаны;аутогенная тренировка;аутотренинг;бессонница;возбудимость;возбужденность;выгорание;дистресс;дыхательная техника;иглоукалывание;истощенность;йога;конфликт в семье;медитация;мигрень;мышечные спазмы;набор веса;недосып;недосыпание;нервозность;осознанность;паническая атака;панические атаки;перевозбуждение;переживание;перенапряжение;переутомиться;переутомление;плаксивость;подавленность;поза лотоса;проблема на работе;психическое состояние;психологическое напряжение;психология;психотерапия;раздраженность;раздражительность;расслабление;расслаблять;релаксация;рефлексивный;рефлексия;самовоспитание;самообразование;самопознание;саморазвитие;самосовершенствование;самосозерцание;самоусовершенствование;синдром усталости;сонливость;стресс;стрессовый;стрессы;тантра;тревожность;усталость;утомление;физическая активность;фрустрация;цигун;эмоциональный;эустресс','n':'covi*;авари*;боево*;генерал;давалки;заживо;коронавиру*;кракен;минет;мобилиз*;модел*;оголив;опухо*;плечи;пляжн*;пожар;позах;полити*;порно;порногр*;пострада*;сгорел;сгорел*;секс;секс*;смерт*;спецоперац*;трусах;трусы;убийств*;украин*'},{'bid':78948,'k':'','n':'covi*;авари*;боево*;генерал;давалки;заживо;коронавиру*;кракен;минет;мобилиз*;модел*;оголив;опухо*;плечи;пляжн*;пожар;позах;полити*;порно;порногр*;пострада*;сгорел;сгорел*;секс;секс*;смерт*;спецоперац*;трусах;трусы;убийств*;украин*'},{'bid':78951,'k':'','n':'covi*;авари*;боево*;генерал;давалки;заживо;коронавиру*;кракен;минет;мобилиз*;модел*;оголив;опухо*;плечи;пляжн*;пожар;позах;полити*;порно;порногр*;пострада*;сгорел;сгорел*;секс;секс*;смерт*;спецоперац*;трусах;трусы;убийств*;украин*'},{'bid':78959,'k':'','n':'covi*;авари*;боево*;генерал;давалки;заживо;коронавиру*;кракен;минет;мобилиз*;модел*;оголив;опухо*;плечи;пляжн*;пожар;позах;полити*;порно;порногр*;пострада*;сгорел;сгорел*;секс;секс*;смерт*;спецоперац*;трусах;трусы;убийств*;украин*'},{'bid':78962,'k':'','n':'covi*;авари*;боево*;генерал;давалки;заживо;коронавиру*;кракен;минет;мобилиз*;модел*;оголив;опухо*;плечи;пляжн*;пожар;позах;полити*;порно;порногр*;пострада*;сгорел;сгорел*;секс;секс*;смерт*;спецоперац*;трусах;трусы;убийств*;украин*'} ]);
