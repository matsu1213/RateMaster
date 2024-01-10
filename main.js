onLoadPage();

function onLoadPage() {
  //setTimeout(addListener, 3000);

  const observer = new MutationObserver((records) => {
    records.forEach((record) => {
      Array.from(record.addedNodes)
        .filter((n2) => isNoteSection(n2) && isNote(n2))
        .forEach((element) => addListener(element));
    });
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

function addListener(element) {
  e = element.querySelectorAll(
    "div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-791edh.r-id7aif.r-15ysp7h.r-4wgw6l.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l, div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-791edh.r-id7aif.r-15ysp7h.r-4wgw6l.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l, div.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-791edh.r-id7aif.r-15ysp7h.r-4wgw6l.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l"
  );
  console.log(element);
  if (e != null) {
    for (const chil of e) {
      if (chil.innerText === "Yes" || chil.innerText === "はい") {
        chil.addEventListener(
          "click",
          function () {
            console.log("click!");
            setTimeout(function () {
              run(chil.closest(".css-175oi2r.r-g2wdr4.r-nsbfu8.r-1xfd6ze"));
            }, 100);
          },
          false
        );
        console.log(chil);
        chil.style.borderColor = "green";
        chil.style.borderWidth = "medium";
      }
    }
  }
}

function run(parent) {
  console.log(parent);

  e = parent.querySelectorAll('input[type="checkbox"]');

  console.log(e);

  e[0].click();
  e[1].click();
  e[3].click();

  submit = parent.querySelector(
    ".css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-1kihuf0.r-2yi16.r-1qi8awa.r-ymttw5.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l"
  );
  submit.click();
}

function isNoteSection(element) {
  if (
    element.className === "css-175oi2r" ||
    element.className === "css-175oi2r r-kemksi"
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
