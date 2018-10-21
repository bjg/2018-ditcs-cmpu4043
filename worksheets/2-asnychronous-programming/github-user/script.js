const infoNeeded = [{
  title: 'Name',
  attribute: 'name',
}, {
  title: 'Username',
  attribute: 'login',
}, {
  title: 'Email',
  attribute: 'email',
}, {
  title: 'Location',
  attribute: 'location',
}, {
  title: 'Number of Gists',
  attribute: 'public_gists',
}];

async function loadUserData(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  document.querySelectorAll('.column').forEach(col => col.innerHTML = '')

  if (response.status === 404) {
    alert('Sorry, user not found.');
    return;
  }

  const info = await response.json();
  const imgResponse = await fetch(info.avatar_url);
  const imgBlob = await imgResponse.blob();
  const imgSrc = URL.createObjectURL(imgBlob)

  const columns = document.querySelectorAll('.column');
  const infoColumn = columns[0];
  const repoColumn = columns[1];

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('rowItem');

  const img = document.createElement('img');
  img.src = imgSrc;
  imgContainer.appendChild(img);
  infoColumn.appendChild(imgContainer);

  infoNeeded.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('rowItem');
    div.innerHTML = `<b>${item.title}:</b> ${info[item.attribute]}`;
    infoColumn.appendChild(div);
  });

  const repoResponse = await fetch(info.repos_url);
  const repoInfo = await repoResponse.json();

  repoInfo.forEach(repo => {
    const div = document.createElement('div');
    div.classList.add('rowItem');
    div.innerHTML = `<b>Name:</b> ${repo.name}<br /><br /><b>Description:</b> ${repo.description}`;
    repoColumn.appendChild(div);
  });
}

window.onload = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = form.querySelector('input[type=text]').value;
    loadUserData(username);
  })
}
