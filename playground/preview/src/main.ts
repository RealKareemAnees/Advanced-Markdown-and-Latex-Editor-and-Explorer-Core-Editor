import "./styles.css";

/**
 * Markdown Editor Style Guide Demo
 * Initialization and interactive functionality
 */

// Initialize sidebar toggle for mobile
function initializeSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const sidebarButtons = document.querySelectorAll(".sidebar-btn");

    // Toggle sidebar on mobile
    if (window.innerWidth <= 768) {
        // Create hamburger menu button if it doesn't exist
        const topBar = document.querySelector(".top-bar");
        if (topBar && !document.querySelector(".menu-toggle")) {
            const menuToggle = document.createElement("button");
            menuToggle.className = "btn menu-toggle";
            menuToggle.innerHTML = "<span>☰</span><span>Menu</span>";
            menuToggle.style.marginRight = "auto";

            menuToggle.addEventListener("click", () => {
                sidebar?.classList.toggle("active");
            });

            topBar.insertBefore(menuToggle, topBar.firstChild);
        }
    }

    // Handle sidebar button clicks
    sidebarButtons.forEach((button) => {
        button.addEventListener("click", () => {
            sidebarButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            if (window.innerWidth <= 768) {
                sidebar?.classList.remove("active");
            }
        });
    });
}

// Initialize checkbox interactions
function initializeCheckboxes() {
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
        '.editor-content input[type="checkbox"]',
    );

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const parent = checkbox.parentElement;
            if (parent) {
                parent.style.transform = "scale(1.02)";
                setTimeout(() => {
                    parent.style.transform = "scale(1)";
                }, 150);
            }
        });
    });
}

// Initialize smooth scrolling for anchor links
function initializeSmoothScroll() {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && href !== "#") {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }
        });
    });
}

// Initialize table row hover effects and sorting
function initializeTables() {
    const tables = document.querySelectorAll(".editor-content table");

    tables.forEach((table) => {
        const headers = table.querySelectorAll("th");
        const tbody = table.querySelector("tbody");

        if (!tbody) return;

        // Add sortable class and click handlers to headers
        headers.forEach((header, columnIndex) => {
            header.classList.add("sortable");
            let sortDirection: "asc" | "desc" | null = null;

            header.addEventListener("click", () => {
                // Remove sort classes from other headers
                headers.forEach((h) => {
                    if (h !== header) {
                        h.classList.remove("asc", "desc");
                    }
                });

                // Toggle sort direction
                if (sortDirection === null || sortDirection === "desc") {
                    sortDirection = "asc";
                    header.classList.remove("desc");
                    header.classList.add("asc");
                } else {
                    sortDirection = "desc";
                    header.classList.remove("asc");
                    header.classList.add("desc");
                }

                // Sort the table
                const rows = Array.from(tbody.querySelectorAll("tr"));
                rows.sort((a, b) => {
                    const aCell = a.querySelectorAll("td")[columnIndex];
                    const bCell = b.querySelectorAll("td")[columnIndex];

                    if (!aCell || !bCell) return 0;

                    const aText = aCell.textContent?.trim() || "";
                    const bText = bCell.textContent?.trim() || "";

                    // Try to parse as numbers
                    const aNum = parseFloat(aText);
                    const bNum = parseFloat(bText);

                    if (!isNaN(aNum) && !isNaN(bNum)) {
                        return sortDirection === "asc"
                            ? aNum - bNum
                            : bNum - aNum;
                    }

                    // Sort as strings
                    return sortDirection === "asc"
                        ? aText.localeCompare(bText)
                        : bText.localeCompare(aText);
                });

                // Reappend sorted rows
                rows.forEach((row) => tbody.appendChild(row));
            });
        });

        // Keep hover effects
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach((row) => {
            row.addEventListener("mouseenter", () => {
                (row as HTMLElement).style.transition =
                    "background-color 150ms ease";
            });
        });
    });
}

