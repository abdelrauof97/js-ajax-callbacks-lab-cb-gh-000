function searchRepositories() {
  event.preventDefault()
  const searchTerms = $("#searchTerms").val();
  const url = "https://api.github.com/search/repositories?q=" + searchTerms;
  $.get(url, data => {
    showRepos(data)
  }).fail(function(error) {
    $("#results").html(showErrors());
  });
}

var showRepos = (data) => {
  const reposList = "<ul>" + data.items.map(item => "<li>" + item.name + ' - <a href="#" data-repo="' + item.name + '" data-owner="' + item.owner.login + '" onclick="getCommits(this)"> Show commits </a>' + "</li>").join("") + "</ul>"
  $("#results").html(reposList);
}

var getCommits = (el) => {
  owner = el.dataset.owner;
  repo = el.dataset.repo;
  link = "https://api.github.com/repos/" + owner + "/" + repo + "/commits";
  showCommits(link)
}

var showCommits = (url) => {
  $.get(url, data => {
    const commitsList = "<ul>" + data.map(commit => "<li>" + commit.commit.message + "</li>").join("") + "</ul>"
    $("#details").html(commitsList);
  }).fail(error => {
    $("#details").html(showErrors());
  });
}

var showErrors = () => "an error has occured"
