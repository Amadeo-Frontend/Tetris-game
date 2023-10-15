const myAudio = document.getElementById('myAudio');
function togglePlay() {
  return myAudio.pause ? myAudio.play() : myAudio.pause();
}

document.getElementById('start_game').addEventListener('click', function () {
  document.getElementById('tetris').style.border = 'solid .2rem #f2f2f2';
  document.getElementById('start_game').style.display = 'none';
  document.getElementById('restart_game').style.display = 'block';
  document.getElementById('demo-img').style.display = 'none';
  document
    .getElementById('restart_game')
    .addEventListener('click', function () {
      player.pos.y = 0;
      merge(arena, player);
      dropInterval = 500;
      document.getElementById('levels').innerText = 'Level 1';
    });
  const canvas = document.getElementById('tetris');
  const context = canvas.getContext('2d');
  context.shadowColor = 'black';
  context.shadowOffsetX = 0.5;
  context.shadowOffsety = 0.5;
  context.scale(20, 20);

  function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
      for (let x = 0; x < arena[y].length; ++x) {
        if (arena[y][x] === 0) {
          continue outer;
        }
      }
      const row = arena.splice(y, 1)[0].fill(0);
      arena.unshift(row);
      ++y;
      player.score += rowCount * 10;
      rowCount *= 2;
    }
  }
  function colide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y > m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 && arena[y + u.y][x + o.x] !== 0) {
          return true;
        }
      }
    }
    return false;
  }
});
function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}
