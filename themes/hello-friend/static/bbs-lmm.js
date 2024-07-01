/*
Last Modified time : 20230810 by https://immmmm.com
*/
let memoOne = getQueryVariable("memo") || ''
if(memoOne){
  getMemoOne(memoOne)
}
function getMemoOne(memoOne){
  let OneDom = `<iframe style="width:100%;height:100vh;" src="${memoOne}" frameBorder="0"></iframe>`
  let ContDom = document.querySelector('.content')
  ContDom.innerHTML = OneDom
}
function getQueryVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

const cdnGravatar = "https://cravatar.cn/avatar/"
let urls = [
  {
    home:"https://lzsay.com/",
    host:"https://memos.lzsay.com/",
    creatorId:"1",
    imgsrc:cdnGravatar+"ba83fa02fc4b2ba621514941307e21be",
  }
]
urls = urls.map(data => {
  return {
    ...data,
    creatorId: data.creatorId || '1',
    apiV1:data.apiV1 || 'api/v1/',
  }
});
let bbDom = document.querySelector('#bbs');
let load = `<div id="load" onclick="nextFetch()" ><button class="load-btn button-load">加载更多</button></div>`
let loading = `<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>`
let bbsDatas = [],bbsData = {},nextDatas = [],nextData = {},limit = 2
let page = 1,offset = 0,nextLength = 0,nextDom,bbUrlNow,imgsrcNow,hostNow,creIdNow,twiEnvNow,artEnvNow,artSiteNow,endpointNow,reacttargetidNow,availablearraystringNow;
bbDom.innerHTML = loading

allUrls(urls)
function allUrls(urls){
  let myHtml = ""
  for(let i=0;i < urls.length;i++){
    myHtml += `<div class="bbs-urls bbs-url" onclick="urlsNow(this)" data-hostid="${urls[i].host+"u/"+urls[i].creatorId}" data-index="${i}"><img src="${urls[i].imgsrc}" alt=""></div>`
  }
  myHtml += '<div class="bbs-urls urls-button" onclick="urlsNow(this)" data-type="random"><svg t="1665928089691" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2562" width="32" height="32"><path d="M913.2 672l98.8 57.1c5.3 3.1 5.3 10.8 0 13.9l-43.4 25L710.4 924c-2.7 1.5-6-0.4-6-3.5V772c0-2.2-1.8-4-4-4H544c-70.4 0-134.4-28.8-180.8-75.2-11.1-11.1-21.2-23.2-30.1-36.1-6.4-9.2-20-9.1-26.4 0.1C260.5 723.9 183.1 768 96 768h-48c-26.5 0-48-21.5-48-48s21.5-48 48-48h48c42.5 0 82.6-16.7 112.9-47.1 30.4-30.4 47.1-70.5 47.1-112.9s-16.7-82.6-47.1-112.9C178.6 368.7 138.4 352 96 352h-48c-26.5 0-48-21.5-48-48s21.5-48 48-48h48c70.4 0 134.4 28.8 180.8 75.2 11.1 11.1 21.2 23.2 30.1 36.1 6.4 9.2 20 9.1 26.4-0.1 46.3-67 123.6-111.1 210.8-111.1H700.4c2.2 0 4-1.8 4-4V103.4c0-3.1 3.3-5 6-3.5l258.2 156 43.4 25.1c5.3 3.1 5.3 10.8 0 13.9L913.2 352 710.4 476c-2.7 1.5-6-0.4-6-3.5V356c0-2.2-1.8-4-4-4H544c-42.5 0-82.6 16.7-112.9 47.1-30.4 30.4-47.1 70.5-47.1 112.9 0 42.5 16.7 82.6 47.1 112.9C461.4 655.3 501.5 672 544 672H700.4c2.2 0 4-1.8 4-4V551.4c0-3.1 3.3-5 6-3.5L913.2 672z" p-id="2563" fill="#f5f5f5"></path></svg></div>'
  myHtml += '<div class="bbs-urls urls-button"><a href="https://lzsay.com/bbs-by-memos/"><svg t="1665929410343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6308" width="32" height="32"><path d="M906.212134 565.732986 565.732986 565.732986 565.732986 906.212134C565.732986 926.013685 541.666486 959.972 511.97312 959.972 482.297674 959.972 458.213254 926.013685 458.213254 906.212134L458.213254 565.732986 117.734106 565.732986C97.950475 565.732986 63.97424 541.666486 63.97424 511.97312 63.97424 482.279754 97.950475 458.213254 117.734106 458.213254L458.213254 458.213254 458.213254 117.734106C458.213254 97.950475 482.297674 63.97424 511.97312 63.97424 541.666486 63.97424 565.732986 97.950475 565.732986 117.734106L565.732986 458.213254 906.212134 458.213254C925.995765 458.213254 959.972 482.279754 959.972 511.97312 959.972 541.666486 925.995765 565.732986 906.212134 565.732986Z" p-id="6309" fill="#f5f5f5"></path></svg></a></div>'
  myHtml = `<div id="bbs-urls">${myHtml}</div>`
  bbDom.insertAdjacentHTML('beforebegin', myHtml);
}

