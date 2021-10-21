# notifyGaroon(Google Apps Script(GAS)用)
### 概要
- 1時間おきにGaroonの新着通知を取得し、LINE Notify APIで自分宛に新着通知タイトルとURLを送信する

### LINE Notifyのトークン発行
- [参考記事：LINE Notify + GoogleAppsScript + Googleカレンダーで明日の予定を絶対忘れない](https://qiita.com/imajoriri/items/e211547438967827661f)

### 環境準備
- 自身のマイドライブ上に新規GASファイルを作成し、ソースコードをコピペ
- 環境変数の設定
  - GASの新エディタでは環境変数を設定できないため、下記のオペレーションを行う
    - 「以前のエディタを使用」をクリック
    - 「ファイル」⇒「プロジェクトのプロパティ」⇒「スクリプトのプロパティ」で各環境変数を設定
      - LINE_NOTIFY_TOKEN
        - LINE Notifyのアクセストークン
      - SUB_DOMAIN
        - Garoonのドメイン
      - USER_ID
        - GaroonのログインID
      - PASSWORD
        - Garoonのログインパスワード
    - 環境変数を設定後は、元の新エディタに戻しても問題なし
- スケジューラの設定
  - トリガーにて、1時間おきに実行されるように設定