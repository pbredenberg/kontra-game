import { init, initKeys, keyPressed, Sprite, Text, GameLoop, collides, getCanvas } from 'kontra';
import displayCanvas from './display/canvas';
import { playerStats } from './state';

const { canvas } = init();

[
    () => displayCanvas(canvas)
]
    .forEach(module => module())

initKeys();

const xpScore = Text({
    text: 'XP: ' + playerStats.xp,
    font: '12px Arial',
    color: 'black',
    x: 0,
    y: 0,
    textAlign: 'right'
});

const sign = Sprite({
    x: 42,
    y: 111,
    color: 'black',
    width: 5,
    height: 5
});

const sprite = Sprite({
  x: 0,        // starting x,y position of the sprite
  y: 0,
  color: 'red',  // fill color of the sprite rectangle
  width: 5,     // width and height of the sprite rectangle
  height: 10,
  update: function() {
    if (keyPressed('left') || keyPressed('a')){
        sprite.x = sprite.x - 2;
    } else if (keyPressed('right') || keyPressed('d')) {
        sprite.x = sprite.x + 2;
    }

    if (keyPressed('up') || keyPressed('w')) {
        sprite.y = sprite.y - 2;
    } else if (keyPressed('down') || keyPressed('s')) {
        sprite.y = sprite.y + 2;
    }
  }
});

const loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    sprite.update();

    // wrap the sprites position when it reaches
    // the edge of the screen
    if (sprite.x > canvas.width) {
        sprite.x = 0;
    } else if (sprite.x < 0) {
        sprite.x = canvas.width;
    }

    if (sprite.y > canvas.height) {
        sprite.y = 0;
    } else if (sprite.y < 0) {
        sprite.y = canvas.height;
    }

    if (collides(sprite, sign)) {
        playerStats.xp = playerStats.xp + 1;
        xpScore.text = 'XP:' + playerStats.xp;
    }
  },
  render: function() { // render the game state
    sprite.render();
    sign.render();
    xpScore.render();
  }
});

loop.start();    // start the game
