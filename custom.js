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

	const navCollapse = document.querySelector(".navbar-collapse");
	const navLinks = document.querySelectorAll(".navbar-collapse .nav-link");
	const siteHeader = document.querySelector(".site-header");

	if (siteHeader) {
		let lastScrollY = window.scrollY;
		let ticking = false;
		const minDelta = 8;

		const updateHeaderState = () => {
			const currentScrollY = window.scrollY;
			const delta = currentScrollY - lastScrollY;
			const navOpen = navCollapse && navCollapse.classList.contains("show");

			siteHeader.classList.toggle("is-scrolled", currentScrollY > 8);

			if (currentScrollY <= 12 || navOpen) {
				siteHeader.classList.remove("is-hidden");
			} else if (Math.abs(delta) >= minDelta) {
				if (delta > 0) {
					siteHeader.classList.add("is-hidden");
				} else {
					siteHeader.classList.remove("is-hidden");
				}
			}

			lastScrollY = currentScrollY;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateHeaderState);
				ticking = true;
			}
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		updateHeaderState();
	}

	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			if (navCollapse && navCollapse.classList.contains("show") && window.bootstrap) {
				bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
			}
		});
	});
});
