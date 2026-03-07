const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

const btnContainer = document.getElementById("btn-container");

btnContainer.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target === allBtn) {
        openBtn.classList.remove("bg-[#4A00FF]","text-white");
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
})