function nextFetch(){
  document.querySelector("button.button-load").textContent= '加载中……';
  updateHTMl(nextDatas)
  if(nextLength < 10){
    document.querySelector("#load").remove()
    return
  }
  getNextList()
};
function viaNow(e){
  let viaCreator = e.getAttribute("data-creator")
  let viaUrl = e.getAttribute("data-url")
  let viaCopy = ` （via [@${viaCreator}](${viaUrl})）`
  navigator.clipboard.writeText(viaCopy).then(() => {alert(viaCopy)});
}
function urlsNow(e){
  let domClass = document.getElementById("bbs-urls")
  window.scrollTo({
    top: domClass.offsetTop - 30,
    behavior: "smooth"
  });
  let loadHas = document.querySelector("#load") || ''
  if(loadHas) loadHas.remove()
  let domUrls = document.querySelectorAll('#bbs-urls .bbs-urls')
  if(e.classList.contains('url-now')){
    domUrls[e.getAttribute("data-index")].classList.remove("url-now")
    fetchBBser()
  }else{
    domUrls.forEach(function(value,index){ domUrls[index].classList.remove("url-now")})
    let btn = document.querySelector('button.button-load')
    if(btn){btn.remove()}
    page = 1,offset = 0
    bbDom.innerHTML = loading
    let type = e.getAttribute("data-type")
    let num = (type == 'random') ? Math.round(Math.random() * (urls.length-1)) : e.getAttribute("data-index")
    hostNow = urls[num].host
    creIdNow = urls[num].creatorId|| '1'
    imgsrcNow = urls[num].imgsrc
    twiEnvNow = urls[num].twiEnv
    artEnvNow = urls[num].artEnv
    artSiteNow = urls[num].artSite
    homeNow = urls[num].home
    apiV1Now = urls[num].apiV1 || 'api/v1/'
    endpointNow = urls[num].endpoint || ''
    reacttargetidNow = urls[num].reacttargetid || ''
    availablearraystringNow = urls[num].availablearraystring || ''
    domUrls[num].classList.add("url-now")
    bbUrlNow = hostNow+apiV1Now+"memo?creatorId="+creIdNow+"&rowStatus=NORMAL&limit=10"
    //console.log(bbUrlNow)
    fetch(bbUrlNow).then(res => res.json()).then( resdata =>{
      let arrData = resdata || ''
      if(resdata.data){
        arrData = resdata.data
      }
      bbsDatas.length = 0
      for(let j=0;j < arrData.length;j++){
            let resValue = arrData[j]
            bbsData = {
              memoId: resValue.id,
              updatedTs: resValue.updatedTs,
              creatorId:resValue.creatorId,
              creator: resValue.creatorName || resValue.creator.nickname || resValue.creator.name,
              imgsrc: imgsrcNow,
              content: resValue.content,
              resourceList: resValue.resourceList,
              url:hostNow,
              twiEnv:twiEnvNow,
              artEnv:artEnvNow,
              artSite:artSiteNow,
              home:homeNow,
              endpoint:endpointNow,
              reacttargetid:reacttargetidNow,
              availablearraystring: availablearraystringNow
            }
            bbsDatas.push(bbsData)
      }
      updateHTMl(bbsDatas)
      bbDom.insertAdjacentHTML('afterend', load);
      let nowLength = bbsData.length
      if(nowLength < 10){ //返回数据条数小于 limit 则直接移除“加载更多”按钮，中断预加载
        document.querySelector("#load").remove()
        return
      }
      page++
      offset = 10*(page-1)
      getNextList()
    });
  }
}

