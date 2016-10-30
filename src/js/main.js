slidr.create('slidr1', {
  breadcrumbs: false,
  overflow: true,
  touch: true,
}).add('h', ['one', 'two', 'three', 'one'])
  .start();

slidr.create('slidr2', {
  breadcrumbs: false,
  overflow: true,
  touch: true,
}).add('h', [ 'two', 'three', 'one', 'two'])
  .start();

slidr.create('slidr3', {
  breadcrumbs: false,
  overflow: true,
  touch: true,
}).add('h', [ 'three', 'one', 'two', 'three'])
  .start();


var search = '';
var data;
var r = new XMLHttpRequest();
var btnSearch = document.getElementById('search');
var text = document.getElementById('text');
var masonry = document.getElementById('masonry');

function addEvent(el, event, callback){
	if(window.attachEvent){
		el.attachEvent('on' + event, callback);
	} else {
		el.addEventListener(event, callback);
	}
}

searches();

addEvent(btnSearch, 'click', function(){
	search = text.value;
	searches();
});

addEvent(text, 'keypress', function(e) {
        if(e.keyCode==13){
            search = text.value;
			searches();
        }
    });

function searches () {

	r.open("GET", "https://pixabay.com/api/?key=3588567-58d6c3e704eb8443533c05428&q=" + search + "&image_type=photo&pretty=true", true);
	r.onreadystatechange = function () {

	  if (r.readyState != 4 || r.status != 200) return;
	  data = JSON.parse(r.responseText).hits;
	  if(data.length < 10){
	  	search = '';
	  	searches();
	  	return;
	  }
	  var list = tmpl('mason', {data: data});
	  masonry.innerHTML = list;
	  masInit();
	};
	r.send();
	text.value = '';
	
}

function masInit(){
	var elem = document.querySelector('.masonry');
	var msnry = new Masonry( elem, {
	// options
		itemSelector: '.masonry__item',
		columnWidth: ".masonry__item",
		gutter: 20,
	});
}





