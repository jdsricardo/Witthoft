document.addEventListener("DOMContentLoaded", () => {
	const yearEl = document.getElementById("currentYear");
	if (yearEl) {
		yearEl.textContent = String(new Date().getFullYear());
	}

	const revealItems = document.querySelectorAll(".reveal");
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.18,
			rootMargin: "0px 0px -30px 0px"
		}
	);

	revealItems.forEach((item) => observer.observe(item));

	const carouselElement = document.querySelector("#jobsCarousel");
	if (carouselElement && window.bootstrap) {
		new bootstrap.Carousel(carouselElement, {
			interval: 4200,
			ride: "carousel",
			pause: "hover",
			touch: true,
			wrap: true
		});
	}

	const navLinks = document.querySelectorAll(".navbar-collapse .nav-link");
	const navCollapse = document.querySelector(".navbar-collapse");
	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (navCollapse && navCollapse.classList.contains("show") && window.bootstrap) {
				bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
			}
		});
	});
});
