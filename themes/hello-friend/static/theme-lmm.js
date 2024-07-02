  //相对时间
  window.Lately && Lately.init({ target: '.post-date,.datetime,.datatime,.photo-time'});
  //图片灯箱
  window.ViewImage && ViewImage.init('.post-content img:not(.avatar,.tk-avatar-img)')
  //外链 gallery 标签相册瀑布流
  var photosAll = document.getElementsByTagName('gallery') || '';
  if(photosAll){
    for(var i=0;i < photosAll.length;i++){
      photosAll[i].innerHTML = '<div class="gallery-photos single">'+photosAll[i].innerHTML+'</div>'
      var photosIMG = photosAll[i].getElementsByTagName('img')
      for(var j=0;j < photosIMG.length;j++){
        wrap(photosIMG[j], document.createElement('div'));
      }
    }
  }
  function wrap(el, wrapper) {
    wrapper.className = "gallery-photo visible";
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
  //随机日志
  function randomPost() {
    fetch('/sitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
        let ls = data.querySelectorAll('url loc');
        let locationHref,locSplit;
        do {
            locationHref = ls[Math.floor(Math.random() * ls.length)].innerHTML
            locSplit = locationHref.split('/')[3] || ''
        } while (locSplit == '' || locSplit == 'tags' || locSplit == 'posts'); 
        location.href = locationHref
    })
  }
var dbAPI = "https://dbapi.lzsay.com/";
var dbA = document.querySelectorAll(".post-content a[href*='douban.com/subject/']:not([rel='noreferrer'])") || '';
if(dbA){
  for(var i=0;i < dbA.length;i++){
    _this = dbA[i]
    var dbHref = _this.href
    var db_reg = /^https\:\/\/(movie|book)\.douban\.com\/subject\/([0-9]+)\/?/;
    var db_type = dbHref.replace(db_reg, "$1");
    var db_id = dbHref.replace(db_reg, "$2").toString();
      if (db_type == 'movie') {
        var this_item = 'movie' + db_id;
        var url = dbAPI + "movies/" + db_id ;
        if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
          fetch(url).then(res => res.json()).then( data =>{
            let fetch_item = 'movies' + data.sid;
            let fetch_href = "https://movie.douban.com/subject/"+data.sid+"/"
            localStorage.setItem(fetch_item, JSON.stringify(data));
            movieShow(fetch_href, fetch_item)
          });
        } else {
          movieShow(dbHref, this_item)
        }
      }else if (db_type == 'book') {
        var this_item = 'book' + db_id;
        var url = dbAPI + "v2/book/id/" + db_id;
        if (localStorage.getItem(this_item) == null || localStorage.getItem(this_item) == 'undefined') {
          fetch(url).then(res => res.json()).then( data =>{
            let fetch_item = 'book' + data.id;
            let fetch_href = "https://book.douban.com/subject/"+data.id+"/"
            localStorage.setItem(fetch_item, JSON.stringify(data));
            bookShow(fetch_href, fetch_item)
          });
        } else {
          bookShow(dbHref, this_item)
        }
      }
  }// for end
}
function movieShow(fetch_href, fetch_item){
  var storage = localStorage.getItem(fetch_item);
  var data = JSON.parse(storage);
  var db_star = Math.ceil(data.rating);
  var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + fetch_href + "'>《" + data.name + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating + "</div></div><time class='post-preview--date'>导演：" + data.director + " / 类型：" + data.genre + " / " + data.year + "</time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.intro.replace(/\s*/g, "") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.img + "></div>"
  var db_div = document.createElement("div");
  var qs_href = ".post-content a[href='"+ fetch_href +"']"
  var qs_dom = document.querySelector(qs_href)
  qs_dom.parentNode.replaceChild(db_div, qs_dom);
  db_div.innerHTML = db_html
}
function bookShow(fetch_href, fetch_item) {
  var storage = localStorage.getItem(fetch_item);
  var data = JSON.parse(storage);
  var db_star = Math.ceil(data.rating.average);
  var db_html = "<div class='post-preview'><div class='post-preview--meta'><div class='post-preview--middle'><h4 class='post-preview--title'><a target='_blank' href='" + fetch_href + "'>《" + data.title + "》</a></h4><div class='rating'><div class='rating-star allstar" + db_star + "'></div><div class='rating-average'>" + data.rating.average + "</div></div><time class='post-preview--date'>作者：" + data.author + " </time><section style='max-height:75px;overflow:hidden;' class='post-preview--excerpt'>" + data.summary.replace(/\s*/g, "") + "</section></div></div><img referrer-policy='no-referrer' loading='lazy' class='post-preview--image' src=" + data.images.medium + "></div>"
  var db_div = document.createElement("div");
  var qs_href = ".post-content a[href='"+ fetch_href +"']"
  var qs_dom = document.querySelector(qs_href)
  qs_dom.parentNode.replaceChild(db_div, qs_dom);
  db_div.innerHTML = db_html
}
function umiTongji(){
  var umiId = "41e2b680-648e-4b09-bcd7-3e2b10c06264"
  var umiToken = "CjXaf6YbcrVAoE6MLAR1w8DOjUzH4aLA+DaBa34aW92ok4kjm7GbCVdj4eHB3HcpYzFsgdAjzuBgm9b1MiGFUzMfXwO47zBbrGTUb4V1MEB1ygNgEsoDIrNp6bNQDLg+1rtbpphBwlx3Qi4cEjl0O2sCSBmJDBaifZb8zJIRXdqXc+k8SOlg//45dfByKHsGDmu4hN5tr4bQcLbHux0QEK4FzRvp3lnskfQBRMUA3pALZpN4SeYinJwLA+35T0CBxEV6vVEx529CzcD95VN/3b8BCoCJ6RT/7NNNGQm3F+j5PS6IPGwtfMi74/qcOdWNQ03bSEmCmAgFpuCtMrLmDnkUe/J00lri+A=="
  var umiTime = Date.parse(new Date()); //获取当前时间戳
  var umiUrl = "https://u.lzsay.com/api/websites/"+umiId+"/stats?startAt=0000000000&endAt="+umiTime;
  fetch(umiUrl,{
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': 'Bearer ' + umiToken,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json()).then(resdata => {
    document.querySelector('#pvStatic').innerHTML = resdata.pageviews.value
    document.querySelector('#uvStatic').innerHTML = resdata.uniques.value
  });
}