import "./styles.css";

/**
 * Markdown Editor Style Guide Demo
 * Full initialization and interactive functionality for all components
 */

// ============================================
// Sidebar
// ============================================

function initializeSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const sidebarButtons = document.querySelectorAll(".sidebar-btn");

    if (window.innerWidth <= 768) {
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

// ============================================
// Checkboxes
// ============================================

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

// ============================================
// Smooth Scrolling
// ============================================

function initializeSmoothScroll() {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && href !== "#") {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });
}

// ============================================
// Tables (sortable)
// ============================================

function initializeTables() {
    const tables = document.querySelectorAll(".editor-content table");
    tables.forEach((table) => {
        const headers = table.querySelectorAll("th");
        const tbody = table.querySelector("tbody");
        if (!tbody) return;

        headers.forEach((header, columnIndex) => {
            header.classList.add("sortable");
            let sortDirection: "asc" | "desc" | null = null;

            header.addEventListener("click", () => {
                headers.forEach((h) => {
                    if (h !== header) h.classList.remove("asc", "desc");
                });
                if (sortDirection === null || sortDirection === "desc") {
                    sortDirection = "asc";
                    header.classList.remove("desc");
                    header.classList.add("asc");
                } else {
                    sortDirection = "desc";
                    header.classList.remove("asc");
                    header.classList.add("desc");
                }
                const rows = Array.from(tbody.querySelectorAll("tr"));
                rows.sort((a, b) => {
                    const aText = a.querySelectorAll("td")[columnIndex]?.textContent?.trim() || "";
                    const bText = b.querySelectorAll("td")[columnIndex]?.textContent?.trim() || "";
                    const aNum = parseFloat(aText);
                    const bNum = parseFloat(bText);
                    if (!isNaN(aNum) && !isNaN(bNum)) {
                        return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
                    }
                    return sortDirection === "asc"
                        ? aText.localeCompare(bText)
                        : bText.localeCompare(aText);
                });
                rows.forEach((row) => tbody.appendChild(row));
            });
        });

        const rows = table.querySelectorAll("tbody tr");
        rows.forEach((row) => {
            row.addEventListener("mouseenter", () => {
                (row as HTMLElement).style.transition = "background-color 150ms ease";
            });
        });
    });
}

// ============================================
// Toggle Menu (accordion)
// ============================================

function initializeToggleMenus() {
    const toggleItems = document.querySelectorAll(".toggle-menu-item");
    toggleItems.forEach((item) => {
        const header = item.querySelector(".toggle-menu-header");
        if (!header) return;
        header.addEventListener("click", () => {
            item.classList.toggle("open");
        });
    });
}

// ============================================
// Slideshow
// ============================================

function initializeSlideshows() {
    const slideshows = document.querySelectorAll<HTMLElement>("[data-slideshow]");
    slideshows.forEach((slideshow) => {
        const slides = slideshow.querySelectorAll(".slideshow-slide");
        const dots = slideshow.querySelectorAll(".slideshow-dot");
        const prevBtn = slideshow.querySelector<HTMLButtonElement>("[data-slide-prev]");
        const nextBtn = slideshow.querySelector<HTMLButtonElement>("[data-slide-next]");
        const counter = slideshow.querySelector(".slideshow-counter");
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoplayTimer: ReturnType<typeof setInterval> | null = null;

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

        function startAutoplay() {
            stopAutoplay();
            autoplayTimer = setInterval(() => {
                const next = (currentSlide + 1) % totalSlides;
                goToSlide(next);
            }, 5000);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        prevBtn?.addEventListener("click", () => { stopAutoplay(); goToSlide(currentSlide - 1); });
        nextBtn?.addEventListener("click", () => { stopAutoplay(); goToSlide(currentSlide + 1); });

        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                stopAutoplay();
                const idx = parseInt((dot as HTMLElement).dataset.slideGoto || "0", 10);
                goToSlide(idx);
            });
        });

        slideshow.setAttribute("tabindex", "0");
        slideshow.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") { stopAutoplay(); goToSlide(currentSlide - 1); }
            if (e.key === "ArrowRight") { stopAutoplay(); goToSlide(currentSlide + 1); }
        });

        // Touch/swipe support
        let touchStartX = 0;
        slideshow.addEventListener("touchstart", (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        slideshow.addEventListener("touchend", (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                stopAutoplay();
                if (diff > 0) goToSlide(currentSlide + 1);
                else goToSlide(currentSlide - 1);
            }
        }, { passive: true });

        startAutoplay();
    });
}

// ============================================
// Audio Player
// ============================================

function initializeAudioPlayers() {
    const players = document.querySelectorAll<HTMLElement>("[data-audio-player]");

    players.forEach((player) => {
        const playBtn = player.querySelector<HTMLButtonElement>(".audio-player-btn");
        const progressBar = player.querySelector<HTMLElement>(".audio-progress-bar");
        const progressFill = player.querySelector<HTMLElement>(".audio-progress-fill");
        const timeStart = player.querySelectorAll<HTMLElement>(".audio-player-time")[0];
        const timeEnd = player.querySelectorAll<HTMLElement>(".audio-player-time")[1];

        let isPlaying = false;
        let progress = 35;
        const totalSeconds = 242; // 4:02
        let playTimer: ReturnType<typeof setInterval> | null = null;

        function formatTime(seconds: number): string {
            const m = Math.floor(seconds / 60);
            const s = Math.floor(seconds % 60);
            return `${m}:${s.toString().padStart(2, "0")}`;
        }

        function updateDisplay() {
            const currentSeconds = Math.floor((progress / 100) * totalSeconds);
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (timeStart) timeStart.textContent = formatTime(currentSeconds);
            if (timeEnd) timeEnd.textContent = formatTime(totalSeconds);
        }

        function togglePlay() {
            isPlaying = !isPlaying;
            if (playBtn) {
                playBtn.textContent = isPlaying ? "⏸" : "▶";
                playBtn.dataset.playing = isPlaying ? "true" : "false";
            }
            if (isPlaying) {
                playTimer = setInterval(() => {
                    progress += 0.5;
                    if (progress >= 100) {
                        progress = 100;
                        isPlaying = false;
                        if (playBtn) {
                            playBtn.textContent = "▶";
                            playBtn.dataset.playing = "false";
                        }
                        if (playTimer) clearInterval(playTimer);
                    }
                    updateDisplay();
                }, totalSeconds * 10 / 100);
            } else {
                if (playTimer) clearInterval(playTimer);
            }
        }

        playBtn?.addEventListener("click", togglePlay);

        if (progressBar && progressFill) {
            progressBar.addEventListener("click", (e) => {
                const rect = progressBar.getBoundingClientRect();
                progress = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                updateDisplay();
            });

            // Drag support
            let dragging = false;
            progressBar.addEventListener("mousedown", () => { dragging = true; });
            document.addEventListener("mousemove", (e) => {
                if (!dragging) return;
                const rect = progressBar.getBoundingClientRect();
                progress = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                updateDisplay();
            });
            document.addEventListener("mouseup", () => { dragging = false; });
        }

        updateDisplay();
    });
}

