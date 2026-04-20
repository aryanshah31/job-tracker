const API = "http://localhost:5000/api/jobs";

// Fetch jobs
async function fetchJobs() {
  const res = await fetch(API);
  const data = await res.json();

  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  let applied = 0, interview = 0, rejected = 0, offer = 0;

data.forEach(job => {
  if (job.status === "Applied") applied++;
  if (job.status === "Interview") interview++;
  if (job.status === "Rejected") rejected++;
  if (job.status === "Offer") offer++;
});

document.getElementById("stats").innerHTML = `
  <p>Applied: ${applied}</p>
  <p>Interview: ${interview}</p>
  <p>Rejected: ${rejected}</p>
  <p>Offer: ${offer}</p>
`;

  data.forEach(job => {
    jobList.innerHTML += `
  <div class="job">
    <h3>${job.company}</h3>
    <p>${job.role}</p>

    <select onchange="updateStatus('${job._id}', this.value)">
      <option ${job.status === "Applied" ? "selected" : ""}>Applied</option>
      <option ${job.status === "Interview" ? "selected" : ""}>Interview</option>
      <option ${job.status === "Rejected" ? "selected" : ""}>Rejected</option>
      <option ${job.status === "Offer" ? "selected" : ""}>Offer</option>
    </select>

    <button onclick="deleteJob('${job._id}')">Delete</button>
  </div>
`;
  });
}

// Update jobs
async function updateStatus(id, status) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });

  fetchJobs();
}

// Add job
async function addJob() {
  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;
  const link = document.getElementById("link").value;
  const status = document.getElementById("status").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ company, role, link, status })
  });

  fetchJobs();
}

// Delete job
async function deleteJob(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  fetchJobs();
}

// Load on start
fetchJobs();