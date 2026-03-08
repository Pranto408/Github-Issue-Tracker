let allIssues = [];
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const btnContainer = document.getElementById("btn-container");
const countIssues = document.getElementById("count-issues");
const loadingSpinner = document.getElementById("loading-spinner");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const priorityConfig = {
  high: { bg: "bg-[#FEECEC]", text: "text-[#EF4444]" },
  medium: { bg: "bg-[#FFF6D1]", text: "text-[#F59E0B]" },
  low: { bg: "bg-[#EEEFF2]", text: "text-[#9CA3AF]" },
};

const labelConfig = {
  bug: {
    bg: "bg-[#FEECEC]",
    text: "text-[#EF4444]",
    border: "border-[#FECACA]",
    icon: "fa-solid fa-bug",
  },
  "help wanted": {
    bg: "bg-[#FFF8DB]",
    text: "text-[#D97706]",
    border: "border-[#FDE68A]",
    icon: "fa-solid fa-life-ring",
  },
  enhancement: {
    bg: "bg-[#E0F2FE]",
    text: "text-[#0369A1]",
    border: "border-[#BAE6FD]",
    icon: "fa-solid fa-wand-magic-sparkles",
  },
  documentation: {
    bg: "bg-[#F3E8FF]",
    text: "text-[#7E22CE]",
    border: "border-[#E9D5FF]",
    icon: "fa-solid fa-book",
  },
  "good first issue": {
    bg: "bg-[#DCFCE7]",
    text: "text-[#15803D]",
    border: "border-[#BBF7D0]",
    icon: "fa-solid fa-seedling",
  },
};


//Search functionality 
const handleSearch = () => {
  activateAllButton();
  const searchText = searchInput.value.toLowerCase();
  if (searchText === "") {
    displayCard(allIssues);
    return;
  }
  const filteredIssues = allIssues.filter((card) =>
    card.title.toLowerCase().includes(searchText)
  );
  displayCard(filteredIssues);
};

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleSearch();
});
searchInput.addEventListener("input", handleSearch);

// Active All Button
const activateAllButton = () => {
  openBtn.classList.remove("bg-[#4A00FF]", "text-white");
  closedBtn.classList.remove("bg-[#4A00FF]", "text-white");
  allBtn.classList.add("bg-[#4A00FF]", "text-white");
};

//Fetch card from API
const loadCards = () => {
  loadingSpinner.style.display = "flex";
  setTimeout(() => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
      .then((res) => res.json())
      .then((json) => {
        allIssues = json.data;
        loadingSpinner.style.display = "none";
        displayCard(allIssues);
      });
  }, 1000);
};
loadCards();

// Toggle Button
btnContainer.addEventListener("click", (event) => {
  if (event.target === allBtn) {
    openBtn.classList.remove("bg-[#4A00FF]", "text-white");
    closedBtn.classList.remove("bg-[#4A00FF]", "text-white");
    allBtn.classList.add("bg-[#4A00FF]", "text-white");
    const filteredAll = allIssues;
    displayCard(filteredAll);
  }
  if (event.target === openBtn) {
    openBtn.classList.add("bg-[#4A00FF]", "text-white");
    closedBtn.classList.remove("bg-[#4A00FF]", "text-white");
    allBtn.classList.remove("bg-[#4A00FF]", "text-white");
    const filteredOpen = allIssues.filter((i) => i.status === "open");
    displayCard(filteredOpen);
  }
  if (event.target === closedBtn) {
    openBtn.classList.remove("bg-[#4A00FF]", "text-white");
    closedBtn.classList.add("bg-[#4A00FF]", "text-white");
    allBtn.classList.remove("bg-[#4A00FF]", "text-white");
    const filteredClosed = allIssues.filter((i) => i.status === "closed");
    displayCard(filteredClosed);
  }
});

//Display card Function
const displayCard = (cards) => {
  countIssues.innerText = cards.length;
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  for (let card of cards) {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
        <div id="card" class="flex flex-col h-full p-4 rounded-lg shadow bg-white border-t-4 ${card.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"}">

        <div class="flex justify-between items-center mb-3">
          <img src="${card.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="" />
          <button class="${priorityConfig[card.priority]?.bg} 
          ${priorityConfig[card.priority]?.text} 
          px-6 py-2 rounded-[100px] uppercase text-xs font-medium">${card.priority}</button>  
        </div>
        <div>
          <h4 class="text-sm font-semibold text-[#1F2937] mb-2 min-h-10 flex items-center">
            ${card.title}
            </h4>
          <p class="text-[#64748B] text-xs mb-3">
            ${
              card.description.split(" ").length > 9
                ? card.description.split(" ").slice(0, 9).join(" ") + "..."
                : card.description
            }
          </p>
          <div class="flex flex-wrap gap-2 pb-4 border-b border-[#E4E4E7]">
            ${card.labels
              .map((label) => {
                const style = labelConfig[label];

                return `
            <button class="uppercase border-2 ${style.border} rounded-[100px] ${style.bg} ${style.text} text-xs font-medium px-2 py-1.5 flex items-center gap-1">
              <i class="${style.icon}"></i> ${label}
              </button>
              `;
              })
              .join("")}
            </div>


          <div class="pt-4">
            <p class="mb-2 text-[#64748B] text-xs">#${card.id} by ${card.author}</p>
            <p class="text-[#64748B] text-xs">
          ${new Date(card.createdAt).toLocaleDateString("en-US")}
          </p>
          </div>
        </div>
      </div>
        `;
    
    // Show information in modal
    cardDiv.addEventListener("click", () => {
      document.getElementById("modal-title").innerText = card.title;
      document.getElementById("modal-desc").innerText = card.description;
      document.getElementById("modal-author").innerText = card.author;
      document.getElementById("modal-date").innerText = new Date(
        card.createdAt,
      ).toLocaleDateString();
      document.getElementById("modal-assignee").innerText =
        card.assignee || "Unassigned";

      // Status show in modal
      const statusEl = document.getElementById("modal-status");
      statusEl.innerText = card.status;
      statusEl.className =
        card.status === "open"
          ? "bg-[#00A96E] text-white px-3 py-1 rounded-full text-xs font-medium"
          : "bg-[#A855F7] text-white px-3 py-1 rounded-full text-xs font-medium";

      // Priority show in modal
      const priorityEl = document.getElementById("modal-priority");
      const pStyle = priorityConfig[card.priority];
      priorityEl.innerText = card.priority.toUpperCase();
      priorityEl.className = `${pStyle.bg} ${pStyle.text} px-4 py-1 rounded-full text-xs font-bold uppercase`;

      // Level show in modal
      const modalLabelsContainer = document.getElementById("modal-labels");
      modalLabelsContainer.innerHTML = "";
      card.labels.forEach((label) => {
        const style = labelConfig[label];
        const labelBtn = document.createElement("button");
        labelBtn.className = `uppercase border-2 ${style.border} rounded-[100px] ${style.bg} ${style.text} text-[10px] font-bold px-3 py-1 flex items-center gap-1`;
        labelBtn.innerHTML = `<i class="${style.icon}"></i> ${label}`;
        modalLabelsContainer.appendChild(labelBtn);
      });

      document.getElementById("issue-modal").showModal();
    });
    cardContainer.appendChild(cardDiv);
  }
};