// ============================================
// Video Player
// ============================================

function initializeVideoPlayers() {
    const players = document.querySelectorAll<HTMLElement>("[data-video-player]");

    players.forEach((player) => {
        const playBtn = player.querySelector<HTMLButtonElement>(".video-player-controls .play-btn");
        const overlayBtn = player.querySelector<HTMLElement>(".video-play-overlay");
        const progressBar = player.querySelector<HTMLElement>(".video-progress-bar");
        const progressFill = player.querySelector<HTMLElement>(".video-progress-fill");
        const timeEls = player.querySelectorAll<HTMLElement>(".audio-player-time");
        const timeStart = timeEls[0];
        const timeEnd = timeEls[1];
        const fullscreenBtn = player.querySelector<HTMLButtonElement>(".video-fullscreen-btn");
        const volumeBtn = player.querySelector<HTMLButtonElement>("[title='Volume']");

        let isPlaying = false;
        let progress = 0;
        const totalSeconds = 754; // 12:34
        let playTimer: ReturnType<typeof setInterval> | null = null;
        let isMuted = false;

        function formatTime(seconds: number): string {
            const m = Math.floor(seconds / 60);
            const s = Math.floor(seconds % 60);
            return `${m}:${s.toString().padStart(2, "0")}`;
        }

        function updateDisplay() {
            const currentSeconds = Math.floor((progress / 100) * totalSeconds);
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (timeStart) timeStart.textContent = formatTime(currentSeconds);
            if (timeEnd) timeEnd.textContent = formatTime(totalSeconds);
        }

        function togglePlay() {
            isPlaying = !isPlaying;
            if (playBtn) {
                playBtn.textContent = isPlaying ? "⏸" : "▶";
                playBtn.dataset.playing = isPlaying ? "true" : "false";
            }
            if (overlayBtn) {
                const overlayBtnEl = overlayBtn.querySelector(".video-play-overlay-btn");
                if (overlayBtnEl) overlayBtnEl.textContent = isPlaying ? "⏸" : "▶";
            }
            if (isPlaying) {
                playTimer = setInterval(() => {
                    progress += 0.2;
                    if (progress >= 100) {
                        progress = 100;
                        isPlaying = false;
                        if (playBtn) { playBtn.textContent = "▶"; playBtn.dataset.playing = "false"; }
                        if (playTimer) clearInterval(playTimer);
                    }
                    updateDisplay();
                }, totalSeconds * 10 / 100);
            } else {
                if (playTimer) clearInterval(playTimer);
            }
        }

        playBtn?.addEventListener("click", togglePlay);
        overlayBtn?.addEventListener("click", togglePlay);

        // Volume toggle
        volumeBtn?.addEventListener("click", () => {
            isMuted = !isMuted;
            volumeBtn.textContent = isMuted ? "🔇" : "🔊";
        });

        // Fullscreen toggle
        fullscreenBtn?.addEventListener("click", () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                player.requestFullscreen().catch(() => {});
            }
        });

        if (progressBar && progressFill) {
            progressBar.addEventListener("click", (e) => {
                const rect = progressBar.getBoundingClientRect();
                progress = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                updateDisplay();
            });

            let dragging = false;
            progressBar.addEventListener("mousedown", () => { dragging = true; });
            document.addEventListener("mousemove", (e) => {
                if (!dragging) return;
                const rect = progressBar.getBoundingClientRect();
                progress = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                updateDisplay();
            });
            document.addEventListener("mouseup", () => { dragging = false; });
        }

        // Keyboard controls on player
        player.setAttribute("tabindex", "0");
        player.addEventListener("keydown", (e) => {
            if (e.key === " " || e.key === "k") { e.preventDefault(); togglePlay(); }
            if (e.key === "ArrowLeft") { progress = Math.max(0, progress - 2); updateDisplay(); }
            if (e.key === "ArrowRight") { progress = Math.min(100, progress + 2); updateDisplay(); }
            if (e.key === "m") { isMuted = !isMuted; if (volumeBtn) volumeBtn.textContent = isMuted ? "🔇" : "🔊"; }
            if (e.key === "f") { fullscreenBtn?.click(); }
        });

        updateDisplay();
    });
}

// ============================================
// KaTeX / LaTeX rendering
// ============================================

function initializeLatex() {
    const katexCheck = setInterval(() => {
        if (typeof (window as any).katex !== "undefined") {
            clearInterval(katexCheck);
            renderAllLatex();
        }
    }, 100);
    setTimeout(() => clearInterval(katexCheck), 5000);
}

function renderAllLatex() {
    const katex = (window as any).katex;
    if (!katex) return;

    document.querySelectorAll<HTMLElement>(".latex-inline[data-latex]").forEach((el) => {
        try {
            katex.render(el.dataset.latex!, el, { throwOnError: false, displayMode: false });
        } catch { /* keep fallback */ }
    });

    document.querySelectorAll<HTMLElement>(".latex-block[data-latex]").forEach((el) => {
        try {
            const container = document.createElement("div");
            katex.render(el.dataset.latex!, container, { throwOnError: false, displayMode: true });
            el.textContent = "";
            el.appendChild(container);
        } catch { /* keep fallback */ }
    });
}

// ============================================
// Keyboard Navigation
// ============================================

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

// ============================================
// Window Resize
// ============================================

