var CHANNEL_ACCESS_TOKEN = 'CP0FHWE/eHzbfJl4U1A5CbjQN7blT0FNXONfuk6mPB21EiMJGFYlCZeka9aXIIzD2NrdWQg+D9CzCBgBvSLGO8LNsF+Bu1RgdblZDkR97dr+ZnhK5cGsAtzKVeiAEuxIS35tQVLx5Ea7zOHz49/8YwdB04t89/1O/w1cDnyilFU='; // Channel_access_tokenを登録
var line_endpoint = 'https://api.line.me/v2/bot/message/reply';

let ans = ["ぴえん", "ぱおん"]

        function doPost(e) {
          // JSONをパース
          var json = JSON.parse(e.postData.contents);

          // 送信メッセージを取得
          var user_message = json.events[0].message.text;

          // 返信するためのトークンを取得
          var reply_token= json.events[0].replyToken;
          if (typeof reply_token === 'undefined') {
            return;
          }

          // 返信するメッセージを配列で用意する
          var reply_messages;
          if ('今日の気分は？' == user_message) {
            // 「今日の気分は？」と入力されたときの返信メッセージ
            reply_messages = [ans[Math.floor(ans.length * Math.random())]];

          } else {
            // その他の入力に対する処理
            reply_messages = ["今日の気分は？と入力してみてね"];
          }

          // メッセージ返信
          var messages = reply_messages.map(function (v) {
            return {'type': 'text', 'text': v};
          });
          UrlFetchApp.fetch(line_endpoint, {
            'headers': {
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
            },
            'method': 'post',
            'payload': JSON.stringify({
              'replyToken': reply_token,
              'messages': messages,
            }),
          });
          return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
        }