(function sendingDataToAnalytics() {
  const announceList = document.querySelectorAll(
    ".article-groups.article-addition-related .article-announce.singlecol"
  );

  // Настраиваем Обсервер
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  // Эта функция вызывается при срабатывании Обсервера
  const callback = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        Olga(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  // Если анонсов меньше 6 -- прекращаем работу
  if (announceList.length < 6) return;

  // Убираем скрытые анонсы из списка анонсов
  const filteredAnnounces = Array.from(announceList).filter(
    (announce) => announce.style.display !== "none"
  );

  // Перебираем анонсы и цепляем к ним Обсервер
  filteredAnnounces.forEach((announce, index) => {
    if (index > 0) {
      announce.dataset.index = index + 3;
      observer.observe(announce);
    }
  });

  function Olga(announce) {
    // Получаем все ссылки в анонсе
    const announceLinks = announce.querySelectorAll("a");
    // Убираем ненужные ссылки
    const filteredAnnounceLinks = Array.from(announceLinks).filter(
      (link) => !link.closest(".breadcrumb-item")
    );

    // Перебираем ссылки, устанавливаем прослушку и пронумеровываем в дата-атрибуте
    filteredAnnounceLinks.forEach((filteredLink) => {
      filteredLink.addEventListener("click", (e) => {
        e.preventDefault();
        sendEvent(filteredLink, null);
      });

      filteredLink.dataset.index = announce.dataset.index;

      if (filteredLink.closest("h3")) {
        sendEvent(filteredLink, announce.dataset.index);
      }
    });
  }

  function sendEvent(linkNode, linkNumber) {
    const params = new URLSearchParams();
    const date = new Date();
    const time = date.getTime();
    const timeZone = String(date.getTimezoneOffset() / 60);

    if (linkNumber === null) {
      params.set("click", 1);
    } else {
      params.set("click", 0);
    }

    params.set("index", linkNode.dataset.index);
    params.set("href", linkNode.href);
    params.set(
      "title",
      linkNode.closest(".article-announce.singlecol").querySelector("h3 a")
        .textContent
    );
    params.set("time", `${time} + ${timeZone}`);
    params.set("currenturl", window.location.href);
    params.set("referer", document.referrer);

    fetch("https://analitics.mk.ru/api/analitics", {
      method: "POST",
      body: params,
    }).then((response) => {});

    if (linkNumber === null) {
      window.location.href = linkNode.href;
    }
  }
})();
