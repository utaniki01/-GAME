var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//描画処理では毎回記入
canvas.width = 480;
canvas.height = 550;//553でぎちぎち
//canvas.height = 320;
var ballRadius = 10;//円の半径
var x = canvas.width / 2;//ボールの位置
var y = canvas.height - 30;
var dx = 2;//ずらす座標の値
var dy = -2;
//バー（パドル）の座標と高さ横幅を定義
var paddleHeight = 10;   // パドルの高さ
var paddleWidth = 75;    // パドルの横幅
var paddleX = (canvas.width - paddleWidth) / 2; // 横位置（中央スタート）

//左右キーのイベント変数デフォではfalse
var rightPressed = false;
var leftPressed = false;
var over=document.getElementById("GAMEOVER")

//キーを押したり離したりで定義したキーの論理を変化する関数を実行
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//左右矢印キーがどちらか押されている間左右キーのイベント変数のどちらかをtrueに
function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

//左右矢印キーがどちらか離されている間左右キーのイベント変数のどちらかをtrueに
function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}


// 円を軌道？座標？をずらしてすこしづつ描画する関数
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//バー(パドル)の視覚化する関数
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}


function draw() {
  //一度画面全体をまっさらに
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  
  //右端と左端の向かう座標の反転
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  //上端の座標の反転下端の場合GAMR OVER
  if(y + dy < ballRadius) {
        dy = -dy;
    }
else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            over.style.display="block"//隠したGAME OVERを表示
            clearInterval(interval); // Needed for Chrome to end game
            setTimeout(()=>{
                document.location.reload();
            },2000);//1.5ミリ後再読み込み        
            }
      }
     if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);//10ミリ秒ごとにdraw実行の処理の場所を格納





