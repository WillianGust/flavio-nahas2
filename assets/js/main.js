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


document.addEventListener('DOMContentLoaded', function() {
  // Iniciar o carrossel
  showTestimonial(0);

  // Adicionar nomes dos autores dinamicamente
  var testimonials = document.querySelectorAll('.testimonial');
  var authorNamesContainer = document.getElementById('authorNames');

  testimonials.forEach(function(testimonial, index) {
    var authorName = testimonial.querySelector('.author').innerText;
    var authorNameElement = document.createElement('div');
    authorNameElement.className = 'author-name';
    authorNameElement.setAttribute('data-index', index);
    authorNameElement.innerText = authorName;
    authorNamesContainer.appendChild(authorNameElement);

    // Adicionar evento de clique aos nomes dos depoimentos
    authorNameElement.addEventListener('click', function() {
      var authorIndex = parseInt(this.getAttribute('data-index'), 10);
      showTestimonial(authorIndex);
    });
  });
});

// Função para mostrar um depoimento específico
function showTestimonial(index) {
  var testimonials = document.querySelectorAll('.testimonial');
  testimonials.forEach(function(testimonial) {
    testimonial.classList.remove('active');
  });

  testimonials[index].classList.add('active');
}

