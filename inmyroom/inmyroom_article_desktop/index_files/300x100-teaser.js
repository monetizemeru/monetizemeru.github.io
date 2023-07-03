
  if (gptadslots['IMR_300x100_Teaser']) {
    googletag.cmd.push(function() {
      googletag.destroySlots(gptadslots['IMR_300x100_Teaser']);
    });
  }
  googletag.cmd.push(function() {
    gptadslots['IMR_300x100_Teaser'] = googletag.defineSlot('/21368465/IMR_300x100_Teaser', [[300, 100], [300, 90]], 'IMR_300x100_Teaser')
    .addService(googletag.pubads());
  });
  googletag.cmd.push(function() {
    googletag.display('IMR_300x100_Teaser');
  });