// Initialize toggle menu (accordion) - allow multiple open
function initializeToggleMenus() {
    const toggleItems = document.querySelectorAll(".toggle-menu-item");

    toggleItems.forEach((item) => {
        const header = item.querySelector(".toggle-menu-header");
        if (!header) return;

        header.addEventListener("click", () => {
            // Simply toggle the current item without closing others
            item.classList.toggle("open");
        });
    });
}

// Initialize slideshow navigation
function initializeSlideshows() {
    const slideshows =
        document.querySelectorAll<HTMLElement>("[data-slideshow]");

    slideshows.forEach((slideshow) => {
        const slides = slideshow.querySelectorAll(".slideshow-slide");
        const dots = slideshow.querySelectorAll(".slideshow-dot");
        const prevBtn =
            slideshow.querySelector<HTMLButtonElement>("[data-slide-prev]");
        const nextBtn =
            slideshow.querySelector<HTMLButtonElement>("[data-slide-next]");
        const counter = slideshow.querySelector(".slideshow-counter");
        let currentSlide = 0;
        const totalSlides = slides.length;

        function goToSlide(index: number) {
            if (index < 0 || index >= totalSlides) return;

            slides.forEach((s) => s.classList.remove("active"));
            dots.forEach((d) => d.classList.remove("active"));

            slides[index]?.classList.add("active");
            dots[index]?.classList.add("active");
            currentSlide = index;

            if (prevBtn) prevBtn.disabled = index === 0;
            if (nextBtn) nextBtn.disabled = index === totalSlides - 1;
            if (counter) counter.textContent = `${index + 1} / ${totalSlides}`;
        }

        prevBtn?.addEventListener("click", () => goToSlide(currentSlide - 1));
        nextBtn?.addEventListener("click", () => goToSlide(currentSlide + 1));

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const idx = parseInt(
                    (dot as HTMLElement).dataset.slideGoto || "0",
                    10,
                );
                goToSlide(idx);
            });
        });

        // Keyboard navigation within slideshow
        slideshow.setAttribute("tabindex", "0");
        slideshow.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") goToSlide(currentSlide - 1);
            if (e.key === "ArrowRight") goToSlide(currentSlide + 1);
        });
    });
}

// Initialize audio player interactivity
function initializeAudioPlayers() {
    const players = document.querySelectorAll<HTMLElement>(
        "[data-audio-player]",
    );

    players.forEach((player) => {
        const playBtn =
            player.querySelector<HTMLButtonElement>(".audio-player-btn");
        const progressBar = player.querySelector<HTMLElement>(
            ".audio-progress-bar",
        );
        const progressFill = player.querySelector<HTMLElement>(
            ".audio-progress-fill",
        );

        if (playBtn) {
            playBtn.addEventListener("click", () => {
                const isPlaying = playBtn.dataset.playing === "true";
                playBtn.dataset.playing = isPlaying ? "false" : "true";
                playBtn.textContent = isPlaying ? "▶" : "⏸";
            });
        }

        if (progressBar && progressFill) {
            progressBar.addEventListener("click", (e) => {
                const rect = progressBar.getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                progressFill.style.width = `${Math.max(0, Math.min(100, pct))}%`;
            });
        }
    });
}

// Initialize video player interactivity
function initializeVideoPlayers() {
    const players = document.querySelectorAll<HTMLElement>(
        "[data-video-player]",
    );

    players.forEach((player) => {
        const playBtn = player.querySelector<HTMLButtonElement>(
            ".video-player-controls .play-btn",
        );
        const overlayBtn = player.querySelector<HTMLElement>(
            ".video-play-overlay",
        );
        const progressBar = player.querySelector<HTMLElement>(
            ".video-progress-bar",
        );
        const progressFill = player.querySelector<HTMLElement>(
            ".video-progress-fill",
        );

        function togglePlay() {
            if (!playBtn) return;
            const isPlaying = playBtn.dataset.playing === "true";
            playBtn.dataset.playing = isPlaying ? "false" : "true";
            playBtn.textContent = isPlaying ? "▶" : "⏸";
        }

        playBtn?.addEventListener("click", togglePlay);
        overlayBtn?.addEventListener("click", togglePlay);

        if (progressBar && progressFill) {
            progressBar.addEventListener("click", (e) => {
                const rect = progressBar.getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                progressFill.style.width = `${Math.max(0, Math.min(100, pct))}%`;
            });
        }
    });
}