//预加载下一页数据
function getNextList(){
  let bbUrl = bbUrlNow+"&offset="+offset;
  fetch(bbUrl).then(res => res.json()).then( resdata =>{
    let arrData = resdata || ''
    if(resdata.data){
      arrData = resdata.data
    }
    nextDom = arrData
    nextLength = nextDom.length
    page++
    offset = 10*(page-1)
    if(nextLength < 1){
      document.querySelector("#load").remove()
      return
    }
    nextDatas.length = 0
    for(let j=0;j < nextDom.length;j++){
      let resValue = nextDom[j]
      nextData = {
        updatedTs: resValue.updatedTs,
        creatorId:resValue.creatorId,
        creator: resValue.creatorName || resValue.creator.nickname || resValue.creator.name,
        imgsrc: imgsrcNow,
        content: resValue.content,
        resourceList: resValue.resourceList,
        url:hostNow,
        twiEnv:twiEnvNow,
        artEnv:artEnvNow,
        artSite:artSiteNow,
        memoId: resValue.id,
        home:homeNow,
        endpoint:endpointNow,
        reacttargetid:reacttargetidNow,
        availablearraystring: availablearraystringNow
      }
      nextDatas.push(nextData)
    }
  })
}
const withTimeout = (millis, promise) => {
  const timeout = new Promise((resolve, reject) =>
      setTimeout( () => reject(`Timed out after ms.`),millis));
  return Promise.race([
      promise,
      timeout
  ]);
};
const fetchBBser = async () => {
  const results = await Promise.allSettled(urls.map(
    //限时
    url => withTimeout(2000,
      fetch(url.host+url.apiV1+"memo?creatorId="+url.creatorId+"&rowStatus=NORMAL&limit="+limit).then(response => response.json()).then(resdata => {
        let qsLive = ".bbs-urls.bbs-url[data-hostid='"+url.host+"u/"+url.creatorId+"']"
        console.log(qsLive)
        document.querySelector(qsLive).classList.add("liveon");
        let arrData = resdata || ''
        if(resdata.data){
          arrData = resdata.data
        }
        return arrData
      })
    )
    //url => fetch(url.host+"api/memo?creatorId="+url.creatorId+"&rowStatus=NORMAL&limit="+limit).then(response => response.json()).then(resdata => resdata.data)
  )).then(results => {
    //console.log(results)
    //bbDom.innerHTML = ''
    bbsDatas.length = 0
    for(let i=0;i < results.length;i++){
      let status = results[i].status
      if(status == "fulfilled"){
        let resultsRes = results[i].value
        for(let j=0;j < resultsRes.length;j++){
          let resValue = resultsRes[j]
          let dateNow = new Date()
          let dateDiff = dateNow.getTime() - (resValue.updatedTs * 1000);
          let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
          if(dayDiff < 10 ){//显示10天内更新的 Memos
            bbsData = {
              memoId: resValue.id,
              updatedTs: resValue.updatedTs,
              creatorId:resValue.creatorId,
              creator: resValue.creatorName || resValue.creator.nickname || resValue.creator.name,
              imgsrc: urls[i].imgsrc,
              content: resValue.content,
              resourceList: resValue.resourceList,
              home:urls[i].home,
              url:urls[i].host,
              comment:urls[i].comment,
              twiEnv:urls[i].twiEnv || '',
              artEnv:urls[i].artEnv || '',
              artSite:urls[i].artSite || '',
              endpoint:urls[i].endpoint || '',
              reacttargetid:urls[i].reacttargetid || '',
              availablearraystring:urls[i].availablearraystring || ''
            }
            bbsDatas.push(bbsData)
          }
        }
      }
    }
    bbsDatas.sort(compare("updatedTs"));
    updateHTMl(bbsDatas)
  })
}
fetchBBser()
function compare(p){
  return function(m,n){
      let a = m[p];
      let b = n[p];
      return b - a;
  }
}

function uniqueFunc(arr){
  const res = new Map();
  return arr.filter((item) => !res.has(item.creator) && res.set(item.creator, 1));
}

