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

})(window, 5770, {
	'stub':'eval(\'if (typeof noAdmediatoday === \"function\") { noAdmediatoday(); }\');',
	'stub_type':'javascript',
	'channel_height':'0',
	'channel_width':'0'
});

