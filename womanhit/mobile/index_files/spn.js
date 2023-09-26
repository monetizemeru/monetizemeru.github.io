var script = document.currentScript

function get(name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(script.src)) {
        return decodeURIComponent(name[1]);
    }
}


function guid() {
    const uuid = () => (
        (
            [1e7] + -1e3 + -4e3 + -8e3 + -1e11
        ).replace(/[018]/g, c => (
            c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4
        ).toString(16))
    ).replace(new RegExp('-', 'g'), '');

    return uuid();
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 30 * 12 * 6 ));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=None; Secure";
    window.mars = cvalue;
}
setTimeout(function () {

    if (getCookie('mars') != undefined){
        let gui = getCookie('mars');
        window.mars = gui;
        var s1 = document.createElement('script');
        s1.src = `https://cdn3.caltat.com/fbfc504c-89b0-4a80-bef4-c8e39daeee6f/sync.php?idClient=16&idCampaign=` + 662452 + `&sonar=true&pid=${get('_ga')}&url=${encodeURIComponent(window.location.href || document.referrer)}&status=old&gi=${gui}`;
        document.getElementsByTagName('head')[0].appendChild(s1);


    } else if (window.mars != undefined) {
        let gui = window.mars;
        setCookie('mars', gui, 1826);
        var s1 = document.createElement('script');
        s1.src = `https://cdn3.caltat.com/fbfc504c-89b0-4a80-bef4-c8e39daeee6f/sync.php?idClient=16&idCampaign=` + 662452 + `&sonar=true&pid=${get('_ga')}&url=${encodeURIComponent(window.location.href || document.referrer)}&status=old&gi=${gui}`;
        document.getElementsByTagName('head')[0].appendChild(s1);


    }
    else{
        let gui = guid();
        setCookie('mars', gui, 1826);
        var s1 = document.createElement('script');
        s1.src = `https://cdn3.caltat.com/fbfc504c-89b0-4a80-bef4-c8e39daeee6f/sync.php?idClient=16&idCampaign=` + 662452 + `&sonar=true&pid=${get('_ga')}&url=${encodeURIComponent(window.location.href || document.referrer)}&status=new&gi=${gui}`;
        document.getElementsByTagName('head')[0].appendChild(s1);



    }

}, 3500);