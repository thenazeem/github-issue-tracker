let issues = [];

function loadIssues() {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
      issues = json.data;
      const allTab = document.querySelector(".tab.active");
      showIssues('all', allTab);
    })
    .catch(err => console.error(err));
}

function showIssues(type, element, searchText = "") {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active", "btn-primary"));
  element.classList.add("active", "btn-primary");

  let filtered = issues;
  if(type === "open") filtered = issues.filter(i => i.status === "open");
  if(type === "closed") filtered = issues.filter(i => i.status === "closed");

  if(searchText.trim() !== "") {
    filtered = filtered.filter(i => i.title.toLowerCase().includes(searchText.toLowerCase()));
  }

  const container = document.getElementById("issueList");
  container.innerHTML = filtered.map(issue => {

    let shadowColor = issue.status==='open'?'shadow-green-500':'shadow-red-500';

    return `
      <div class="p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer ${shadowColor}" onclick="openIssue(${issue.id})">
        <h3 class="text-lg font-bold mb-2">${issue.title}</h3>
        <p>Status: <span class="${issue.status==='open'?'text-green-500':'text-red-500'} font-semibold">${issue.status}</span></p>
        <p>Priority: <span class="font-semibold">${issue.priority}</span></p>
        <p>Author: <span class="font-semibold">${issue.author}</span></p>
        <p>Created: <span class="font-semibold">${new Date(issue.createdAt).toLocaleDateString()}</span></p>
      </div>
    `;
  }).join('');
}

//modal

function openIssue(id) {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then(res => res.json())
    .then(resp => {
      const data = resp.data;
      const modalDiv = document.getElementById("modalData");
      modalDiv.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${data.title}</h2>
        <p>Status: <span class="${data.status==='open'?'text-green-500':'text-red-500'} font-semibold">${data.status}</span></p>
        <p>Priority: <span class="font-semibold">${data.priority}</span></p>
        <p>Author: <span class="font-semibold">${data.author}</span></p>
        <p>Description: ${data.description}</p>
        <p>Created At: <span class="font-semibold">${new Date(data.createdAt).toLocaleDateString()}</span></p>
      `;
      document.getElementById("modal").classList.remove("hidden");
    });
}

//close-modal

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});

//Search
document.getElementById("searchBtn").addEventListener("click", () => {
  const searchText = document.getElementById("searchInput").value;
  const activeTab = document.querySelector(".tab.active").getAttribute("onclick").match(/'(\w+)'/)[1];
  const activeElement = document.querySelector(".tab.active");
  showIssues(activeTab, activeElement, searchText);
});

// Initial load
loadIssues();