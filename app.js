class App {
  constructor() {
    this.gameOver = this.gameOver.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.canvas = document.querySelector('#screen');
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.ctx = this.canvas.getContext('2d');
    this.audio = new Audio("./sounds/A Christmas Rock Medley (mp3cut.net) (1).mp3");
    this.game = new SpaceGame(this.canvas, this.gameOver);

    //initial screen information
    const textScreen = new TextWriter(this.ctx);
    textScreen.writeLine('CHRISTMAS INVASION');
    textScreen.writeLine('Press ENTER to start');
    textScreen.writeLine('                      ');
    textScreen.writeLine('ARROW LEFT AND RIGHT TO MOVE');
    textScreen.writeLine('PRESS SPACE TO SHOOT');
    textScreen.writeLine('');
    textScreen.writeLine('');
    textScreen.writeLine('');
    textScreen.writeLine('You can get hit 3 times');
    this.listenForStartGame();

  }


  gameOver(score) {
    this.clearScreen();
    const textScreen = new TextWriter(this.ctx);
    textScreen.writeLine('GAME OVER');
    textScreen.writeLine(`SCORE: ${score}`);
    textScreen.writeLine();
    textScreen.writeLine('Press ENTER to play again');
    this.listenForStartGame();
    this.audio.pause();
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  listenForStartGame() {
    document.addEventListener('keyup', this.onKeyUp);
  }

  onKeyUp(event) {
    const key = event.key;
    if (key === 'Enter') {
      this.startGame();
    }
  }

  startGame() {
    document.removeEventListener('keyup', this.onKeyUp);
    this.game.start(this.canvas);
    //let audio = new Audio("./sounds/A Christmas Rock Medley (mp3cut.net) (1).mp3");
    console.log("this.audio", this.audio)
    this.audio.play();

  }
}

const LINE_HEIGHT = 30;
class TextWriter {
  constructor(context) {
    this.ctx = context;
    this.y = canvasHeight / 3;
    this.color = 'white';
  }

  setColor(color) {
    this.color = color;
  }
  
//Write text on screen

  writeLine(textInput) {
    const text = textInput || '';
    this.ctx.fillStyle = this.color;
    this.ctx.font = '20px Consolas, monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, canvasWidth / 2, this.y);
    this.y += LINE_HEIGHT;
  }
}