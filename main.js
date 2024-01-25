onLoadPage();

var t;
var added = [];
var clicked = [];
var noteDataArray = []

var switch1 = true
var switch1Setting1 = true
var switch1Setting2 = true
var switch1Setting3 = false
var switch1Setting4 = true
var switch1Setting5 = false
var switch1Setting6 = false
var switch2 = true
var switch3 = true

loadFromSettings()

function loadFromSettings(){
  chrome.storage.local.get(["switch1", "switch1-setting1", "switch1-setting2", "switch1-setting3", "switch1-setting4", "switch1-setting5", "switch1-setting6", "switch2", "switch3"], function(value) {
    switch1 = value.switch1 ?? true
    switch1Setting1 = value.switch1Setting1 ?? true
    switch1Setting2 = value.switch1Setting2 ?? true
    switch1Setting3 = value.switch1Setting3 ?? false
    switch1Setting4 = value.switch1Setting4 ?? false
    switch1Setting5 = value.switch1Setting5 ?? false
    switch1Setting6 = value.switch1Setting6 ?? false
    switch2 = value.switch2 ?? true
    switch3 = value.switch3 ?? true
  })
}

function onLoadPage() {

  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      Array.from(record.addedNodes)
        .filter(tag => tag.nodeType == 1)
        .forEach((element) => {
          if(switch3){
            removeIfAlreadyRated(element)
          }
          if(isNoteSection(element) && isNote(element) && added.indexOf(element) == -1){
            if(switch1){
              addListener(element, false)
              notes = element.querySelectorAll('[data-testid="ratingStatus"]')
              for (const note of notes){
                displayInfo(note)
              }
            }
            added.push(element)
          }
        });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

}

function addListener(element, cache) {

  e = element.querySelectorAll(
    "div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-791edh.r-id7aif.r-15ysp7h.r-4wgw6l.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l, div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-791edh.r-id7aif.r-15ysp7h.r-4wgw6l.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l, div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-791edh.r-id7aif.r-15ysp7h.r-4wgw6l.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l"
  );
  //console.log(element);
  if (e != null) {
    for (const chil of e) {
      if (chil.innerText === "Yes" || chil.innerText === "はい") {
        chil.addEventListener(
          "click",
          function a() {
            if(clicked.indexOf(chil) != -1){
              return
            }
            //console.log("click")
            clicked.push(chil)
            if(t){ clearTimeout(t) }
            t = setTimeout(function () {
              parent = chil.closest(".css-175oi2r.r-g2wdr4.r-nsbfu8.r-1xfd6ze")
              if(parent == null){ parent = chil.closest(".css-175oi2r.r-g2wdr4.r-nsbfu8") }
              run(parent);
            }, 100);
          },
          false
        );
        //console.log(chil);
        chil.style.borderColor = "green";
        chil.style.borderWidth = "medium";
      }
    }
  }
}

function run(parent) {
  //console.log(parent);

  e = parent.querySelectorAll('input[type="checkbox"]');

  //console.log(e);

  if(switch1Setting1){
    e[0].click();
  }
  if(switch1Setting2){
    e[1].click();
  }
  if(switch1Setting3){
    e[2].click();
  }
  if(switch1Setting4){
    e[3].click();
  }
  if(switch1Setting5){
    e[4].click();
  }
  if(switch1Setting6){
    e[5].click();
  }

  submit = parent.querySelector(
    ".css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-1kihuf0.r-2yi16.r-1qi8awa.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l"
  );
  submit.click();
  if(switch2){
    setTimeout(checkAlreadyRatedAndBack, 500)
  }
  added = []
}

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  if (data.msg === 'rateFirst') {
    e = document.querySelector('.css-175oi2r.r-g2wdr4.r-nsbfu8.r-1xfd6ze')
    if(e){
      buttons = e.querySelectorAll(
        "div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-791edh.r-id7aif.r-15ysp7h.r-4wgw6l.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l, div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-791edh.r-id7aif.r-15ysp7h.r-4wgw6l.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l, div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-791edh.r-id7aif.r-15ysp7h.r-4wgw6l.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l"
      );
      if(buttons != null){
        for (const chil of buttons) {
          if (chil.innerText === "Yes" || chil.innerText === "はい") {
            chil.click()
          }
        }
      }
    }
  }else if(data.msg == 'noteDetails'){
    console.log("noteDetails")
  }
  return true
});

