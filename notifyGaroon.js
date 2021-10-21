// LINE Notifyでトークルームのトークンを取得して以下に設定。トークンは環境変数に設定
var LINE_NOTIFY_TOKEN = PropertiesService.getScriptProperties().getProperty('LINE_NOTIFY_TOKEN');
var NOTIFY_API = "https://notify-api.line.me/api/notify";
// サブドメイン、ユーザID、パスワードは環境変数に設定
var SUB_DOMAIN = PropertiesService.getScriptProperties().getProperty('SUB_DOMAIN');
var USER_ID = PropertiesService.getScriptProperties().getProperty('USER_ID');
var PASSWORD = PropertiesService.getScriptProperties().getProperty('PASSWORD');
var garoon_url = "https://" + SUB_DOMAIN + ".cybozu.com/g/api/v1/notification/items";
var auth = Utilities.base64Encode(USER_ID + ":" + PASSWORD, Utilities.Charset.UTF_8)

function myFunction() {

  var headers = {
    'X-Cybozu-Authorization': auth
  };
  var options = {
    "headers" : headers,
  };

  var response = UrlFetchApp.fetch(garoon_url, options);
  var json = JSON.parse(response.getContentText());

  var bodyItem = [];

  var date = new Date();
  var today = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyyMMdd');
  var hour = Number(Utilities.formatDate(date, 'Asia/Tokyo', 'HH'));

  for (var jj = 0; jj < json.items.length; jj++) {
    // "createdAt": "2017-09-26T06:25:18Z",
    var createDate = json.items[jj].createdAt.slice(0, 4) + json.items[jj].createdAt.slice(5, 7) + json.items[jj].createdAt.slice(8, 10);
    var createTime = Number(json.items[jj].createdAt.slice(11, 13)) + 9;

    // "isRead": false
    if (json.items[jj].isRead == false && createDate == today && (hour - createTime <= 1)) {
      // "url": "https://{subdomain}.cybozu.com/g/space/application/discussion/index.csp?spid=1",
      // "title": "Developmennt schedule discussion",
      bodyItem.push(json.items[jj].title);
      bodyItem.push(json.items[jj].url);
    }
  }

  // メッセージ送信
  if (bodyItem.length > 0) {
    _sendMessage(bodyItem.join("\n"));
  }
}

function _sendMessage(msg) {
  // 認証情報のセット
  var headers = {
    "Authorization": "Bearer " + LINE_NOTIFY_TOKEN
  };
  // メッセージをセット
  var payload = {
    "message": "\n" + msg
  };
  // 送信情報をまとめる
  var options = {
    'method' : 'post',
    'contentType' : 'application/x-www-form-urlencoded',
    'headers': headers,
    'payload' : payload
  };
  // 実際に送信する
  var response = UrlFetchApp.fetch(NOTIFY_API, options);
}
