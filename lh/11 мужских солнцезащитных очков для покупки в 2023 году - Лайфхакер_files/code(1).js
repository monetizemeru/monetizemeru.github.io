(function(w, placeId, a){
	var a_empty = true
	for(var prop in a) {
		if(a.hasOwnProperty(prop)) {
			a_empty = false;
			break;
		}
	}
	if (a_empty)
		return;

	if (typeof a.stub == 'undefined' || a.stub == '')
		return;

	if (a.stub_type == 'javascript') {
		eval(a.stub);
		return;
	}

	var ct = w.document.body; //getElementById('_mt_ot_container_' + placeId)
	if (! ct)
		return;

	if (a.stub_type == 'html') {
		function scriptsExec(node) {
			if (node.tagName === 'SCRIPT') {
				var script  = document.createElement("script");
				script.text = node.innerHTML;

				var i = -1, attrs = node.attributes, attr;
				while (++i < attrs.length) {                                    
					script.setAttribute((attr = attrs[i]).name, attr.value);
				}

				try { node.parentNode.replaceChild(script, node); } catch(e) {}
			}
			else {
				var i = -1, children = node.childNodes;
				while (++i < children.length) {
					scriptsExec(children[i]);
				}
			}
		}

		var f = document.createElement('div');
		f.id = '_mt_stub_' + placeId;
		f.innerHTML = a.stub;
		scriptsExec(f);
		try { ct.appendChild(f); } catch(e) {}

		return;
	}

	//ct.style.margin = '0'
	//ct.style.padding = '0'
	//ct.style.marginLeft = 'auto'
	//ct.style.marginRight = 'auto'

	var f = document.createElement('iframe')
	ct.appendChild(f)

	f.frameBorder = '0'
	f.scrolling = 'no'
	f.horizontalscrolling = 'no'
	f.verticalscrolling = 'no'

	f.height = "0"; //a.channel_height
	f.width = "0"; //a.channel_width
	f.marginHeight = '0'
	f.marginWidth = '0'
	f.padding = '0'
	f.marginLeft = 'auto'
	f.marginRight = 'auto'

	f.style.width = '0px';
	f.style.opacity = '0';
	f.style.width = '0px';
	f.style.height = '0px';
	f.style.position = 'absolute';
	f.style.left = '100%';
	f.style.bottom = '100%';
	f.style.border = '0px';

	this.setIframeContent = function(f, c) {
		var doc;
		if (f.contentDocument) // FF Chrome
		  doc = f.contentDocument;
		else if ( f.contentWindow ) // IE
		  doc = f.contentWindow.document;
		
		doc.open()
		doc.write('<html><head><title>Advertisement</title></head><body style="margin:0; padding:0; overflow:hidden;">')
		doc.write(c)
		doc.write('</body></html>')
		doc.close()
	}

	this.setIframeContent(f, a.stub);

})(window, 9504, {
	'stub':';(function() {\r\n' +
'    var imageForInitialization = document.currentScript && document.currentScript.parentElement.querySelector(\"img\");\r\n' +
'    \r\n' +
'    if (typeof window._tx === \"undefined\") {\r\n' +
'        var s = document.createElement(\"script\");\r\n' +
'        s.type = \"text\/javascript\";\r\n' +
'        s.async = true;\r\n' +
'        s.src = \"https:\/\/st.hbrd.io\/ssp.js?t=\" + new Date().getTime();\r\n' +
'        (document.getElementsByTagName(\"head\")[0] || document.getElementsByTagName(\"body\")[0]).appendChild(s);\r\n' +
'    }\r\n' +
'    \r\n' +
'    window._tx = window._tx || {};\r\n' +
'    window._tx.cmds = window._tx.cmds || [];\r\n' +
'    window._tx.cmds.push(function () {\r\n' +
'        window._tx.integrateInImage({\r\n' +
'            placeId: \"617a531b7bc72f72246b9cc2\",\r\n' +
'            imageSelector: \"[class*=\'wp-image\']\",\r\n' +
'            image: imageForInitialization\r\n' +
'        });\r\n' +
'        window._tx.init({\r\n' +
'            zIndex: 10,\r\n' +
'            canShowDuplicates: true,\r\n' +
'            inImageMinHeightDesktop: 290\r\n' +
'        }); \r\n' +
'    });\r\n' +
'})();',
	'stub_type':'javascript',
	'channel_height':'0',
	'channel_width':'0'
});


(function() {
	(new Image(1, 1)).src = 'https://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=608223&bt=21&pid=2551979&bid=5723262&bn=5723262&rnd=38924';
	(new Image(1, 1)).src = 'https://VU0000000g4bjql-mdt.ops.beeline.ru/p?ssp=mdt&amp;id=VU0000000g4bjql';
	(new Image(1, 1)).src = 'https://redirect.frontend.weborama.fr/rd?url=https%3A%2F%2Fmediatoday.ru%2Fcore%2Fmatch.gif%3Fs%3D15%26id%3D{WEBO_CID}';
	(new Image(1, 1)).src = 'https://sync.1dmp.io/pixel.gif?cid=72295f3d-ccef-444f-90ae-f20aee12633e&pid=w&uid=VU0000000g4bjql&ru=https%3A%2F%2Fmediatoday.ru%2Fcore%2Fmatch.gif%3Fs%3D16%26id%3D%5BUID%5D';
	(new Image(1, 1)).src = 'https://relap.io/api/partners/instrv.gif?uid=VU0000000g4bjql';
	(new Image(1, 1)).src = 'https://sync.dmp.otm-r.com/match/invideo?r=https%3A%2F%2Finstreamvideo.ru%2Fcore%2Fmatch.gif%3Fs%3D21%26id%3D%7Bpid%7D';
	(new Image(1, 1)).src = 'https://tms.dmp.wi-fi.ru/?dmpkit_cid=81460eb5-647b-4d9b-a3e3-7863f294c3da&dmpkit_evid=ab914581-c2bd-45ef-9242-3128c73c48c5&g_adv=mediatoday&ru=https%3A%2F%2Finstreamvideo.ru%2Fcore%2Fmatch.gif%3Fs%3D23%26id%3D[UID]';
	(new Image(1, 1)).src = 'https://x01.aidata.io/0.gif?pid=8013096&id=VU0000000g4bjql';
	(new Image(1, 1)).src = 'https://an.yandex.ru/mapuid/gpmd/VU0000000g4bjql';
})();
