async function fetchRepos() {
  const user = document.getElementById('username').value.trim();
  const repoList = document.getElementById('repoList');
  repoList.innerHTML = '';
  if (!user) {
    repoList.innerHTML = '<li>Please enter a GitHub username.</li>';
    return;
  }
  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=10&sort=updated`);
    if (!res.ok) throw new Error('User not found');
    const repos = await res.json();
    if (!repos.length) {
      repoList.innerHTML = '<li>No repositories found for this user.</li>';
      return;
    }
    repos.forEach(repo => {
      const li = document.createElement('li');
      li.className = 'repo-item';
      li.innerHTML = `
        <a href="${repo.html_url}" class="repo-title" target="_blank">${repo.name}</a>
        <div class="repo-desc">${repo.description || "No description provided."}</div>
        <div class="repo-meta">
          ⭐ ${repo.stargazers_count} &nbsp; | &nbsp; Forks: ${repo.forks_count} &nbsp; | &nbsp; Updated: ${new Date(repo.updated_at).toLocaleDateString()}
        </div>
      `;
      repoList.appendChild(li);
    });
  } catch (err) {
    repoList.innerHTML = `<li>Error: ${err.message}</li>`;
  }
}