async function updateHTMl(data){
  let result = "",resultAll;
  const TAG_REG = /#([^#\s!.,;:?"'()]+)(?= )/g ///#([^/\s#]+?) /g
  , IMG_REG = /\!\[(.*?)\]\((.*?)\)/g
  , LINK_REG = /\[(.*?)\]\((.*?)\)/g
  , DEODB_LINK_REG = /(https:\/\/(www|movie|book)\.douban\.com\/(game|subject)\/[0-9]+\/).*?/g
  //https://www.bilibili.com/video/BV1x14y167eb
  , BILIBILI_REG = /<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g
  , NETEASE_MUSIC_REG = /<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g
  , QQMUSIC_REG = /<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g
  , QQVIDEO_REG = /<a.*?href="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g
  , YOUKU_REG = /<a.*?href="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g
  , YOUTUBE_REG = /<a.*?href="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;

  marked.setOptions({
    breaks: false,
    smartypants: false,
    langPrefix: 'language-'
  });
  
  for(let i=0;i < data.length;i++){
      let memos = data[i].url
      let memoId = data[i].memoId
      let creatorId = data[i].creatorId
      let memoUrl = memos + "m/" + memoId
      let comment = data[i].comment
      let twiEnv = data[i].twiEnv
      let artEnv = data[i].artEnv
      let artSite = data[i].artSite
      let endpoint = data[i].endpoint
      let reacttargetid = data[i].reacttargetid
      let availablearraystring = data[i].availablearraystring
      let bbCont = data[i].content + ' '
      let bbContREG = ''

      bbContREG += bbCont.replace(TAG_REG, "")
        .replace(IMG_REG, "")
        .replace(DEODB_LINK_REG, "")
        .replace(LINK_REG, '<a class="primary" href="$2" target="_blank">$1</a>')

      // NeoDB
      let neodbArr = bbCont.match(DEODB_LINK_REG);
      let neodbDom = '';
      if(neodbArr){
        for(let k=0;k < neodbArr.length;k++){
          neodbDom += await fetchNeoDB(neodbArr[k])
        }
      }

      //标签
      let tagArr = bbCont.match(TAG_REG);
      //console.log(tagArr)
      let bbContTag = '';
      if (tagArr) {
          bbContTag = tagArr.map(t=>{
            return `<span class='tag-span' onclick='getTagNow(this)'>${t}</span> `;
          }).join('');
      }
      bbContREG = bbContTag + bbContREG.trim()

      bbContREG = marked.parse(bbContREG)
        .replace(BILIBILI_REG, "<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=0' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'></iframe></div>")
        .replace(QQVIDEO_REG, "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>")
        .replace(YOUKU_REG, "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>")
        .replace(YOUTUBE_REG, "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>")

      //解析 content 内 md 格式图片
      let IMG_ARR = data[i].content.match(IMG_REG) || '',IMG_ARR_Grid = "";
      if(IMG_ARR){
        let IMG_ARR_Length = IMG_ARR.length,IMG_ARR_Url = "";
        if(IMG_ARR_Length !== 1){IMG_ARR_Grid = " grid grid-"+IMG_ARR_Length}
        IMG_ARR.forEach(item => {
            let imgSrc = item.replace(/!\[.*?\]\((.*?)\)/g,'$1')
            IMG_ARR_Url += `<figure class="gallery-thumbnail"><img class="img thumbnail-image" loading="lazy" decoding="async" src="${imgSrc}"/></figure>`
        });
        bbContREG += `<div class="resimg${IMG_ARR_Grid}">${IMG_ARR_Url}</div>`
      }

      //解析内置资源文件
      if(data[i].resourceList && data[i].resourceList.length > 0){
        let resourceList = data[i].resourceList;
        let imgUrl = "",resUrl = "",resImgLength = 0;
        for(let j=0;j < resourceList.length;j++){
          let restype = resourceList[j].type.slice(0,5);
          let resexlink = resourceList[j].externalLink
          let resLink = resexlink ? resexlink : 
                        memos+'o/r/'+resourceList[j].id+'/'+(resourceList[j].publicId || resourceList[j].filename)

          if(restype == 'image'){
            imgUrl += `<figure class="gallery-thumbnail"><img class="img thumbnail-image" src="${resLink}"/></figure>`
            resImgLength = resImgLength + 1 
          }else if(restype == 'video'){
            imgUrl += `<div class="video-wrapper"><video controls><source src="${resLink}" type="video/mp4"></video></div>`
          }else{
            resUrl += `<a target="_blank" rel="noreferrer" href="${resLink}">${resourceList[j].filename}</a>`
          }
        }
        if(imgUrl){
          let resImgGrid = ""
          if(resImgLength !== 1){resImgGrid = " grid grid-"+resImgLength}
          bbContREG += `<div class="resimg${resImgGrid}">${imgUrl}</div>`
        }
        if(resUrl){
          bbContREG += `<div class="resour">${resUrl}</div>`
        }
      }
      let memoIdNow = memoUrl.replace(/https\:\/\/(.*\.)?(.*)\..*/,'id-$2-')
      //查找当前 urls 中的 index 位置
      let uslIndexNow = urls.findIndex(item => (item.host == memos && item.creatorId == creatorId));
      
      let outSVG = '<span class="bbs-coment-svg bbs-outlink"><svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M864 640a32 32 0 0 1 64 0v224.096A63.936 63.936 0 0 1 864.096 928H159.904A63.936 63.936 0 0 1 96 864.096V159.904C96 124.608 124.64 96 159.904 96H384a32 32 0 0 1 0 64H192.064A31.904 31.904 0 0 0 160 192.064v639.872A31.904 31.904 0 0 0 192.064 864h639.872A31.904 31.904 0 0 0 864 831.936V640zm-485.184 52.48a31.84 31.84 0 0 1-45.12-.128 31.808 31.808 0 0 1-.128-45.12L815.04 166.048l-176.128.736a31.392 31.392 0 0 1-31.584-31.744 32.32 32.32 0 0 1 31.84-32l255.232-1.056a31.36 31.36 0 0 1 31.584 31.584L924.928 388.8a32.32 32.32 0 0 1-32 31.84 31.392 31.392 0 0 1-31.712-31.584l.736-179.392L378.816 692.48z"/></svg></span>'

      let comSVG = '<span class="bbs-coment-svg"><svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="24"><path d="M816 808H672c-4.8 0-8 1.6-11.2 4.8l-80 80c-36.8 36.8-97.6 36.8-136 0l-80-80c-3.2-3.2-6.4-4.8-11.2-4.8h-144c-70.4 0-128-57.6-128-128V232c0-70.4 57.6-128 128-128h608c70.4 0 128 57.6 128 128v448C944 750.4 886.4 808 816 808zm0-64c35.2 0 64-28.8 64-64V232c0-35.2-28.8-64-64-64H208c-35.2 0-64 28.8-64 64v448c0 35.2 28.8 64 64 64h144c20.8 0 41.6 8 56 24l80 80c12.8 12.8 32 12.8 44.8 0l80-80c14.4-14.4 35.2-24 56-24H816zM320 408c27.2 0 48 20.8 48 48v32c0 27.2-20.8 48-48 48s-48-20.8-48-48v-32c0-27.2 20.8-48 48-48zm192 0c27.2 0 48 20.8 48 48v32c0 27.2-20.8 48-48 48s-48-20.8-48-48v-32c0-27.2 20.8-48 48-48zm192 0c27.2 0 48 20.8 48 48v32c0 27.2-20.8 48-48 48s-48-20.8-48-48v-32c0-27.2 20.8-48 48-48z" /></svg></span>'

      let bbAvaDom = `
      <div class="bbs-avatar">
        <a href="${data[i].home}" target="_blank" rel="noopener noreferrer"><img src="${data[i].imgsrc}" alt=""></a><a href="javascript:void(0)" class="bbs-creator" onclick="urlsNow(this)" data-index="${uslIndexNow}">${data[i].creator}</a>
        <span class="bbs-dot">·</span>
        <span class="bbs-date" data-creator="${data[i].creator}" data-url="${memoUrl}" onclick="viaNow(this)">${new Date(data[i].updatedTs * 1000).toLocaleString()}</span>
        `

      result += `<li class="${memoIdNow+"memo-"+memoId}">
                    <a href="${memoUrl}" target="_blank" rel="noopener noreferrer">${outSVG}</a>`

  }// end for
  
  let bbBefore = "<section class='bbs-timeline'><ul class='list'>"
  let bbAfter = "</ul></section>"
  resultAll = bbBefore + result + bbAfter
  let loaderDom = document.querySelector('.loader') || ""
  if(loaderDom) loaderDom.remove()
  bbDom.insertAdjacentHTML('beforeend', resultAll);
  let btn = document.querySelector('button.button-load')
  if(btn){
    btn.textContent= '加载更多';
  }

  //图片灯箱
  window.ViewImage && ViewImage.init('.bbs-text img')
  //相对时间
  window.Lately && Lately.init({ target: '.bbs-date' });
}

// Fetch NeoDB
async function fetchNeoDB(url){
  let urlNow = "https://db.lzsay.com/?url="+url
  let response = await fetch(urlNow);
  let dbFetch = await response.json();
  let neodbDom = `<div class="db-card">
    <div class="db-card-subject">
        <div class="db-card-post"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" src="${dbFetch.cover_image_url}"></div>
        <div class="db-card-content">
            <div class="db-card-title"><a href="${url}" class="cute" target="_blank" rel="noreferrer">${dbFetch.title}</a></div>
            <div class="rating"><span class="allstardark"><span class="allstarlight" style="width:${dbFetch.rating*10}%"></span></span><span class="rating_nums">${dbFetch.rating}</span></div>
            <div class="db-card-abstract">${dbFetch.brief}</div>
        </div>
        <div class="db-card-cate">${dbFetch.category}</div>
    </div>
  </div>`
  return neodbDom
}
