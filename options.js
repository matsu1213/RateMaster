document.addEventListener('DOMContentLoaded', function() {
    // Switch 1
    const switch1 = document.getElementById('switch1') ?? true;
    const switch1Setting1 = document.getElementById('switch1-setting1') ?? true;
    const switch1Setting2 = document.getElementById('switch1-setting2') ?? true;
    const switch1Setting3 = document.getElementById('switch1-setting3') ?? false;
    const switch1Setting4 = document.getElementById('switch1-setting4') ?? true;
    const switch1Setting5 = document.getElementById('switch1-setting5') ?? false;
    const switch1Setting6 = document.getElementById('switch1-setting6') ?? false;
  
    // 保存された設定の読み込み
    const savedSwitch1 = localStorage.getItem('switch1') ?? true
    const savedSwitch1Setting1 = localStorage.getItem('switch1-setting1') ?? true;
    const savedSwitch1Setting2 = localStorage.getItem('switch1-setting2') ?? true;
    const savedSwitch1Setting3 = localStorage.getItem('switch1-setting3') ?? false;
    const savedSwitch1Setting4 = localStorage.getItem('switch1-setting4') ?? true;
    const savedSwitch1Setting5 = localStorage.getItem('switch1-setting5') ?? false;
    const savedSwitch1Setting6 = localStorage.getItem('switch1-setting6') ?? false;

    if(savedSwitch1){
        switch1.checked = JSON.parse(savedSwitch1)
    }
    if (savedSwitch1Setting1) {
      switch1Setting1.checked = JSON.parse(savedSwitch1Setting1);
    }
    if (savedSwitch1Setting2) {
        switch1Setting2.checked = JSON.parse(savedSwitch1Setting2);
    }
    if (savedSwitch1Setting3) {
        switch1Setting3.checked = JSON.parse(savedSwitch1Setting3);
    }
    if (savedSwitch1Setting4) {
        switch1Setting4.checked = JSON.parse(savedSwitch1Setting4);
    }
    if (savedSwitch1Setting5) {
        switch1Setting5.checked = JSON.parse(savedSwitch1Setting5);
    }
    if (savedSwitch1Setting6) {
        switch1Setting6.checked = JSON.parse(savedSwitch1Setting6);
    }
  
    // 設定が変更されたときに保存
    switch1.addEventListener('change', function() {
        const switch1Value = switch1.checked;
        localStorage.setItem('switch1', switch1Value);
    })
    switch1Setting1.addEventListener('change', function() {
      const setting1Value = switch1Setting1.checked;
      localStorage.setItem('switch1-setting1', setting1Value);
    });
    switch1Setting2.addEventListener('change', function() {
        const setting2Value = switch1Setting2.checked;
        localStorage.setItem('switch1-setting2', setting2Value);
    });
    switch1Setting3.addEventListener('change', function() {
        const setting3Value = switch1Setting3.checked;
        localStorage.setItem('switch1-setting3', setting3Value);
    });
    switch1Setting4.addEventListener('change', function() {
        const setting4Value = switch1Setting4.checked;
        localStorage.setItem('switch1-setting4', setting4Value);
    });
    switch1Setting5.addEventListener('change', function() {
        const setting5Value = switch1Setting5.checked;
        localStorage.setItem('switch1-setting5', setting5Value);
    });
    switch1Setting6.addEventListener('change', function() {
        const setting6Value = switch1Setting6.checked;
        localStorage.setItem('switch1-setting6', setting6Value);
    });
  
    // Switch 2
    const switch2 = document.getElementById('switch2') ?? true;
    const savedSwitch2 = localStorage.getItem('switch2') ?? true
    if(savedSwitch2){
        switch2.checked = JSON.parse(savedSwitch2)
    }
    switch2.addEventListener('change', function() {
        const switch2Value = switch2.checked;
        localStorage.setItem('switch2', switch2Value);
    })
  
    // Switch 3
    const switch3 = document.getElementById('switch3') ?? true;
    const savedSwitch3 = localStorage.getItem('switch3') ?? true
    if(savedSwitch3){
        switch3.checked = JSON.parse(savedSwitch3)
    }
    switch3.addEventListener('change', function() {
        const switch3Value = switch3.checked;
        localStorage.setItem('switch3', switch3Value);
    })
  
  });
  