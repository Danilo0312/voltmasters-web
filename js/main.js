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

            // IMPORTANT: re-run Bootstrap bindings
            reinitBootstrap();

            if (callback) callback();
        })
        .catch(err => console.error("Component load error:", err));
}

function reinitBootstrap() {
    // Re-activate all collapse components
    document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(btn => {
        new bootstrap.Collapse(document.querySelector(btn.getAttribute('data-bs-target')), {
            toggle: false
        });
    });
}


// ============================
// MAIN INIT
// ============================

async function loadComponents() {
    try {
        const [header, footer] = await Promise.all([
            fetch("partials/header.html"),
            fetch("partials/footer.html")
        ]);

        document.getElementById("header").innerHTML =
            await header.text();

        document.getElementById("footer").innerHTML =
            await footer.text();

        reinitBootstrap();
        hideLoader();

    } catch (err) {
        console.error(err);
        hideLoader();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponents();
    initPageScripts();
});


// ============================
// LOADER CONTROL (SAFE)
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




// ============================
// PAGE SCRIPTS (SAFE INIT)
// ============================

function initPageScripts() {

    // ============================
    // INTERSECTION OBSERVER (SAFE)
    // ============================

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


    // ============================
    // COUNTER ANIMATION (SAFE)
    // ============================

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

function initNavbar() {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    console.log("Navbar initialized");
}
