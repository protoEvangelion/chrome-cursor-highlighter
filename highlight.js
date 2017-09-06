$('body').append('<div id="super-highlighter"></div>')
$('body').append('<div id="super-dot"></div>')

$('body').on('mousemove', positionHighlighter)

function positionHighlighter(e) {
	const mouseX = e.pageX
	const mouseY = e.pageY

	$('#super-highlighter').offset({
		top: mouseY - 25,
		left: mouseX - 25
	})

	$('#super-dot').offset({
		top: mouseY - 2.5,
		left: mouseX - 2.5 
	})
}