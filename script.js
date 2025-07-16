
// ******************** All js code here **********************
// navbar toggle *************
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-list");
const closeBtn = document.getElementById("closeBtn");

mobileMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
    navLinks.classList.remove("active");
});

// navbar scroll *************
const navbar = document.getElementById('nav');
const navAttr = document.getElementById("nav-img");

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
    navbar.classList.add('scrolled');
    navAttr.getAttribute("src");
    navAttr.getAttribute("src");
    navAttr.src = "img/white hole.png"; // <-- logo change on scroll
    } else {
    navbar.classList.remove('scrolled');
    navAttr.src = "img/black hole.png"; // <-- logo change on scroll
    }
});

// animated text *************
const texts = [
    "Explore The Universe Of Knowledge",
    "Explore Science",
    "Discover The Universe",
    "Visit The Lab",
    "Unleash Curiosity",
    "Science Is Magic"
];

let i = 0;
const textElement = document.getElementById("animated-text");

setInterval(() => {
    i = (i + 1) % texts.length;
    textElement.style.opacity = 0;

setTimeout(() => {
    textElement.textContent = texts[i];
    textElement.style.opacity = 1;
  }, 500);
}, 3000);

// search bar optimization *************
// my page or url suggestions for search bar ************
const suggestionsData = [
    { text: "Home", url: "#home" },
    { text: "About Us", url: "about.html" },
    { text: "Services", url: "services.html" },
    { text: "Contact", url: "contact.html" },
    { text: "Blog", url: "blog.html" },
    { text: "Portfolio", url: "portfolio.html" },
    { text: "FAQ", url: "faq.html" },
    { text: "Discover Science", url: "#discover" },
    { text: "Gallery", url: "gallery.html" },
    { text: "Career", url: "career.html" }
];

// ====== 2. DOM Element reference ======
const inputEl = document.getElementById("searchInput");
const suggestionListEl = document.getElementById("suggestionList");
const searchBtnEl = document.getElementById("searchBtn");

// ====== 3. Utility function : suggetion render ======
function renderSuggestions(filteredArray) {
    // remove all prev tag
    suggestionListEl.innerHTML = "";

    // when filter === 0
    if (filteredArray.length === 0) {
    suggestionListEl.style.display = "none";
    return;
    }

    // no when create list
    filteredArray.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.text;
    li.setAttribute("data-url", item.url);

    // mouse hover active clss
    li.addEventListener("mouseenter", () => {
        document.querySelectorAll(".suggestions li").forEach(el => el.classList.remove("active"));
        li.classList.add("active");
    });
    li.addEventListener("mouseleave", () => {
        li.classList.remove("active");
    });

    // click to redirect
    li.addEventListener("click", () => {
        window.location.href = item.url;
    });

    suggestionListEl.appendChild(li);
    });

    // show suggetion box
    suggestionListEl.style.display = "block";
}

// ====== 4. input event handler (when type) ======
inputEl.addEventListener("input", () => {
    const query = inputEl.value.trim().toLowerCase();
    if (query === "") {
    // when input empty
    suggestionListEl.style.display = "none";
    return;
    }
    // filtering: startsWith or includes 
    const filtered = suggestionsData.filter(item => item.text.toLowerCase().includes(query));
    renderSuggestions(filtered);
});

// ====== 5. keyboard nevigation : up || down || arrow || enter ======
let selectedIndex = -1; // কোন লিস্ট আইটেম সিলেক্টেড আছে কিনা ট্র্যাক করে

inputEl.addEventListener("keydown", (e) => {
    const items = suggestionListEl.querySelectorAll("li");
    if (suggestionListEl.style.display === "none" || items.length === 0) return;

    if (e.key === "ArrowDown") {
    // নিচের দিকে যেতে চাইলে
    e.preventDefault();
    selectedIndex = (selectedIndex + 1) % items.length;
    updateActiveItem(items);
    } else if (e.key === "ArrowUp") {
    // ওপরে যেতে চাইলে
    e.preventDefault();
    selectedIndex = (selectedIndex - 1 + items.length) % items.length;
    updateActiveItem(items);
    } else if (e.key === "Enter") {
    // এন্টার প্রেস করলে সিলেক্টেড আইটেম রিডাইরেক্ট করবে
    e.preventDefault();
    if (selectedIndex >= 0 && items[selectedIndex]) {
        window.location.href = items[selectedIndex].getAttribute("data-url");
    } else {
        // যদি কোনো সাজেশন সিলেক্ট না করা হয়, তাহলে ইনপুটের টেক্সট অনুযায়ী সার্চ পেজ 
        // ধরছি search.html?page=কিছু
        const searchTerm = encodeURIComponent(inputEl.value.trim());
        if (searchTerm !== "") {
        window.location.href = `search.html?query=${searchTerm}`;
        }
    }
    }
});

function updateActiveItem(items) {
    // সব থেকে আগে আগের active রিমুভ করি
    items.forEach(el => el.classList.remove("active"));
    // তারপর সিলেক্টেড ইনডেক্সে active অ্যাড করি
    if (selectedIndex >= 0 && items[selectedIndex]) {
    items[selectedIndex].classList.add("active");
    }
}

// ====== 6. search button event ======
searchBtnEl.addEventListener("click", () => {
    const current = suggestionListEl.querySelector("li.active");
    if (current) {
    // suggetion click, redirect
    window.location.href = current.getAttribute("data-url");
    } else {
    // অন্যথায় ইনপুটের ভিত্তিতে সার্চ পেজে রিডাইরেক্ট
    const searchTerm = encodeURIComponent(inputEl.value.trim());
    if (searchTerm !== "") {
        window.location.href = `search.html?query=${searchTerm}`;
    }
    }
});

// ====== 7. hide suggetion while window click ======
document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
    suggestionListEl.style.display = "none";
    selectedIndex = -1;
    }
});

// tsParticles configuration *************
const particleConfig = {
    particles: {
        number: { value: 50 },
        color: { value: "#ffffff" }, // default color white
        shape: { type: "circle" },
        opacity: {
            value: 0.8,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 2,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" }
        }
    },
    retina_detect: true
};

const sections = ["particles1", "particles2", "particles3", "particles4"];
sections.forEach(sectionId => {
    // default configuration for each section
    let config = { ...particleConfig };

    if (sectionId === "particles4") {
        config.particles.color.value = "#ff4000";
    }

    tsParticles.load(sectionId, config);
});
// #00fa15
// tsparticles new configuration *************
tsParticles.load("tsparticles", {
    particles: {
        number: { value: 100 },
        size: { value: 2 },
        move: { enable: true, speed: 1 },
        opacity: { value: 0.5 },
        links: { enable: true, distance: 100, color: "#38bdf8",}
    }
});
