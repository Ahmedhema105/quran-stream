let api = "https://mp3quran.net/api/v3";
let reciters = "/reciters";
let lang = "ar";
let selectReciters = document.getElementById("selectReciters");
let selectRaweh = document.getElementById("selectRaweh");
let selectSuarh = document.getElementById("selectSuarh");
let surahadio = document.getElementById("surahadio");
let selectRadio = document.getElementById("selectRadio");
let radioPlay = document.getElementById('radioPlay')
async function getReciters() {
  let res = await fetch(`${api}/reciters?language=${lang}`);
  let Data = await res.json();
  selectReciters.innerHTML = `<option disabled selected>اختر القارئ</option>`;
  Data.reciters.forEach((reciter) => {
    selectReciters.innerHTML += `<option value="${reciter.id}">${reciter.name}</option>`;
    selectReciters.onchange = (e) => getMoshaf(e.target.value);
  });
}
getReciters();

async function getMoshaf(reciter) {
  let res = await fetch(`${api}/reciters?language=${lang}&reciter=${reciter}`);
  let Data = await res.json();
  let moshafs = Data.reciters[0].moshaf;
  selectRaweh.innerHTML = `<option disabled selected>اختر الرواية</option>`;
  
  moshafs.forEach((Raweh) => {
    selectRaweh.innerHTML += `<option data-surah_list="${Raweh.surah_list}" data-server="${Raweh.server}" value="${Raweh.id}">${Raweh.name}</option>`;
    selectRaweh.onchange = (e) => {
      let selectdRaweh = selectRaweh.options[selectRaweh.selectedIndex];
      let surhserver = selectdRaweh.dataset.server;
      let surhlist = selectdRaweh.dataset.surah_list;
      getSuarh(surhserver, surhlist);
    };
  });
}

async function getReciters() {
  let res = await fetch(`${api}/reciters?language=${lang}`);
  let Data = await res.json();

  selectReciters.innerHTML = `<option disabled selected>اختر القارئ</option>`;

  Data.reciters.forEach((reciter) => {
    selectReciters.innerHTML += `<option value="${reciter.id}">${reciter.name}</option>`;
  });

  selectReciters.onchange = (e) => getMoshaf(e.target.value);
}

async function getMoshaf(reciter) {
  let res = await fetch(`${api}/reciters?language=${lang}&reciter=${reciter}`);
  let Data = await res.json();
  let moshafs = Data.reciters[0].moshaf;

  selectRaweh.innerHTML = `<option disabled selected>اختر الرواية</option>`;
  moshafs.forEach((Raweh) => {
    selectRaweh.innerHTML += `<option data-surah_list="${Raweh.surah_list}" data-server="${Raweh.server}" value="${Raweh.id}">${Raweh.name}</option>`;
  });

  selectRaweh.onchange = () => {
    let selectdRaweh = selectRaweh.options[selectRaweh.selectedIndex];
    let surhserver = selectdRaweh.dataset.server;
    let surhlist = selectdRaweh.dataset.surah_list;
    getSuarh(surhserver, surhlist);
  };
}

async function getSuarh(surhserver, surhlist) {
  let res = await fetch(`https://www.mp3quran.net/api/v3/suwar`);
  let Data = await res.json();
  let surahName = Data.suwar;

  surhlist = surhlist.split(",");
  selectSuarh.innerHTML = `<option disabled selected>اختر السورة</option>`;

  surhlist.forEach((surah) => {
    let padsurah = surah.padStart(3, "0");
    let foundSurah = surahName.find(s => s.id == surah);
    if (foundSurah) {
      selectSuarh.innerHTML += `<option value="${surhserver}${padsurah}.mp3">${foundSurah.name}</option>`;
    }
  });

  selectSuarh.onchange = () => {
    let selectdSuarh = selectSuarh.options[selectSuarh.selectedIndex];
    playsurah(selectdSuarh.value);
  };
}

function playsurah(surahmp3) {
  surahadio.src = surahmp3;
  surahadio.load();
  surahadio.play();
}


async function radio() {
  let res = await fetch(`https://mp3quran.net/api/v3/radios?language=ar`);
  let Data = await res.json();

  Data.radios.forEach((radio) => {
    selectRadio.innerHTML += `<option value="${radio.id}">${radio.name}</option>`;
  });

  selectRadio.onchange = () => {
    let selectedRadio = Data.radios.find(r => r.id == selectRadio.value);
    if (selectedRadio) {
      radioPlay.src = selectedRadio.url;
      radioPlay.load();  
      radioPlay.play(); 
    }
  };
}

radio();





