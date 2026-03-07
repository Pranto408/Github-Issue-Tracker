const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const btnContainer = document.getElementById("btn-container");
const countIssues = document.getElementById("count-issues");

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

// Toggle Button
btnContainer.addEventListener("click", (event) => {
  if (event.target === allBtn) {
    openBtn.classList.remove("bg-[#4A00FF]", "text-white");
    closedBtn.classList.remove("bg-[#4A00FF]", "text-white");
    allBtn.classList.add("bg-[#4A00FF]", "text-white");
  }
  if (event.target === openBtn) {
    openBtn.classList.add("bg-[#4A00FF]", "text-white");
    closedBtn.classList.remove("bg-[#4A00FF]", "text-white");
    allBtn.classList.remove("bg-[#4A00FF]", "text-white");
  }
  if (event.target === closedBtn) {
    openBtn.classList.remove("bg-[#4A00FF]", "text-white");
    closedBtn.classList.add("bg-[#4A00FF]", "text-white");
    allBtn.classList.remove("bg-[#4A00FF]", "text-white");
  }
});

const loadCards = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayCard(json.data));
};
loadCards();

const displayCard = (cards) => {
          countIssues.innerText = cards.length;
  //   1.get the container &empty
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  // 2. create element div and inner html

    for (let card of cards) {

    console.log(card.status);
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
        <div id="card" class="flex flex-col h-full p-4 rounded-lg shadow bg-white border-t-4 ${card.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]"}">

        <div class="flex justify-between items-center mb-3">
          <img src="${card.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="" />
          <button class="${
            card.priority === "high"
              ? "text-[#EF4444] bg-[#FEECEC]"
              : card.priority === "medium"
                ? "text-[#F59E0B] bg-[#FFF6D1]"
                : "text-[#9CA3AF] bg-[#EEEFF2]"
          } px-6 py-2 rounded-[100px]      uppercase text-xs font-medium">${card.priority}</button>  
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
    cardContainer.appendChild(cardDiv);
  }
};