function handleResize() {
    const sidebar = document.querySelector(".sidebar");
    const menuToggle = document.querySelector(".menu-toggle");
    if (window.innerWidth > 768) {
        sidebar?.classList.remove("active");
        menuToggle?.remove();
    } else {
        if (!menuToggle) initializeSidebar();
    }
}

// ============================================
// Document Title
// ============================================

function initializeDocumentTitle() {
    const titleInput = document.querySelector<HTMLInputElement>(".document-title input");
    if (titleInput) {
        const savedTitle = localStorage.getItem("documentTitle");
        if (savedTitle) titleInput.value = savedTitle;
        titleInput.addEventListener("input", () => {
            localStorage.setItem("documentTitle", titleInput.value);
        });
    }
}

// ============================================
// Action Buttons
// ============================================

function initializeActionButtons() {
    const saveBtn = document.querySelector(".document-actions .btn:nth-child(2)");
    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            console.log("Document saved");
            const icon = saveBtn.querySelector("span");
            if (icon) {
                (icon as HTMLElement).style.transform = "scale(1.2)";
                setTimeout(() => { (icon as HTMLElement).style.transform = "scale(1)"; }, 200);
            }
        });
    }
}

// ============================================
// Progress Bars (animate on scroll)
// ============================================

function initializeProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const fill = entry.target as HTMLElement;
                const targetWidth = fill.style.width;
                fill.style.width = "0%";
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => { fill.style.width = targetWidth; });
                });
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll(".progress-fill").forEach((fill) => {
        observer.observe(fill);
    });
}

// ============================================
// PDF Viewers (with page navigation + zoom)
// ============================================

function initializePdfViewers() {
    const embeds = document.querySelectorAll<HTMLElement>(".pdf-embed");

    embeds.forEach((embed) => {
        const prevBtn = embed.querySelector<HTMLButtonElement>("[title='Previous page']");
        const nextBtn = embed.querySelector<HTMLButtonElement>("[title='Next page']");
        const pageInput = embed.querySelector<HTMLInputElement>(".pdf-page-input");
        const pageLabel = embed.querySelector<HTMLElement>(".pdf-page-label");
        const zoomOutBtn = embed.querySelector<HTMLButtonElement>("[title='Zoom out']");
        const zoomInBtn = embed.querySelector<HTMLButtonElement>("[title='Zoom in']");
        const zoomLabel = embed.querySelector<HTMLElement>(".pdf-zoom-label");
        const viewport = embed.querySelector<HTMLElement>(".pdf-viewport");
        const searchBtn = embed.querySelector<HTMLButtonElement>("[title='Search']");
        const downloadBtn = embed.querySelector<HTMLButtonElement>("[title='Download']");
        const printBtn = embed.querySelector<HTMLButtonElement>("[title='Print']");

        const totalPagesText = pageLabel?.textContent?.replace("/", "").trim() || "24";
        const totalPages = parseInt(totalPagesText, 10) || 24;
        let currentPage = 1;
        let zoom = 100;

        function updatePage(page: number) {
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            if (pageInput) pageInput.value = page.toString();
            if (prevBtn) prevBtn.disabled = page === 1;
            if (nextBtn) nextBtn.disabled = page === totalPages;

            // Update page indicator text in the viewport
            const pageIndicator = viewport?.querySelector("p:last-child");
            if (pageIndicator && pageIndicator.textContent?.includes("Page")) {
                pageIndicator.textContent = `— Page ${page} of ${totalPages} —`;
            }
        }

        function updateZoom(newZoom: number) {
            zoom = Math.max(50, Math.min(200, newZoom));
            if (zoomLabel) zoomLabel.textContent = `${zoom}%`;
            const page = viewport?.querySelector<HTMLElement>(".pdf-page");
            if (page) {
                page.style.transform = `scale(${zoom / 100})`;
                page.style.transformOrigin = "top center";
            }
        }

        prevBtn?.addEventListener("click", () => updatePage(currentPage - 1));
        nextBtn?.addEventListener("click", () => updatePage(currentPage + 1));

        pageInput?.addEventListener("change", () => {
            const val = parseInt(pageInput.value, 10);
            if (!isNaN(val)) updatePage(Math.max(1, Math.min(totalPages, val)));
        });

        zoomOutBtn?.addEventListener("click", () => updateZoom(zoom - 25));
        zoomInBtn?.addEventListener("click", () => updateZoom(zoom + 25));

        searchBtn?.addEventListener("click", () => {
            const query = prompt("Search PDF:");
            if (query) {
                // Highlight matching text in the viewport
                const content = viewport?.querySelector(".pdf-page");
                if (content) {
                    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
                    let node: Text | null;
                    while ((node = walker.nextNode() as Text | null)) {
                        if (node.textContent?.toLowerCase().includes(query.toLowerCase())) {
                            const span = document.createElement("mark");
                            span.style.background = "rgba(230, 126, 77, 0.3)";
                            const range = document.createRange();
                            const idx = node.textContent.toLowerCase().indexOf(query.toLowerCase());
                            range.setStart(node, idx);
                            range.setEnd(node, idx + query.length);
                            range.surroundContents(span);
                            span.scrollIntoView({ behavior: "smooth", block: "center" });
                            break;
                        }
                    }
                }
            }
        });

        downloadBtn?.addEventListener("click", () => {
            const title = embed.querySelector(".pdf-toolbar-title")?.textContent || "document.pdf";
            console.log(`Downloading: ${title}`);
            alert(`Download started: ${title}`);
        });

        printBtn?.addEventListener("click", () => {
            window.print();
        });

        updatePage(currentPage);
    });
}

// ============================================
// EPUB Readers (chapters, font size, bookmark)
// ============================================

