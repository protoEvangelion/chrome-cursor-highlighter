let xMousePos = 0
let yMousePos = 0
let lastScrolledLeft = 0
let lastScrolledTop = 0

$('body').append('<div id="super-highlighter"></div>')
$('body').append('<div id="super-dot"></div>')

const dot = '#super-dot'
const highlighter = '#super-highlighter'

$(document).on('mouseenter', () => $(`${dot}, ${highlighter}`).show())
$(document).on('mouseleave', () => $(`${dot}, ${highlighter}`).hide())
$(document).on('mousemove', positionOnMouseMove)
$(window).on('scroll', positionOnScroll)

function moveLeft() {
  $(dot).offset({ left: xMousePos - 2.5 })
  $(highlighter).offset({ left: xMousePos - 25 })
}

function moveUp() {
  $(dot).offset({ top: yMousePos - 2.5 })
  $(highlighter).offset({ top: yMousePos - 25 })
}

function positionOnMouseMove(e) {
  xMousePos = e.pageX
  yMousePos = e.pageY

  moveLeft()
  moveUp()
}

function positionOnScroll() {
  if (lastScrolledLeft != $(document).scrollLeft()) {
    xMousePos -= lastScrolledLeft
    lastScrolledLeft = $(document).scrollLeft();
    xMousePos += lastScrolledLeft
    moveLeft()
  }
  if (lastScrolledTop != $(document).scrollTop()) {
    yMousePos -= lastScrolledTop
    lastScrolledTop = $(document).scrollTop()
    yMousePos += lastScrolledTop
    moveUp()
  }
}