// Initialize KaTeX rendering for LaTeX expressions
function initializeLatex() {
    // Wait for KaTeX to load
    const katexCheck = setInterval(() => {
        if (typeof (window as any).katex !== "undefined") {
            clearInterval(katexCheck);
            renderAllLatex();
        }
    }, 100);

    // Timeout after 5 seconds
    setTimeout(() => clearInterval(katexCheck), 5000);
}

function renderAllLatex() {
    const katex = (window as any).katex;
    if (!katex) return;

    // Render inline LaTeX
    document
        .querySelectorAll<HTMLElement>(".latex-inline[data-latex]")
        .forEach((el) => {
            try {
                katex.render(el.dataset.latex!, el, {
                    throwOnError: false,
                    displayMode: false,
                });
            } catch {
                // Keep fallback text
            }
        });

    // Render block LaTeX
    document
        .querySelectorAll<HTMLElement>(".latex-block[data-latex]")
        .forEach((el) => {
            try {
                const container = document.createElement("div");
                katex.render(el.dataset.latex!, container, {
                    throwOnError: false,
                    displayMode: true,
                });
                // Preserve the ::before label by inserting rendered content
                el.textContent = "";
                el.appendChild(container);
            } catch {
                // Keep fallback text
            }
        });
}

// Handle window resize
function handleResize() {
    const sidebar = document.querySelector(".sidebar");
    const menuToggle = document.querySelector(".menu-toggle");

    if (window.innerWidth > 768) {
        sidebar?.classList.remove("active");
        menuToggle?.remove();
    } else {
        if (!menuToggle) {
            initializeSidebar();
        }
    }
}

// Add keyboard navigation hints
function initializeKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const sidebar = document.querySelector(".sidebar");
            if (sidebar?.classList.contains("active")) {
                sidebar.classList.remove("active");
            }
        }
    });
}

// Save document title changes to localStorage
function initializeDocumentTitle() {
    const titleInput = document.querySelector<HTMLInputElement>(
        ".document-title input",
    );

    if (titleInput) {
        const savedTitle = localStorage.getItem("documentTitle");
        if (savedTitle) {
            titleInput.value = savedTitle;
        }

        titleInput.addEventListener("input", () => {
            localStorage.setItem("documentTitle", titleInput.value);
        });
    }
}

// Add action button functionality
function initializeActionButtons() {
    const saveBtn = document.querySelector(
        ".document-actions .btn:nth-child(2)",
    );

    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            console.log("Document saved");
            const icon = saveBtn.querySelector("span");
            if (icon) {
                (icon as HTMLElement).style.transform = "scale(1.2)";
                setTimeout(() => {
                    (icon as HTMLElement).style.transform = "scale(1)";
                }, 200);
            }
        });
    }
}

// Initialize animated progress bars
function initializeProgressBars() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const fill = entry.target as HTMLElement;
                    const targetWidth = fill.style.width;
                    fill.style.width = "0%";
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            fill.style.width = targetWidth;
                        });
                    });
                    observer.unobserve(fill);
                }
            });
        },
        { threshold: 0.3 },
    );

    document.querySelectorAll(".progress-fill").forEach((fill) => {
        observer.observe(fill);
    });
}

// Initialize all functionality when DOM is ready
function init() {
    console.log("🎨 Markdown Editor Style Guide - Espresso & Ember Theme");
    console.log("Initializing interactive components...");

    initializeSidebar();
    initializeCheckboxes();
    initializeSmoothScroll();
    initializeTables();
    initializeToggleMenus();
    initializeSlideshows();
    initializeAudioPlayers();
    initializeVideoPlayers();
    initializeLatex();
    initializeKeyboardNavigation();
    initializeDocumentTitle();
    initializeActionButtons();
    initializeProgressBars();

    // Handle window resize
    window.addEventListener("resize", handleResize);

    console.log("✓ All components initialized successfully");
}

// Run initialization
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

export { init };
