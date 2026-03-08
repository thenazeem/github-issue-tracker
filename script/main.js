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

  const countDiv = document.getElementById("issueCount");
  countDiv.innerHTML = `
  
  <div class="flex gap-5 p-4 items-center">
  <div><img class="w-[50px]" src="assets/aperture.png" alt=""></div>
  <div class="text-2xl font-semibold"><span><strong>${filtered.length}</strong> Issues</span> </br>
  <span class=" text-sm text-gray-500">Track and manage your project issues</span> </div>
  </div>
  
`;

  const container = document.getElementById("issueList");
  container.innerHTML = filtered.map(issue => {

let borderColor = issue.status === "open" ? "border-green-500" : "border-red-500";
let statusIcon = issue.status === "open" ? "fa-circle-check text-green-500" : "fa-circle-xmark text-red-500";

let priorityColor = "bg-gray-200 text-gray-600";

if(issue.priority === "high"){
priorityColor = "bg-red-200 text-red-600";
}
if(issue.priority === "medium"){
priorityColor = "bg-yellow-200 text-yellow-600";
}
if(issue.priority === "low"){
priorityColor = "bg-green-200 text-green-600";
}

return `

<div onclick="openIssue(${issue.id})"
class="bg-base-200 rounded-xl shadow-md border-t-4 ${borderColor} p-5 hover:shadow-xl transition cursor-pointer">

<div class="flex justify-between items-center mb-4">

<div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
<i class="fa-solid ${statusIcon}"></i>
</div>

<span class="px-4 py-1 rounded-full text-sm font-semibold ${priorityColor}">
${issue.priority.toUpperCase()}
</span>

</div>

<h2 class="text-xl font-bold text-gray-700 mb-2">
${issue.title}
</h2>

<p class="text-gray-500 mb-4">
${issue.description.slice(0,90)}...
</p>

<div class="flex gap-2 mb-4">

<span class="px-3 py-1 rounded-full border border-red-300 text-red-500 text-sm">
🐞 BUG
</span>

<span class="px-3 py-1 rounded-full border border-yellow-400 text-yellow-600 text-sm">
⚙ HELP WANTED
</span>

</div>

<hr class="mb-3">

<div class="flex justify-between text-gray-500 text-sm">

<p>#${issue.id} by ${issue.author}</p>

<p>${new Date(issue.createdAt).toLocaleDateString()}</p>

</div>

</div>

`;

}).join('');
}

// Modal
function openIssue(id){

fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
.then(res=>res.json())
.then(resp=>{

const data = resp.data;

let statusColor = data.status === "open" ? "text-green-500" : "text-red-500";

let priorityColor="bg-gray-200";

if(data.priority==="high"){
priorityColor="bg-red-200 text-red-600";
}
if(data.priority==="medium"){
priorityColor="bg-yellow-200 text-yellow-600";
}
if(data.priority==="low"){
priorityColor="bg-green-200 text-green-600";
}

const modalDiv=document.getElementById("modalData");

modalDiv.innerHTML=`

        <div class="space-y-4">
        <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold">${data.title}</h2>
        <span class="px-4 py-1 rounded-full font-semibold ${priorityColor}">
        ${data.priority.toUpperCase()}</span> </div>
        <p class="text-gray-600">${data.description}</p>
        <div class="flex gap-3">
        <span class="px-3 py-1 rounded-full border border-red-300 text-red-500 text-sm">🐞 BUG</span>
        <span class="px-3 py-1 rounded-full border border-yellow-400 text-yellow-600 text-sm">⚙ HELP WANTED</span></div><hr>
        <div class="flex justify-between text-sm text-gray-500"><p>
        Status: <span class="${statusColor} font-semibold">
        ${data.status}</span></p><p>
        #${data.id} by ${data.author}</p></div>
        <p class="text-sm text-gray-500">
        Created: ${new Date(data.createdAt).toLocaleDateString()}</p></div>`;

document.getElementById("modal").classList.remove("hidden");

});

}

//Close modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});


document.getElementById("modal").addEventListener("click", (e)=>{
if(e.target.id==="modal"){
document.getElementById("modal").classList.add("hidden");
}
});

//Search
document.getElementById("searchBtn").addEventListener("click", () => {
  const searchText = document.getElementById("searchInput").value;
  const activeTab = document.querySelector(".tab.active").getAttribute("onclick").match(/'(\w+)'/)[1];
  const activeElement = document.querySelector(".tab.active");
  showIssues(activeTab, activeElement, searchText);
});


loadIssues();