function initializeEpubReaders() {
    const readers = document.querySelectorAll<HTMLElement>("[data-epub-reader]");

    readers.forEach((reader) => {
        const prevBtn = reader.querySelector<HTMLButtonElement>("[title='Previous chapter']");
        const nextBtn = reader.querySelector<HTMLButtonElement>("[title='Next chapter']");
        const chapterLabel = reader.querySelector<HTMLElement>(".epub-chapter-label");
        const progressFill = reader.querySelector<HTMLElement>(".epub-progress-fill");
        const progressText = reader.querySelector<HTMLElement>(".epub-progress-text");
        const fontSizeBtn = reader.querySelector<HTMLButtonElement>("[title='Font size']");
        const bookmarkBtn = reader.querySelector<HTMLButtonElement>("[title='Bookmark']");
        const tocBtn = reader.querySelector<HTMLButtonElement>("[title='Table of contents']");
        const downloadBtn = reader.querySelector<HTMLButtonElement>("[title='Download']");
        const content = reader.querySelector<HTMLElement>(".epub-content");

        let currentChapter = 1;
        const totalChapters = 8;
        let fontSize = 16;
        let bookmarked = false;

        const chapterContent: Record<number, { title: string; text: string[] }> = {
            1: {
                title: "Chapter 1: Introduction to Modern Design",
                text: [
                    "In the realm of digital design, the marriage of form and function has never been more critical. As we navigate an increasingly complex landscape of devices, platforms, and user expectations, the need for systematic, thoughtful design approaches becomes paramount.",
                    "This brochure explores the foundational principles that underpin effective design systems, examining how token-based architectures, consistent visual languages, and user-centered methodologies converge to create experiences that are both beautiful and functional.",
                    "Through careful consideration of typography, color theory, spatial relationships, and interactive patterns, we can craft interfaces that not only meet but exceed user expectations.",
                ],
            },
            2: {
                title: "Chapter 2: The Foundation of Design Tokens",
                text: [
                    "Design tokens are the atomic building blocks of a design system. They represent the smallest decisions — colors, spacing values, typography scales — that collectively define the visual identity of a product.",
                    "By abstracting these values into named entities, teams can maintain consistency while enabling rapid iteration and theming capabilities across multiple platforms.",
                    "Token hierarchies typically follow a layered approach: global tokens define the full palette, while alias tokens map semantic meaning to specific use cases.",
                ],
            },
            3: {
                title: "Chapter 3: Typography as Communication",
                text: [
                    "Typography is the voice of design. The choice of typeface, size, weight, and spacing communicates hierarchy, mood, and intent before a single word is consciously read.",
                    "A well-crafted typographic scale creates rhythm and harmony, guiding the reader through content with natural ease. The relationship between heading levels, body text, and supporting elements forms the backbone of any readable interface.",
                    "Modern type systems leverage variable fonts and responsive scaling to maintain legibility across the full spectrum of screen sizes.",
                ],
            },
            4: {
                title: "Chapter 4: Color Theory in Practice",
                text: [
                    "Color is perhaps the most emotionally charged element of design. The Espresso & Ember palette demonstrates how warm tones can create an inviting, focused atmosphere.",
                    "Effective color systems balance aesthetic appeal with functional requirements: sufficient contrast for accessibility, semantic meaning for status indicators, and visual hierarchy through luminance variation.",
                    "A systematic approach to color — defining backgrounds, text, accents, and semantic colors as tokens — ensures consistency while allowing for theme variations.",
                ],
            },
            5: {
                title: "Chapter 5: Spatial Harmony",
                text: [
                    "Space is not emptiness — it is structure. The careful application of whitespace creates breathing room, establishes relationships between elements, and guides the eye through a composition.",
                    "A mathematical spacing system, built on a consistent base unit, removes guesswork from layout decisions. When every margin, padding, and gap derives from the same scale, visual harmony emerges naturally.",
                    "The 4px grid system used throughout this design provides granular control while maintaining mathematical consistency across all components.",
                ],
            },
            6: {
                title: "Chapter 6: Interactive Patterns",
                text: [
                    "Interaction design bridges the gap between static visuals and living interfaces. Every hover state, transition, and animation communicates system status and available actions.",
                    "Effective interactions feel natural and responsive. Subtle transforms on button presses, smooth transitions between states, and meaningful loading indicators all contribute to a polished user experience.",
                    "Accessibility in interaction design means ensuring that every interactive pattern works equally well with mouse, keyboard, touch, and assistive technology.",
                ],
            },
            7: {
                title: "Chapter 7: Component Architecture",
                text: [
                    "Components are the building blocks of modern interfaces. A well-designed component system balances flexibility with consistency, allowing teams to compose complex layouts from simple, reusable pieces.",
                    "The key to sustainable component architecture lies in clear contracts: defined props, documented variants, and predictable behavior across contexts.",
                    "Version control, documentation, and testing form the operational backbone that keeps a component library healthy and trustworthy over time.",
                ],
            },
            8: {
                title: "Chapter 8: Looking Forward",
                text: [
                    "Design systems are living documents that evolve with the products and teams they serve. The principles outlined here provide a foundation, not a ceiling.",
                    "As new technologies, devices, and interaction paradigms emerge, the systematic thinking embedded in a design system provides the framework for adaptation.",
                    "The future of design lies not in prescriptive rules but in flexible systems that empower creativity while maintaining the consistency that users depend on.",
                ],
            },
        };

        function updateChapter(chapter: number) {
            if (chapter < 1 || chapter > totalChapters) return;
            currentChapter = chapter;
            if (chapterLabel) chapterLabel.textContent = `Chapter ${chapter} of ${totalChapters}`;
            if (prevBtn) prevBtn.disabled = chapter === 1;
            if (nextBtn) nextBtn.disabled = chapter === totalChapters;

            const pct = Math.round((chapter / totalChapters) * 100);
            if (progressFill) progressFill.style.width = `${pct}%`;
            if (progressText) progressText.textContent = `${pct}% complete`;

            // Update content
            const chData = chapterContent[chapter];
            if (content && chData) {
                content.innerHTML = `<h2>${chData.title}</h2>${chData.text.map((p) => `<p>${p}</p>`).join("")}`;
                content.style.fontSize = `${fontSize}px`;
            }
        }

        prevBtn?.addEventListener("click", () => updateChapter(currentChapter - 1));
        nextBtn?.addEventListener("click", () => updateChapter(currentChapter + 1));

        fontSizeBtn?.addEventListener("click", () => {
            fontSize = fontSize >= 22 ? 14 : fontSize + 2;
            if (content) content.style.fontSize = `${fontSize}px`;
            fontSizeBtn.textContent = `A${fontSize > 16 ? "+" : fontSize < 16 ? "-" : ""}`;
        });

        bookmarkBtn?.addEventListener("click", () => {
            bookmarked = !bookmarked;
            bookmarkBtn.style.opacity = bookmarked ? "1" : "0.6";
            bookmarkBtn.title = bookmarked ? `Bookmarked Ch.${currentChapter}` : "Bookmark";
            console.log(bookmarked ? `Bookmarked chapter ${currentChapter}` : "Bookmark removed");
        });

        tocBtn?.addEventListener("click", () => {
            const tocList = Object.entries(chapterContent)
                .map(([num, ch]) => `${num}. ${ch.title.replace(/Chapter \d+: /, "")}`)
                .join("\n");
            const choice = prompt(`Table of Contents:\n${tocList}\n\nEnter chapter number:`);
            if (choice) {
                const num = parseInt(choice, 10);
                if (!isNaN(num)) updateChapter(num);
            }
        });

        downloadBtn?.addEventListener("click", () => {
            const title = reader.querySelector(".epub-title")?.textContent || "book.epub";
            alert(`Download started: ${title}`);
        });

        updateChapter(currentChapter);
    });
}

