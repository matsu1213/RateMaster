onLoadPage();

var t;
var added = [];

function onLoadPage() {
  //setTimeout(addListener, 3000);
  //window.addEventListener('popstate', onLoadFromCache);

  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      Array.from(record.addedNodes)
        .forEach((element) => {
          removeIfAlreadyRated(element)
          if(isNoteSection(element) && isNote(element) && added.indexOf(element) == -1){
            addListener(element, false)
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

function onLoadFromCache(){
  addListener(document, true)
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
          function () {
            if(t){ clearTimeout(t) }
            console.log("click!");
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

  e[0].click();
  e[1].click();
  e[3].click();

  submit = parent.querySelector(
    ".css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-1kihuf0.r-2yi16.r-1qi8awa.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l"
  );
  submit.click();
  added.splice(0)
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
      console.log('deleted!')
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
