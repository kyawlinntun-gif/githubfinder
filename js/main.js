$(function() {
    $('#username').on('keyup', function (e){
        let username =  e.target.value;

        $.ajax({
            type: 'get',
            url: 'https://api.github.com/users/'+username,
            data: {
                client_id: 'b1e719d305487690a9db',
                client_secret: '3ee3f3471da3ecf86c201d485bc4678ebd528123',
            }
        }).done((user) => {
            $.ajax({
                type: 'get',
                url: 'https://api.github.com/users/'+username+'/repos',
                data: {
                    client_id: 'b1e719d305487690a9db',
                    client_secret: '3ee3f3471da3ecf86c201d485bc4678ebd528123',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done((repos) => {
                $.each(repos, (index, repo) => {
                    $('#repos').append(`
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <strong>${repo.name}: </strong>${repo.description}
                                    </div>
                                    <div class="col-md-4">
                                        <button type="button" class="btn btn-secondary">Forks: ${repo.forks_count}</button>
                                        <button type="button" class="btn btn-primary">Watchers: ${repo.watchers_count}</button>
                                        <button type="button" class="btn btn-success">Stars: ${repo.stargazers_count}</button>
                                    </div>
                                    <div class="col-md-2">
                                        <a href="${repo.html_url}" class="btn btn-dark btn-block" target="_blank">Repo Page</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            $('#profile').html(`
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">${user.name}</h3>
                  </div>
                  <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${user.avatar_url}" alt="Avatar" class="img-thumbnail avatar mb-3">
                            <a href="${user.html_url}" class="btn btn-danger btn-block">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <button type="button" class="btn btn-secondary">Public Repos: ${user.public_repos}</button>
                            <button type="button" class="btn btn-primary">Public Gists: ${user.public_gists}</button>
                            <button type="button" class="btn btn-success">Followers: ${user.followers}</button>
                            <button type="button" class="btn btn-info">Following: ${user.following}</button>
                            <br><br>
                            <ul class="list-group">
                              <li class="list-group-item">Company: ${user.company}</li>
                              <li class="list-group-item">Website/blog: ${user.blog}</li>
                              <li class="list-group-item">Location: ${user.location}</li>
                              <li class="list-group-item">Member Since: ${user.created_at}</li>
                              <li class="list-group-item">And a fifth one</li>
                            </ul>
                        </div>
                    </div>
                  </div>
                  <h3 class="page-header">Latest Repos</h3>
                  <div id="repos"></div>
                </div>
            `);
        });
    });
});