// ============================================
// Document Viewers (generic with page nav)
// ============================================

function initializeDocViewers() {
    const viewers = document.querySelectorAll<HTMLElement>("[data-doc-viewer]");

    viewers.forEach((viewer) => {
        const totalPages = parseInt(viewer.dataset.pages || "12", 10);
        let currentPage = parseInt(viewer.dataset.currentPage || "1", 10);

        const prevBtn = viewer.querySelector<HTMLButtonElement>("[data-action='prev-page']");
        const nextBtn = viewer.querySelector<HTMLButtonElement>("[data-action='next-page']");
        const pageLabel = viewer.querySelector<HTMLElement>(".viewer-page-label");
        const preview = viewer.querySelector<HTMLElement>(".doc-embed-preview");
        const pageIndicator = preview?.querySelector(".doc-page-indicator");

        function updatePage(page: number) {
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            if (pageLabel) pageLabel.textContent = `${page} / ${totalPages}`;
            if (prevBtn) prevBtn.disabled = page === 1;
            if (nextBtn) nextBtn.disabled = page === totalPages;
            if (pageIndicator) pageIndicator.innerHTML = `<em>— Page ${page} of ${totalPages} —</em>`;
        }

        prevBtn?.addEventListener("click", () => updatePage(currentPage - 1));
        nextBtn?.addEventListener("click", () => updatePage(currentPage + 1));

        // Download button
        const downloadBtn = viewer.querySelector<HTMLButtonElement>("[title='Download']");
        downloadBtn?.addEventListener("click", () => {
            const name = viewer.querySelector(".doc-embed-name")?.textContent || "document";
            alert(`Download started: ${name}`);
        });

        // Open in new tab button
        const openBtn = viewer.querySelector<HTMLButtonElement>("[title='Open in new tab']");
        openBtn?.addEventListener("click", () => {
            console.log("Opening document in new tab...");
        });

        updatePage(currentPage);
    });
}

// ============================================
// PowerPoint Viewer
// ============================================

function initializePptxViewers() {
    const viewers = document.querySelectorAll<HTMLElement>("[data-pptx-viewer]");

    viewers.forEach((viewer) => {
        const prevBtn = viewer.querySelector<HTMLButtonElement>("[title='Previous slide']");
        const nextBtn = viewer.querySelector<HTMLButtonElement>("[title='Next slide']");
        const slideInput = viewer.querySelector<HTMLInputElement>(".pptx-slide-input");
        const fullscreenBtn = viewer.querySelector<HTMLButtonElement>("[title='Fullscreen']");
        const thumbnailBtn = viewer.querySelector<HTMLButtonElement>("[title='Thumbnails']");
        const downloadBtn = viewer.querySelector<HTMLButtonElement>("[title='Download']");
        const slideEl = viewer.querySelector<HTMLElement>(".pptx-slide");

        let currentSlide = 1;
        const totalSlides = 12;

        const slideData = [
            { icon: "📸", title: "Photo Album 2026", subtitle: "A Collection of Memorable Moments" },
            { icon: "🌅", title: "January Highlights", subtitle: "New beginnings and winter adventures" },
            { icon: "🏔️", title: "Mountain Retreat", subtitle: "A weekend in the Sierra Nevada" },
            { icon: "🎭", title: "Cultural Events", subtitle: "Theater, music, and art exhibitions" },
            { icon: "🍕", title: "Culinary Adventures", subtitle: "Exploring local food scenes" },
            { icon: "🏖️", title: "Beach Days", subtitle: "Sun, sand, and surf" },
            { icon: "🎉", title: "Celebrations", subtitle: "Birthdays, milestones, and gatherings" },
            { icon: "🌿", title: "Nature Walks", subtitle: "Trails, parks, and botanical gardens" },
            { icon: "📚", title: "Book Club Picks", subtitle: "Our favorites from the year" },
            { icon: "🎨", title: "Creative Projects", subtitle: "Art, crafts, and DIY endeavors" },
            { icon: "✈️", title: "Travel Memories", subtitle: "Adventures near and far" },
            { icon: "🙏", title: "Thank You", subtitle: "Until next year's album" },
        ];

        function updateSlide(slide: number) {
            if (slide < 1 || slide > totalSlides) return;
            currentSlide = slide;
            if (slideInput) slideInput.value = slide.toString();
            if (prevBtn) prevBtn.disabled = slide === 1;
            if (nextBtn) nextBtn.disabled = slide === totalSlides;

            const data = slideData[slide - 1];
            if (slideEl && data) {
                slideEl.innerHTML = `<div style="text-align:center;padding:80px 40px"><div style="font-size:48px;margin-bottom:24px">${data.icon}</div><h2 style="font-size:42px;color:#1a1a1a;margin-bottom:16px;font-weight:700">${data.title}</h2><p style="font-size:24px;color:#666">${data.subtitle}</p></div>`;
            }
        }

        prevBtn?.addEventListener("click", () => updateSlide(currentSlide - 1));
        nextBtn?.addEventListener("click", () => updateSlide(currentSlide + 1));

        slideInput?.addEventListener("change", () => {
            const v = parseInt(slideInput.value, 10);
            if (!isNaN(v)) updateSlide(Math.max(1, Math.min(totalSlides, v)));
        });

        fullscreenBtn?.addEventListener("click", () => {
            if (document.fullscreenElement) document.exitFullscreen();
            else viewer.requestFullscreen().catch(() => {});
        });

        thumbnailBtn?.addEventListener("click", () => {
            const list = slideData.map((d, i) => `${i + 1}. ${d.title}`).join("\n");
            const choice = prompt(`Slides:\n${list}\n\nGo to slide:`);
            if (choice) {
                const n = parseInt(choice, 10);
                if (!isNaN(n)) updateSlide(n);
            }
        });

        downloadBtn?.addEventListener("click", () => {
            const title = viewer.querySelector(".pptx-title")?.textContent || "presentation.pptx";
            alert(`Download started: ${title}`);
        });

        // Keyboard nav
        viewer.setAttribute("tabindex", "0");
        viewer.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") updateSlide(currentSlide - 1);
            if (e.key === "ArrowRight") updateSlide(currentSlide + 1);
            if (e.key === "f") fullscreenBtn?.click();
        });

        updateSlide(currentSlide);
    });
}

