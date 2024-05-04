let videodata;
let number = 0;
const videoArea = document.getElementById("video");
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const button = document.getElementById("btn");
function getData() {
  return new Promise((resolve, reject) => {
    console.log("getDataはじめました～♪");
    // ajax.jsonからデータを取得する処理を記述
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState == 4) {
        if (request.status == 200) {
          console.log("レスポンス届きました～");
          // videodata = request.response;
          console.log(videodata);
          resolve(request.response);
        } else {
          reject(new Error(request.statusText));
        }
      }
    };
    request.open("GET", "ajax.json");
    request.responseType = "json";
    request.send(null);
  });
}

function registerClickEvent() {
  // ボタンがクリックされた際の処理を記述
  // ajax.jsonからデータを取得していない場合のみ、getDataの処理を呼び出す
  button.addEventListener("click", changeVideo);
}

function changeVideo() {
  console.log("changeVideoはじめました～♬");
  if (videodata) {
    console.log(videodata[number].title);
    titleArea.innerHTML = videodata[number].title;
    contentArea.innerHTML = videodata[number].content;
    videoArea.setAttribute("src", videodata[number].url);
    number == 2 ? (number = 0) : number++;
  } else {
    getData().then((response) => {
      videodata = response;
      changeVideo();
    }).catch((response) => {
      console.log('failed with ', response);
    });
  }
}
window.onload = registerClickEvent();
