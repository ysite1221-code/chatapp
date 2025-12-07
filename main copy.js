
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved }
  from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "※＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊",
  authDomain: "type-sjr.firebaseapp.com",
  databaseURL: "**********************",
  projectId: "type-sjr",
  storageBucket: "type-sjr.firebasestorage.app",
  messagingSenderId: "******************",
  appId: "****************************"
};

// ★★★★★★★★★★★デバッグ用：常時チャット画面を表示、後で削除★★★★★★★★★★★★★★
// $("#register-screen").addClass("hidden");
// $("#chat-screen").removeClass("hidden");

// 進次郎フレーズ集
const shinjiroLines = [
  "力をパワーに。",
  "説明するということは、説明するということです。",
  "未来のことは、これから考えます。",
  "質問がいいですね。でも、答えがいいとは限らないんです。",
  "噴水は、上に水が上がるから噴水なんです。",
  "結果としての結果なんです。",
  "反対の反対は、賛成とは限らないんです。",
  "そうですね。でも、そうだと言えるほどそうかは、これからそうなるか次第です。",
  "そうですね。だからこそ、そうじゃないことの大切さも、そうなんです。",
  "そうですね。ただ、そうと言い切るには、言い切らない勇気が必要です。",
  "そうですね。まさに今、そうと思った気持ちが、そうではない未来をつくります。",
  "そうですね。でも私がそうと言ったからといって、そうとは限りません。",

  "なるほど。ただ、なるほどと言った瞬間に、なるほどは過去になります。",
  "なるほど。ですが、なるほどを理解するためには、理解をなるほどにする必要があります。",
  "なるほど。けれど、そのなるほどが、なるほどじゃないこともあるんです。",
  "なるほど。今のなるほどは、後でなるほどじゃなくなるなるほどです。",
  "なるほど。でも私がなるほどと言ったからといって、なるほどとは限りません。",

  "たしかに。でも確かかどうかを確かめることが一番確かじゃないんです。",
  "たしかに。だからこそ、不確かさが確かになる瞬間を大事にしたい。",
  "たしかにと言いましたが、確かにとは言っていません。",
  "たしかに。ただ、確かにしすぎると確かじゃなくなるんです。",
  "たしかに。たしかにと言うほどたしかさがたしかになってきました。",

  "その通りです。でも、通りが一本とは限りません。",
  "その通り。だからと言って、通るとは限らないんです。",
  "その通り。しかし、通り過ぎたあとの通り道が本当に通りたい道とは限りません。",
  "その通りなんですが、通りの向こう側にあるのは通りとは限りません。",
  "その通り。でも、通りを通るのが通り一遍ではいけません。",

  "わかります。でも、わかるとは限らないからこそ、わかるんです。",
  "わかります。ただ、わからないことがわかってくると、わかることがわからなくなる。",
  "わかります。でも私がわかっているとき、わかっていない私もいるんです。",
  "わかります。だけど、わかった気になることが一番わからなくなる道なんです。",
  "わかります。でも“わかる”の反対は“わからない”とは限りません。",

  "いいですね。ただ、いいと思うかどうかは、いいと思える自分次第です。",
  "いいですね。でも、いいものがいいとは限らないんです。",
  "いいですね。しかし、いいと感じている間に、いいがよくなくなることもあります。",
  "いいですね。ただ、いいと言った私がいいとは限りません。",
  "いいですね。でも、いいの基準はいいときほどいい加減になります。",

  "もちろん。でも、もちろんと言い切るにはもちろんじゃない覚悟が必要です。",
  "もちろん。ただ、その“もちろん”がもちろんである保証はどこにもありません。",
  "もちろん。だけど、もちろんを当然と思うことが当然ではありません。",
  "もちろん。しかし、それが当然だと思うほど当然じゃなくなるんです。",
  "もちろんです。ただ、もちろんでない未来ももちろんあります。",

  "そう思います。でも、思うということは思っていない自分も思っているんです。",
  "そう思います。でもそれを思わない私が、今は思っています。",
  "そう思います。ただ、思えば思うほど思い込みになります。",
  "そう思います。しかし、その思いが思いを超えたとき、思いは思いのままではありません。",
  "そう思います。ただ、その思いは思い出になって思い出せなくなるかもしれない。"
];

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db, "type-sjr"); //firebaseのアプリ名


// ユーザー登録画面処理
$("#register-btn").on("click", function () {

  // 名前を保存 trim()は余計なスペースを削除するやつ
  const name = $("#username-input").val().trim();
  localStorage.setItem("username", name);

  // 画面切り替え
  $("#register-screen").addClass("hidden");
  $("#chat-screen").removeClass("hidden");

  alert("登録しました");

});

//送信イベント
$("#send-btn").on("click", function () {
  const text = $("#message-input").val().trim(); //trimは不要なデータを削除
  if (!text) return;

  const username = localStorage.getItem("username") || "名無し";

  const msg = {
    text: text,
    user: username,
    time: Date.now()   // ← UNIX時間
  };

  const newPostRef = push(dbRef);  //ユニークキー生成
  set(newPostRef, msg);            //DBに保存

  // ★ ここで進次郎を呼ぶ
  maybePostShinjiro();

  $("#message-input").val(""); // 送信後クリア
});

// 進次郎がランダムに割り込む
function maybePostShinjiro() {
  // 90% の確率で割り込む
  const r = Math.random();
  if (r < 0.1) {
    return; // 何もせず帰る
  }

  // フレーズをランダムに1つ選ぶ
  const index = Math.floor(Math.random() * shinjiroLines.length);
  const line = shinjiroLines[index];

  const msg = {
    text: line,
    user: "進次郎",
    time: Date.now()
  };

  const newPostRef = push(dbRef);
  set(newPostRef, msg);
}

// ログイン中ユーザー名（localStorageから取得）
const currentUser = localStorage.getItem("username") || "名無し";

// 受信イベント
onChildAdded(dbRef, function (data) {
  const msg = data.val(); // { text, user, time } が入っている
  console.log("受信:", data.key, msg); // デバッグ

  addMessage(msg);  // ← とりあえず全部同じ見た目で表示
});

// メッセージ描画（左右振り分け）
function addMessage(msg) {
  const user = msg.user || "名無し";
  const timeText = msg.time
    ? new Date(msg.time).toLocaleTimeString()
    : "";

  // その時点の自分の名前
  const currentUser = localStorage.getItem("username") || "名無し";
  const isMe = (user === currentUser);

  // 行コンテナ
  const $row = $("<div>").addClass("message-row");
  // 自分なら右側、他人なら左側クラス
  $row.addClass(isMe ? "me" : "other");

  // 吹き出し
  const $bubble = $("<div>").addClass("bubble");

  // 上段：名前＋時刻
  const $meta = $("<div>").addClass("meta").text(`${user}（${timeText}）`);

  // 本文
  const $text = $("<div>").addClass("text").text(msg.text);

  $bubble.append($meta).append($text);
  $row.append($bubble);

  $("#chat-body").append($row);

  // 一番下までスクロール
  const chatBody = document.getElementById("chat-body");
  chatBody.scrollTop = chatBody.scrollHeight;
}