// ============================================
// ODP Viewer
// ============================================

function initializeOdpViewers() {
    const viewers = document.querySelectorAll<HTMLElement>("[data-odp-viewer]");

    viewers.forEach((viewer) => {
        const prevBtn = viewer.querySelector<HTMLButtonElement>("[title='Previous slide']");
        const nextBtn = viewer.querySelector<HTMLButtonElement>("[title='Next slide']");
        const slideInput = viewer.querySelector<HTMLInputElement>(".odp-slide-input");
        const fullscreenBtn = viewer.querySelector<HTMLButtonElement>("[title='Fullscreen']");
        const thumbnailBtn = viewer.querySelector<HTMLButtonElement>("[title='Thumbnails']");
        const downloadBtn = viewer.querySelector<HTMLButtonElement>("[title='Download']");
        const slideEl = viewer.querySelector<HTMLElement>(".odp-slide");

        let currentSlide = 1;
        const totalSlides = 6;

        const slideData = [
            { title: "Merged Screenshots Collection", sub: "6 screenshots captured on February 9, 2026" },
            { title: "Screenshot 1: Dashboard View", sub: "Application overview and navigation" },
            { title: "Screenshot 2: Editor Interface", sub: "Rich text editing with toolbar" },
            { title: "Screenshot 3: Settings Panel", sub: "Configuration and preferences" },
            { title: "Screenshot 4: File Browser", sub: "Document management system" },
            { title: "Screenshot 5: Export Dialog", sub: "Format selection and output options" },
        ];

        function updateSlide(slide: number) {
            if (slide < 1 || slide > totalSlides) return;
            currentSlide = slide;
            if (slideInput) slideInput.value = slide.toString();
            if (prevBtn) prevBtn.disabled = slide === 1;
            if (nextBtn) nextBtn.disabled = slide === totalSlides;

            const data = slideData[slide - 1];
            if (slideEl && data) {
                slideEl.innerHTML = `<div style="padding:40px"><div style="font-size:36px;margin-bottom:20px">🖼️</div><h2 style="font-size:32px;color:#1a1a1a;margin-bottom:12px;font-weight:700">${data.title}</h2><p style="font-size:18px;color:#666;margin-bottom:24px">${data.sub}</p><div style="background:#f5f5f5;border-radius:8px;padding:24px;border:2px dashed #ccc"><p style="color:#888;text-align:center">Screenshot ${slide} preview area</p></div></div>`;
            }
        }

        prevBtn?.addEventListener("click", () => updateSlide(currentSlide - 1));
        nextBtn?.addEventListener("click", () => updateSlide(currentSlide + 1));

        slideInput?.addEventListener("change", () => {
            const v = parseInt(slideInput.value, 10);
            if (!isNaN(v)) updateSlide(Math.max(1, Math.min(totalSlides, v)));
        });

        fullscreenBtn?.addEventListener("click", () => {
            if (document.fullscreenElement) document.exitFullscreen();
            else viewer.requestFullscreen().catch(() => {});
        });

        thumbnailBtn?.addEventListener("click", () => {
            const list = slideData.map((d, i) => `${i + 1}. ${d.title}`).join("\n");
            const choice = prompt(`Slides:\n${list}\n\nGo to slide:`);
            if (choice) {
                const n = parseInt(choice, 10);
                if (!isNaN(n)) updateSlide(n);
            }
        });

        downloadBtn?.addEventListener("click", () => {
            const title = viewer.querySelector(".odp-title")?.textContent || "presentation.odp";
            alert(`Download started: ${title}`);
        });

        viewer.setAttribute("tabindex", "0");
        viewer.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") updateSlide(currentSlide - 1);
            if (e.key === "ArrowRight") updateSlide(currentSlide + 1);
        });

        updateSlide(currentSlide);
    });
}

// ============================================
// Excel (XLSX) Viewer
// ============================================

