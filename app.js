
// Httpのモジュールの読み込み
var http = require("http");

// 8000番ポートでHTTPサーバ起動
http.createServer(function(request, response) {

   // レスポンスで返すHTTP header(with HTTP status Content type)
   response.writeHead(200, {'Content-Type': 'text/plain'});

   var { Client } = require('pg');

   var client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'miyazato0',
      port:5432
      
   })
   
   client.connect();
   
   const query = {
      text:'INSERT INTO test(text) VALUES($1)',
      values:['お'],
   }
   
   //コールバック関数を使ったクエリ操作
   /*client.query(query, (err, res) => { 
      if (err) {//エラーだったらエラーを返す
         console.log(err.stack)
      } else { //正常だったらレスポンスをかえす
         console.log(res.rows[0])
      }
   })*/
   
   //promiseによるクエリ操作 そもそも通常時とエラー時の処理を振り分けるものなので判定の判定文必要なし
   client.query(query)
      .then(res => console.log(res.rows[0]))//正常時の処理（通常時はthenの処理を実行する）
      .catch(er => console.log(er.stack))//エラー時の処理（エラーが発生した時はcatchの処理を実行する）
   
      // レスポンスで返すbody
      response.end('res.rows[0]\n');


}).listen(8000);




// 起動ログ
console.log('Server running at http://127.0.0.1:8000/');


