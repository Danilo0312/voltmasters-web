// ============================
//     NAVBAR HIDE ON SCROLL
// ============================

function initNavbar() {

    const navbar = document.getElementById("mainNavbar");

    if (!navbar) {
        console.log("Navbar not found");
        return;
    }

    let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove("nav-hidden");
        return;
    }

    if (
        currentScroll > lastScroll &&
        currentScroll > 100 &&
        !navbar.classList.contains("nav-hidden")
    ) {
        navbar.classList.add("nav-hidden");
    } else if (
        currentScroll < lastScroll &&
        navbar.classList.contains("nav-hidden")
    ) {
        navbar.classList.remove("nav-hidden");
    }

    lastScroll = currentScroll;
});

}


// ============================
// COMPONENT LOADER (HEADER/FOOTER)
// ============================

function loadComponent(id, url, callback) {
    const el = document.getElementById(id);

    if (!el) return;

    fetch(url)
        .then(res => res.text())
        .then(data => {
            el.innerHTML = data;

            reinitBootstrap();

            if (callback) callback();
        })
        .catch(err => console.error("Component load error:", err));
}

function reinitBootstrap() {
    document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(btn => {
        new bootstrap.Collapse(
            document.querySelector(btn.getAttribute('data-bs-target')),
            { toggle: false }
        );
    });
}


// ============================
// MAIN INIT
// ============================

document.addEventListener("DOMContentLoaded", () => {

    // Load Header
    loadComponent("header", "partials/header.html", () => {
        initNavbar();
    });

    // Load Footer
    loadComponent("footer", "partials/footer.html", () => {
        hideLoader();
    });

    initPageScripts();
});


// ============================
// LOADER CONTROL
// ============================

function hideLoader() {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 300);
    }
}

window.addEventListener("load", () => {
    setTimeout(hideLoader, 1500);
});


// ============================
// PAGE SCRIPTS
// ============================

function initPageScripts() {

    // Intersection Observer
    const elements = document.querySelectorAll(".observe");

    if (elements.length > 0) {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }

            });
        }, {
            threshold: 0.2
        });

        elements.forEach(el => observer.observe(el));
    }

    // Counter Animation
    const counter = document.getElementById("projectCounter");

    if (counter) {

        let hasCounted = false;

        const counterObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting && !hasCounted) {

                    hasCounted = true;

                    let count = 0;
                    const target = 30;

                    const interval = setInterval(() => {

                        count++;
                        counter.textContent = count;

                        if (count >= target) {
                            clearInterval(interval);
                        }

                    }, 50);
                }

            });

        }, {
            threshold: 0.5
        });

        counterObserver.observe(counter);
    }
}
