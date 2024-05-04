`XmlHttpRequest` でのあれこれ
===========================

実行方法
-------

1. 依存パッケージのインストール

```bash
$ npm install
```

2. ローカルでHTTP Serverを起動する

```bash
$ npx http-server
Starting up http-server, serving ./

http-server version: 14.1.1

http-server settings: 
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://127.0.0.1:8080
  http://192.168.100.200:8080
Hit CTRL-C to stop the server
```

解説
----

Change Videoボタンを（初めて）押下したときの挙動は以下の通り。

1. `changeVideo()` が呼ばれる
    1. まだ `videodata` は空なので、 `else` 節を実行する
    2. `getData()` を呼び出す
        1. `Promise` オブジェクトを作る。その中で行う処理は…
        2. `XMLHttpRequest` オブジェクトを作る
        3. `onreadystatechange` プロパティに、関数を代入する。ここではこの関数はまだ実行されない
        4. `open()` & `send()` で実際にリクエストの送信を始める
        5. レスポンスが届くと、先程 `onreadystatechange` プロパティに代入した関数を実行する
            1. `request.status` が200なら（= 正しくレスポンスを受け取れたら）、Promiseの `resolve()` にレスポンスのデータを渡す
    3. レスポンスが届いて `getData()` 内の `resolve()` が呼ばれると、 `getData().then(...)` 部分が実行される
        1. `getData()` から渡された `response` を `videodata` に代入する
        2. `changeVideo()` をもう一度呼び出す
        3. 二回目に呼ばれた `changeVideo()` は、 `videodata` にデータを設定されたあとに呼び出されるので、 `if (videodata) {...}` 部分が実行される
2. `videodata` はすでにデータが設定されているので、以降ボタンを押下して `changeVideo()` が呼び出されても `else` に入ることはない


参考記事
-------

- [とりあえず Promise な XMLHttpRequest したい時に書くコード](https://qiita.com/terunuma/items/837b5f4efc4b72d08fb5)
