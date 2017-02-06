$(function(){
  var socket = null;
  var msgBox = $("#chatbox textarea");
  var messages = $("#messages");
  $("#chatbox").submit(function() {
    if (!msgBox.val()) return false;
    if (!socket) {
      alert("エラー: WebSocket接続が行われていません。");
      return false;
    }
    socket.send(msgBox.val());
    msbBox.val("");
    return false;
  })

  if (!window["WebSocket"]) {
    alert("エラー: WebSocektに対応していないブラウザです。")
  } else {
    socket = new WebSocket("ws://localhost:8080/room");
    socket.onclose = function() {
      alert("接続が終了しました。")
    }
    socket.onmessage = function(e) {
      messages.append($("<li>").text(e.data));
    }
  }
});
