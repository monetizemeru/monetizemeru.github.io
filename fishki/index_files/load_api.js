window.startPlayer = function (config = {}) {
    const { container = document.body, onError, onComplete, onStart, onClose } = config;
    console.log(onStart);
    window.vie2 = document.createElement("script");
    window.vie2.type = "text/javascript";
    window.vie2.src = "https://ru.viadata.store/v2/comm.js?sid=104621";
    window.vie2.onload = function () {
        window.vadsLoaderQueue = window.vadsLoaderQueue || [];
        window.vadsLoaderQueue.push(()=>{
            vadsLoader.run([
                {
                    zoneId: 2130,
                    container: container,
                    onComplete: () => onComplete(),
                    onStart: () => onStart(),
                    onClose: () => onClose(),
                    onError: ({ message }) => onError()
                }
            ]);
        });
    };
    window.vih = document.getElementsByTagName('script')[0];
    window.vih.parentNode.insertBefore(vie2, vih);
};

closePlayer = function () {
    var doc = window.frameElement ? window.parent : window;
    doc.vadsPlayerController[2130].stop();
};

skipPlayer = function () {
    var doc = window.frameElement ? window.parent : window;
    doc.vadsPlayerController[2130].skip();
};

window.startViPlayer = startPlayer;
window.viplayer = {};
window.viplayer.start = startPlayer;
window.viplayer.close = closePlayer;
window.viplayer.skip = skipPlayer;