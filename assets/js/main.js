/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			wide:      ( '1281px',  '1680px' ),
			normal:    ( '981px',   '1280px' ),
			narrow:    ( '737px',   '980px'  ),
			narrower:  ( '737px',   '840px'  ),
			mobile:    ( '481px',   '736px'  ),
			mobilep:   ( null,      '480px'  )
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right'
		});

	// NavPanel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Header.
		if (!browser.mobile
		&&	$header.hasClass('alt')
		&&	$banner.length > 0) {

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt reveal'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			});

		}

})(jQuery);
// Função para exibir ou ocultar o botão dependendo da posição de rolagem
function toggleScrollToTopButton() {
  const btnScrollToTop = document.getElementById("btnScrollToTop");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btnScrollToTop.style.display = "block";
  } else {
    btnScrollToTop.style.display = "none";
  }
}

// Função para rolar suavemente até o topo da página
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Event listener para exibir ou ocultar o botão quando a página é rolada
window.onscroll = function() {
  toggleScrollToTopButton();
};

document.addEventListener("DOMContentLoaded", function() {
	var header = document.getElementById("header");
	var nav = document.getElementById("nav");

	window.addEventListener("scroll", function() {
		var shouldAddClass = window.scrollY > 0;

		header.classList.toggle("scrolled", shouldAddClass);
		nav.classList.toggle("scrolled", shouldAddClass);
	});
});

let navLinks = document.querySelectorAll(".carousel .nav-link");
let slides = document.querySelectorAll(".carousel .slides img");
let overlays = document.querySelectorAll(".carousel .bar");
let maxZIndex = navLinks.length;
let easeInOutQuart = "cubic-bezier(0.77, 0, 0.175, 1)";

slides[0].classList.add("active");
navLinks[0].classList.add("active");

navLinks.forEach((navLink, activeIndex) => {
  overlays[activeIndex].style.zIndex = `${navLinks.length - activeIndex}`;
  
  navLink.addEventListener("click", function () {
    // nav-link
    navLinks.forEach(function (navLink) {
      navLink.classList.remove("active");
    });
    this.classList.add("active");

    // slide
    let currentSlide = document.querySelector(".carousel .slides img.active");
    let slideFadeOut = currentSlide.animate(
      [
        { transform: "translateX(0)", opacity: 1 },
        { transform: "translateX(5%)", opacity: 0 }
      ],
      {
        duration: 600,
        easing: "ease-in",
        fill: "forwards"
      }
    );
    
    slideFadeOut.onfinish = function () {
      slides.forEach(function (slide) {
        slide.classList.remove("active");
      });
      let activeSlide = slides[activeIndex];
      activeSlide.classList.add("active");

      activeSlide.animate(
        [
          {
            transform: "translateX(-5%)",
            opacity: 0
          },
          {
            transform: "translateX(0)",
            opacity: 1
          }
        ],
        { duration: 600, easing: "ease-out", fill: "forwards" }
      );
    };

    // overlay
    maxZIndex += 1;
    let activeOverlay = overlays[activeIndex];
    activeOverlay.style.zIndex = `${maxZIndex}`;
    
    activeOverlay.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration: 1200, fill: "forwards", easing: easeInOutQuart }
    );
  });
});
