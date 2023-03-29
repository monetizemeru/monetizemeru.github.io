(async function() {
  try {
    if (!document.head) {
      return;
    }
    const tokenElement = document.createElement('meta');
    tokenElement.httpEquiv = 'origin-trial';
    tokenElement.content = "A80Zpm8X9rMWPlZ97YeZ9IM3rIU6Sb11EITMisDjlxLwf4Zbw2ifupBeZIY/ECuKm4me6smQkZ9Kg1yppbpXOQ8AAACBeyJvcmlnaW4iOiJodHRwczovL3dlYm9yYW1hLmZyOjQ0MyIsImZlYXR1cmUiOiJQcml2YWN5U2FuZGJveEFkc0FQSXMiLCJleHBpcnkiOjE2ODA2NTI3OTksImlzU3ViZG9tYWluIjp0cnVlLCJpc1RoaXJkUGFydHkiOnRydWV9";
    document.head.appendChild(tokenElement);

    if (!'browsingTopics' in document || !document.featurePolicy || !document.featurePolicy.allowsFeature('browsing-topics')) {
      return;
    }

    const topics = await document.browsingTopics();
    var dst = '', pu = '', tpcs = encodeURIComponent(JSON.stringify(topics)), xhr = new XMLHttpRequest();
    if (document.location) {
      pu = encodeURIComponent(document.location);
    }
    dst = 'https://cs.frontend.weborama.fr/tpcs?t='+tpcs+'&pu='+pu;
    xhr.open('GET', dst, true);
    xhr.withCredentials = true;
    xhr.send();
  } catch (e) {}
})();