var injectScript = () => {
  var script = document.createElement('script');
  script.setAttribute('src', chrome.runtime.getURL('injected.js'));
  (document.head || document.documentElement).appendChild(script);
  script.remove();
};
injectScript()

window.addEventListener('note_load', (e) => {
  noteDataArray.push(...(e.detail.notes))
  setTimeout(applyToDom, 100)
})

function applyToDom(){
  nodes = document.querySelectorAll('[data-testid="ratingStatus"]')
  var count = 0
  if(nodes){
      for(const e of nodes){
          displayInfo(e)

          count = count + 1
      }
  }
}

function displayInfo(e){
  timeEle = e.querySelector('time')
  noteInfo = getNoteInfo(new Date(Date.parse(timeEle.dateTime)).getTime())
  if(noteInfo == null){
    return
  }
  e.childNodes[1].appendChild(e.childNodes[1].childNodes[2].cloneNode())
  desc = document.createElement('span')
  desc.innerText = noteInfo.alias + " 作成ポイント" + noteInfo.writingImpacts + " 評価ポイント" + noteInfo.ratingImpacts
  desc.style = 'text-overflow: unset; color: rgb(113, 118, 123); font-size: 13px;'
  desc.className = "css-1qaijid r-bcqeeo r-qvutc0 r-1tl8opc r-xoduu5 r-1q142lx r-1w6e6rj r-9aw3ui r-3s2u2q"
  e.childNodes[1].appendChild(desc)
}

function getNoteInfo(time){
//  console.log(noteDataArray)
  for(const n of noteDataArray){
    //console.log(n)
      if(n.created_at == time){
          return n
      }
  }
  return null
}

function checkAlreadyRatedAndBack(){
  if(document.querySelectorAll('.css-175oi2r.r-g2wdr4.r-nsbfu8.r-1xfd6ze').length == 0){
    window.history.back()
  }
}

function isNoteSection(element) {

  //console.log(element)

  if (
    element.className === "css-175oi2r" ||
    element.className === "css-175oi2r r-kemksi" ||
    element.className === "css-175oi2r r-aqfbo4 r-16y2uox"
  ) {
    return true;
  }
  return false;
}

function isNote(element) {
  //console.log(element)

  if (
    element.querySelector(
      "div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-791edh.r-id7aif.r-15ysp7h.r-4wgw6l.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l"
    ) != null
  ) {
    return true;
  }
  return false;
}

function removeIfAlreadyRated(element){
  tweet = element.querySelector('article')
  if(tweet != null){
    targetDiv = tweet.querySelector('div.css-175oi2r.r-1awozwy.r-1roi411.r-5kkj8d.r-18u37iz.r-16y2uox.r-1wtj0ep.r-1e081e0.r-1f1sjgu.r-eg6o18')
    if(targetDiv != null){
      target = targetDiv.querySelector('span')
      if(target != null && (target.innerText === "「役に立った」と評価しました" || target.innerText === "You rated as helpful")){
      tweet.remove()
      //console.log('deleted!')
    }
    }
  
  }
}

function getNoteRateButtonYes(element) {
  return element
    .querySelectorAll(
      "div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-791edh.r-id7aif.r-15ysp7h.r-4wgw6l.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l"
    )
    .filter((b) => b.innerText === "はい" || b.innerText === "Yes")[0];
}

function isNoteRateButton(element) {
  if (
    element.className ===
      "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-791edh r-id7aif r-15ysp7h r-4wgw6l r-ymttw5 r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l" ||
    element.className ===
      "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-791edh r-id7aif r-15ysp7h r-4wgw6l r-ymttw5 r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l" ||
    element.className ===
      "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-791edh r-id7aif r-15ysp7h r-4wgw6l r-ymttw5 r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"
  ) {
    return true;
  }

  return false;
}
