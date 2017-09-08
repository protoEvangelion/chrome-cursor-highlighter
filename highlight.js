let xMousePos = 0
let yMousePos = 0
let lastScrolledLeft = 0
let lastScrolledTop = 0

$('body').append('<div id="super-highlighter"></div>')
$('body').append('<div id="super-dot"></div>')

$(document).on('mousemove', positionOnMouseMove)
$(window).on('scroll', positionOnScroll)

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

function moveLeft() {
  $('#super-dot').offset({ left: xMousePos - 2.5 })
  $('#super-highlighter').offset({ left: xMousePos - 25 })
}

function moveUp() {
  $('#super-dot').offset({ top: yMousePos - 2.5 })
  $('#super-highlighter').offset({ top: yMousePos - 25 })
}
