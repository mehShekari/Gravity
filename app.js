function init() {
  const canvas = document.getElementById('canvas');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const ctx = canvas.getContext('2d');
  const gravity = 0.5;
  const speed = 0.5;

  const colors = [
    "#E7885F",
    '#BB999C',
    '#9999C3',
    '#7B8CDE',
    '#C0E6DE',
    "#0c2d48",
    '#b1d4e0'
  ];

  function Circle(x, y, dx, dy, radius, v, flag, flag2) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.draw;
    this.update;
    this.v = v;
    this.flag = flag;
    this.flag2 = flag2;
    this.color = colors[Math.floor(Math.random() * 7)];
    this.gravity = Math.max(Math.random(), 0.1);

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    this.update = function () {
      if (this.x + this.radius > canvas.width) {
        this.dx = (-this.dx);
      } else if (this.x - this.radius < 0) {
        this.dx = (-this.dx);
      }
      this.x += this.dx;

      if (this.y + this.dy + this.radius > canvas.height) {
        this.dy = -(this.dy) * 0.69;
      } else {
        this.dy += speed;
      }

      this.y += this.dy;

      if (this.y + this.radius > canvas.height && this.flag == 0 && this.flag2 == 0) {
        this.v = this.v * (-0.8);
        if (Math.abs(this.v) < 3) {
          this.v = 0;
          this.y = canvas.height - this.radius;
          this.flag2 = 1;
        }
        this.flag = 1;
      }

      if (this.flag2 == 0) {
        this.dy = this.v * 0.4;
        this.y += this.dy;
        this.v += speed;

        if (this.y + this.radius <= canvas.height) {
          this.flag = 0;
        }
      }
      this.draw();
    }
  }



  let allCircle = [];
  for (let i = 0; i < 100; i++) {
    let radius = Math.floor((Math.random() * 3) * 10);
    let x = Math.random() * canvas.width - radius;
    let y = Math.random() * canvas.height - radius;
    let dx = Math.random() * 3 + 1;
    let dy = Math.random() * 3 + 1;
    allCircle.push(new Circle(x, y, dx, dy, radius, 0, 0, 0, 0));
  }

  function init() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < allCircle.length; i++) {
      allCircle[i].update();
    }
    requestAnimationFrame(init);
  }

  init();
}

window.onload = function () {
  init()
}
