async function Requset_func(request_str)
{
  var result = null;
  await fetch(request_str).then(response => {
      return response.json();
  }).then(data => {
      result = data;
  }).catch(err => {
      console.log("Theres an issue getting the data :/ ");
  });

  return result
}

async function FindUser()
{
	parent = document.getElementById("repoinfo");

	while(parent.firstChild)
	{
		parent.removeChild(parent.firstChild);
	}

	var a = document.getElementById("use").value;
	let b = await Requset_func("https://api.github.com/users/" + a);
	document.getElementById('names').innerHTML = b.name;
	document.getElementById('usernames').innerHTML = b.login;
	document.getElementById('emails').innerHTML = b.email;
	document.getElementById('locations').innerHTML = b.location;
	document.getElementById('numofG').innerHTML = b.public_gists;
	document.getElementById("userimg").src = b.avatar_url;
	let c = await Requset_func(b.repos_url);
	let  repodetails = c.map(r => [r.name, r.description]);

	repodetails.forEach(function(repo)
	{
		//CreateRepo(repo);
		var repos = document.createElement("div");
		repos.style.width = "400px";
		var name_row = document.createElement("div");
		var desc_row = document.createElement("div");
		var name = document.createElement("div");
		var desc = document.createElement("div");
		var name_label = document.createElement("div");
		var desc_label = document.createElement("div");

		name_row.style.border = "groove";
		desc_row.style.border = "groove";
		name.style.border = "groove";
		desc.style.border = "groove";

		name.className = "b";
		desc.className = "b";
		name_label.className = "a";
		desc_label.className = "a";

		name.innerHTML = repo[0];
		desc.innerHTML = repo[1];
		name_label.innerHTML = "Name:";
		desc_label.innerHTML = "Description:";

		name_row.appendChild(name_label);
		name_row.appendChild(name);
		desc_row.appendChild(desc_label);
		desc_row.appendChild(desc);

		repos.appendChild(name_row);
		repos.appendChild(desc_row);

		document.getElementById("repoinfo").appendChild(repos);
		
	});
}
