const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Events = Matter.Events

const engine = Engine.create()

const custWidth = window.innerWidth
const custHeight = window.innerHeight

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: custWidth,
    height: custHeight,
    wireframes: false
  }
})

const topWall = Bodies.rectangle(custWidth/2, 0, custWidth, 20, { isStatic: true, density: 10000, restitution: 1 })
const leftWall = Bodies.rectangle(0, custHeight/2, 20, custHeight, { isStatic: true, density: 10000})
const rightWall = Bodies.rectangle(custWidth, custHeight/2, 20, custHeight, { isStatic: true, density: 10000 })
const bottomWall = Bodies.rectangle(custWidth/2, custHeight, custWidth, 20, { isStatic: true, density: 10000, restitution: 1  })

const bat1 = Bodies.rectangle(custWidth - 50, custHeight/2, 20, 200, { restitution: 1, isStatic: true, render: {fillStyle: 'skyblue'} })
const bat2 = Bodies.rectangle(50, custHeight/2, 20, 200, { restitution: 1, isStatic: true, render: {fillStyle: 'pink'} })

const ball = Bodies.circle(custWidth/2, custHeight/2, 20, { inertia: Infinity, restitution: 1, friction: 0, frictionAir: 0, frictionStatic: 0 })

World.add(engine.world, [topWall, leftWall, rightWall, bottomWall, bat1, bat2, ball])

World.add(engine.world, Matter.MouseConstraint.create(engine, {
  mouse: Matter.Mouse.create(render.canvas)
}))


const keyPress = (event) => {
  //Uparrow
  if (event.keyCode === 38 && bat1.position.y > 100) {
    Body.translate(bat1, {x: 0, y: -200})
  }
  //DownArrow
  if (event.keyCode === 40 && bat1.position.y < custHeight - 100) {
    Body.translate(bat1, {x: 0, y: 200})
  }
  //w
  if (event.keyCode === 87 && bat2.position.y > 100) {
    Body.translate(bat2, {x: 0, y: -200})
  }
  //s
  if (event.keyCode === 83 && bat2.position.y < custHeight - 100) {
    Body.translate(bat2, {x: 0, y: 200})
  }
}

Body.setVelocity(ball, {x: 20, y: 3})

let score1 = 0, score2 = 0

const isCollide = () => {
  const bat1Ball = Matter.SAT.collides(bat1, ball)
  const bat2Ball = Matter.SAT.collides(bat2, ball)
  const bat1Win = Matter.SAT.collides(rightWall, ball)
  const bat2Win = Matter.SAT.collides(leftWall, ball)

  if (bat1Ball.collided) {
    // Body.applyForce(ball, ball.position, {x: -.12, y: Math.random() * .1 })
  }
  if (bat2Ball.collided) {
    // Body.applyForce(ball, ball.position, {x: .12, y: Math.random() * .1 })
  }
  if (bat1Win.collided) {
    score1 += 1
    document.getElementById('score1').innerText = score1
    if (score1 === 11) {
      setTimeout(() => {
        alert('PLAYER 1 WON')
        window.location.reload()}, 10)
    }
  }
  if (bat2Win.collided) {
    score2 += 1
    document.getElementById('score2').innerText = score2
    if (score2 === 11) {
      setTimeout(() => {
        alert('PLAYER 2 WON')
        window.location.reload()}, 10)
    }
  }
}

engine.world.gravity.y = 0
engine.world.frictionAir = 0
Engine.run(engine)
Render.run(render)
window.addEventListener('keydown', keyPress, false)

Events.on(engine, 'tick', isCollide)