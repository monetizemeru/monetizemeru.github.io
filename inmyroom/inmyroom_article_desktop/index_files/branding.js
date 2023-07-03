
window.yaContextCb.push(()=>{
        Ya.adfoxCode.create({
    ownerId: 219018,
    containerId: 'adfox_15930827061866406',
    params: {
      pp: 'g',
      ps: 'bnes',
      p2: 'gqhl'
    }
      })
  });

  var bannerAdditionalStyleElement = document.createElement("style");
  var bannerAdditionalStyleString = ".adfox-banner-background ~ .b-MainLayout { max-width: 1280px; margin-left: auto; margin-right: auto; } .adfox-banner-background ~ .b-MainLayout > .b-MainLayout_header { background-color: #fff; } .adfox-banner-background > a { background-size: 100vw; background-color: #00551a; }".replace(/\s/g,'');

  bannerAdditionalStyleElement.type = 'text/css';
  bannerAdditionalStyleElement.appendChild(document.createTextNode(bannerAdditionalStyleString));
  document.head.appendChild(bannerAdditionalStyleElement);