function initializeXlsxViewers() {
    const viewers = document.querySelectorAll<HTMLElement>("[data-xlsx-viewer]");

    viewers.forEach((viewer) => {
        const sheetButtons = viewer.querySelectorAll<HTMLButtonElement>(".xlsx-toolbar-btn[title^='Sheet']");
        const sortBtn = viewer.querySelector<HTMLButtonElement>("[title='Sort']");
        const filterBtn = viewer.querySelector<HTMLButtonElement>("[title='Filter']");
        const downloadBtn = viewer.querySelector<HTMLButtonElement>("[title='Download']");
        const table = viewer.querySelector<HTMLTableElement>(".xlsx-table");

        // Sheet switching
        sheetButtons.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                sheetButtons.forEach((b) => {
                    b.style.background = "var(--bg-code)";
                    b.style.color = "var(--text-secondary)";
                });
                btn.style.background = "var(--accent-primary)";
                btn.style.color = "white";
                console.log(`Switched to sheet ${index + 1}`);
            });
        });

        // Set first sheet active
        if (sheetButtons.length > 0) {
            (sheetButtons[0]).style.background = "var(--accent-primary)";
            (sheetButtons[0]).style.color = "white";
        }

        // Sort functionality
        let sortAsc = true;
        sortBtn?.addEventListener("click", () => {
            if (!table) return;
            const tbody = table.querySelector("tbody");
            if (!tbody) return;
            const rows = Array.from(tbody.querySelectorAll("tr"));
            rows.sort((a, b) => {
                const aText = a.querySelectorAll("td")[1]?.textContent?.trim() || "";
                const bText = b.querySelectorAll("td")[1]?.textContent?.trim() || "";
                return sortAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
            });
            rows.forEach((r) => tbody.appendChild(r));
            sortAsc = !sortAsc;
            sortBtn.textContent = sortAsc ? "⇅" : "⇵";
        });

        // Filter functionality
        let filterActive = false;
        filterBtn?.addEventListener("click", () => {
            if (!table) return;
            const tbody = table.querySelector("tbody");
            if (!tbody) return;

            if (filterActive) {
                // Remove filter - show all rows
                tbody.querySelectorAll("tr").forEach((r) => (r as HTMLElement).style.display = "");
                filterActive = false;
                filterBtn.style.color = "";
                return;
            }

            const query = prompt("Filter by task name (or leave empty to clear):");
            if (!query) return;

            const rows = tbody.querySelectorAll("tr");
            rows.forEach((row) => {
                const taskCell = row.querySelectorAll("td")[1];
                const text = taskCell?.textContent?.toLowerCase() || "";
                (row as HTMLElement).style.display = text.includes(query.toLowerCase()) ? "" : "none";
            });
            filterActive = true;
            filterBtn.style.color = "var(--accent-primary)";
        });

        // Download
        downloadBtn?.addEventListener("click", () => {
            const title = viewer.querySelector(".xlsx-title")?.textContent || "spreadsheet.xlsx";
            alert(`Download started: ${title}`);
        });

        // Make table headers sortable
        if (table) {
            const headers = table.querySelectorAll("thead th");
            const tbody = table.querySelector("tbody");
            headers.forEach((th, colIdx) => {
                (th as HTMLElement).style.cursor = "pointer";
                let asc = true;
                th.addEventListener("click", () => {
                    if (!tbody) return;
                    const rows = Array.from(tbody.querySelectorAll("tr"));
                    rows.sort((a, b) => {
                        const aText = a.querySelectorAll("td")[colIdx]?.textContent?.trim() || "";
                        const bText = b.querySelectorAll("td")[colIdx]?.textContent?.trim() || "";
                        return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
                    });
                    rows.forEach((r) => tbody.appendChild(r));
                    asc = !asc;
                });
            });
        }
    });
}

// ============================================
// ODS Viewer
// ============================================

function initializeOdsViewers() {
    const viewers = document.querySelectorAll<HTMLElement>("[data-ods-viewer]");

    viewers.forEach((viewer) => {
        const sheetButtons = viewer.querySelectorAll<HTMLButtonElement>(".ods-toolbar-btn[title^='Sheet']");
        const sortBtn = viewer.querySelector<HTMLButtonElement>("[title='Sort']");
        const filterBtn = viewer.querySelector<HTMLButtonElement>("[title='Filter']");
        const downloadBtn = viewer.querySelector<HTMLButtonElement>("[title='Download']");
        const table = viewer.querySelector<HTMLTableElement>(".ods-table");

        // Sheet switching
        sheetButtons.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                sheetButtons.forEach((b) => {
                    b.style.background = "var(--bg-code)";
                    b.style.color = "var(--text-secondary)";
                });
                btn.style.background = "var(--accent-primary)";
                btn.style.color = "white";
                console.log(`Switched to sheet ${index + 1}`);
            });
        });

        if (sheetButtons.length > 0) {
            (sheetButtons[0]).style.background = "var(--accent-primary)";
            (sheetButtons[0]).style.color = "white";
        }

        // Sort
        let sortAsc = true;
        sortBtn?.addEventListener("click", () => {
            if (!table) return;
            const tbody = table.querySelector("tbody");
            if (!tbody) return;
            const rows = Array.from(tbody.querySelectorAll("tr"));
            rows.sort((a, b) => {
                const aText = a.querySelectorAll("td")[1]?.textContent?.trim() || "";
                const bText = b.querySelectorAll("td")[1]?.textContent?.trim() || "";
                return sortAsc ? aText.localeCompare(bText) : bText.localeCompare(aText);
            });
            rows.forEach((r) => tbody.appendChild(r));
            sortAsc = !sortAsc;
        });

        // Filter
        let filterActive = false;
        filterBtn?.addEventListener("click", () => {
            if (!table) return;
            const tbody = table.querySelector("tbody");
            if (!tbody) return;

            if (filterActive) {
                tbody.querySelectorAll("tr").forEach((r) => (r as HTMLElement).style.display = "");
                filterActive = false;
                filterBtn.style.color = "";
                return;
            }

            const query = prompt("Filter by task name:");
            if (!query) return;
            tbody.querySelectorAll("tr").forEach((row) => {
                const text = row.querySelectorAll("td")[1]?.textContent?.toLowerCase() || "";
                (row as HTMLElement).style.display = text.includes(query.toLowerCase()) ? "" : "none";
            });
            filterActive = true;
            filterBtn.style.color = "var(--accent-primary)";
        });

        downloadBtn?.addEventListener("click", () => {
            const title = viewer.querySelector(".ods-title")?.textContent || "spreadsheet.ods";
            alert(`Download started: ${title}`);
        });

        // Sortable headers
        if (table) {
            const headers = table.querySelectorAll("thead th");
            const tbody = table.querySelector("tbody");
            headers.forEach((th, colIdx) => {
                (th as HTMLElement).style.cursor = "pointer";
                let asc = true;
                th.addEventListener("click", () => {
                    if (!tbody) return;
                    const rows = Array.from(tbody.querySelectorAll("tr"));
                    rows.sort((a, b) => {
                        const aText = a.querySelectorAll("td")[colIdx]?.textContent?.trim() || "";
                        const bText = b.querySelectorAll("td")[colIdx]?.textContent?.trim() || "";
                        return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
                    });
                    rows.forEach((r) => tbody.appendChild(r));
                    asc = !asc;
                });
            });
        }
    });
}

// ============================================
// ZIP Viewer
// ============================================

