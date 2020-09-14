(function() {

			function scrollstory() {
				// select elements using jQuery since it is a dependency
                var $section2 = $('.section2')
				var $graphicEl = $section2.find('.graphic')
				var $graphicVisEl = $graphicEl.find('.graphic__vis')

				// viewport height
				var viewportHeight = window.innerHeight
				var halfViewportHeight = Math.floor(viewportHeight / 2)
				var quarterViewportHeight = Math.floor(viewportHeight / 4)
				var threequarterViewportHeight = halfViewportHeight + quarterViewportHeight

				// a global function creates and handles all the vis + updates
				var graphic = createGraphic('.graphic')

				// handle the fixed/static position of grahpic
				var toggle = function(fixed, bottom) {
					if (fixed) $graphicVisEl.addClass('is-fixed')
					else $graphicVisEl.removeClass('is-fixed')

					if (bottom) $graphicVisEl.addClass('is-bottom')
					else $graphicVisEl.removeClass('is-bottom')
				}

				// callback function when scrollStory detects item to trigger
				var handleItemFocus = function(event, item) {
					var step = item.data.step
					graphic.update(step)
				}	

				// callback on scrollStory scroll event
				// toggle fixed position
				var handleContainerScroll = function(event) {
					var bottom = false
					var fixed = false

					var bb = $graphicEl[0].getBoundingClientRect()
					var bottomFromTop = bb.bottom - viewportHeight

					if (bb.top < 0 && bottomFromTop > 0) {
						bottom = false
						fixed = true
					} else if (bb.top < 0 && bottomFromTop < 0) {
						bottom = true
						fixed = false
					}

					toggle(fixed, bottom)
				}

				// instantiate scrollStory
				$graphicEl.scrollStory({
					contentSelector: '.trigger',
					triggerOffset: halfViewportHeight,
					itemfocus: handleItemFocus,
					containerscroll: handleContainerScroll,
				})
			}

			scrollstory()

		})()