var userInput = document.querySelector('#app input');
var title = document.querySelector('#title');
var nameTitle = document.querySelector('#name');
var userTitle = document.querySelector('#user');
var userAvatar = document.querySelector('#avatar');
var repoList = document.querySelector('#app ul');

function nameUser() {
  var user = userInput.value;
  repoList.innerHTML = '';
  title.classList.add('hide');
  
  axios.get('https://api.github.com/users/'+ user)
    .then(function(response) {
      userAvatar.setAttribute('src', response.data.avatar_url);
      nameTitle.innerHTML = (response.data.name);
    })
    .catch(function(error) {
      userAvatar.setAttribute('src', 'https://github.githubassets.com/images/modules/open_graph/github-octocat.png')
    });
  axios.get('https://api.github.com/users/'+ user +"/repos")
    .then(function(response) {
      userTitle.innerHTML = user;
      for (var i = 0; i < response.data.length; i++) {
        var repoLink = document.createElement('a');
        var linkText = document.createTextNode('acessar');
        var repoName = response.data[i].name;
        var el = document.createElement('li');
        var repo = document.createTextNode(repoName);
        repoLink.appendChild(linkText);
        repoLink.href = response.data[i].html_url;
        el.appendChild(repo);
        el.appendChild(repoLink);
        repoList.appendChild(el);
        title.classList.remove('hide');
      }
    })
    .catch(function(error) {
      alert("Usuário não existe");
    });  
}