function initializeZipViewers() {
    const viewers = document.querySelectorAll<HTMLElement>(".zip-viewer");

    viewers.forEach((viewer) => {
        const downloadBtn = viewer.querySelector<HTMLButtonElement>(".doc-embed-btn");
        const extractBtn = viewer.querySelectorAll<HTMLButtonElement>(".doc-embed-btn")[1];
        const fileButtons = viewer.querySelectorAll<HTMLButtonElement>(".zip-file-btn");
        const files = viewer.querySelectorAll<HTMLElement>(".zip-file");

        // Individual file download
        fileButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const fileRow = btn.closest(".zip-file");
                const fileName = fileRow?.querySelector(".zip-file-name")?.textContent || "file";
                btn.textContent = "✓";
                btn.style.background = "var(--success)";
                btn.style.color = "white";
                btn.style.borderColor = "var(--success)";
                console.log(`Downloading: ${fileName}`);
                setTimeout(() => {
                    btn.textContent = "↓";
                    btn.style.background = "";
                    btn.style.color = "";
                    btn.style.borderColor = "";
                }, 1500);
            });
        });

        // Download all
        downloadBtn?.addEventListener("click", () => {
            const name = viewer.querySelector(".zip-name")?.textContent || "archive.zip";
            alert(`Download started: ${name}`);
        });

        // Extract all
        extractBtn?.addEventListener("click", () => {
            files.forEach((file, i) => {
                setTimeout(() => {
                    file.style.background = "rgba(107, 184, 138, 0.1)";
                    const btn = file.querySelector(".zip-file-btn");
                    if (btn) {
                        btn.textContent = "✓";
                        (btn as HTMLElement).style.background = "var(--success)";
                        (btn as HTMLElement).style.color = "white";
                    }
                }, i * 300);
            });
            setTimeout(() => {
                files.forEach((file) => {
                    file.style.background = "";
                    const btn = file.querySelector(".zip-file-btn");
                    if (btn) {
                        btn.textContent = "↓";
                        (btn as HTMLElement).style.background = "";
                        (btn as HTMLElement).style.color = "";
                    }
                });
            }, files.length * 300 + 1000);
        });

        // File click to select
        files.forEach((file) => {
            file.addEventListener("click", (e) => {
                if ((e.target as HTMLElement).closest(".zip-file-btn")) return;
                files.forEach((f) => f.style.borderColor = "");
                file.style.borderColor = "var(--accent-primary)";
            });
        });
    });
}

// ============================================
// Embed Containers (browser chrome)
// ============================================

function initializeEmbedContainers() {
    const containers = document.querySelectorAll<HTMLElement>(".embed-container");

    containers.forEach((container) => {
        const refreshBtn = container.querySelector<HTMLButtonElement>("[title='Refresh']");
        const iframe = container.querySelector<HTMLIFrameElement>("iframe");
        const urlBar = container.querySelector<HTMLElement>(".embed-url");

        // Refresh button
        refreshBtn?.addEventListener("click", () => {
            if (iframe) {
                const src = iframe.src;
                iframe.src = "";
                setTimeout(() => { iframe.src = src; }, 100);
            }
            if (refreshBtn) {
                refreshBtn.textContent = "⟳";
                refreshBtn.style.animation = "spin 0.5s linear";
                setTimeout(() => {
                    refreshBtn.textContent = "↻";
                    refreshBtn.style.animation = "";
                }, 500);
            }
        });

        // URL bar click to copy
        urlBar?.addEventListener("click", () => {
            const url = urlBar.textContent?.trim() || "";
            navigator.clipboard.writeText(url).then(() => {
                const original = urlBar.textContent;
                urlBar.textContent = "Copied!";
                urlBar.style.color = "var(--success)";
                setTimeout(() => {
                    urlBar.textContent = original;
                    urlBar.style.color = "";
                }, 1000);
            }).catch(() => {});
        });

        // Traffic light dots
        const redDot = container.querySelector(".embed-dot.red");
        redDot?.addEventListener("click", () => {
            container.style.display = "none";
        });
    });
}

// ============================================
// Window Component
// ============================================

function initializeWindows() {
    const windows = document.querySelectorAll<HTMLElement>(".window");

    windows.forEach((win) => {
        const closeDot = win.querySelector(".window-dot.close");
        const minimizeDot = win.querySelector(".window-dot.minimize");
        const maximizeDot = win.querySelector(".window-dot.maximize");
        const body = win.querySelector<HTMLElement>(".window-body");

        closeDot?.addEventListener("click", () => {
            win.style.opacity = "0";
            win.style.transform = "scale(0.95)";
            win.style.transition = "all 0.3s ease";
            setTimeout(() => { win.style.display = "none"; }, 300);
        });

        minimizeDot?.addEventListener("click", () => {
            if (body) {
                const isMinimized = body.style.display === "none";
                body.style.display = isMinimized ? "" : "none";
            }
        });

        maximizeDot?.addEventListener("click", () => {
            const isMaximized = win.style.position === "fixed";
            if (isMaximized) {
                win.style.position = "";
                win.style.inset = "";
                win.style.zIndex = "";
                win.style.margin = "";
                win.style.borderRadius = "";
            } else {
                win.style.position = "fixed";
                win.style.inset = "20px";
                win.style.zIndex = "9999";
                win.style.margin = "0";
                win.style.borderRadius = "var(--radius-md)";
            }
        });
    });
}

// ============================================
// Address Block (copy on click)
// ============================================

function initializeAddressBlocks() {
    const fields = document.querySelectorAll<HTMLElement>(".address-field");
    fields.forEach((field) => {
        field.addEventListener("click", () => {
            const value = field.querySelector(".address-field-value")?.textContent?.trim() || "";
            navigator.clipboard.writeText(value).then(() => {
                const label = field.querySelector<HTMLElement>(".address-field-label");
                if (label) {
                    const original = label.textContent;
                    label.textContent = "Copied!";
                    label.style.color = "var(--success)";
                    setTimeout(() => {
                        label.textContent = original;
                        label.style.color = "";
                    }, 1200);
                }
            }).catch(() => {});
        });
    });
}

// ============================================
// Initialize everything
// ============================================

function init() {
    console.log("Markdown Editor Style Guide - Espresso & Ember Theme");
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

    // Document viewers
    initializePdfViewers();
    initializeEpubReaders();
    initializeDocViewers();
    initializePptxViewers();
    initializeOdpViewers();
    initializeXlsxViewers();
    initializeOdsViewers();
    initializeZipViewers();
    initializeEmbedContainers();
    initializeWindows();
    initializeAddressBlocks();

    window.addEventListener("resize", handleResize);

    console.log("All components initialized successfully");
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

export { init };
