const userTable = document.getElementById('users-table');
const usersContainer = document.getElementsByClassName('users-container');
const postsContainer = document.getElementsByClassName('posts-container');
const backBtn = document.getElementById('back-btn');

const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  return users;
};

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return posts;
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const userClickHandler = (userId, userName) => {
  userTable.style.display = 'none';
  postsContainer[0].style.display = '';
  displayPost(userId, userName);
};

const backBtnHandler = () => {
  removeAllChildNodes(postsContainer[0]);
  if (backBtn.style.display != 'none') {
    backBtn.style.display = 'none';
  }
  userTable.style.display = '';
};

const displayPost = (userId, userName) => {
  if ((backBtn.style.display = 'none')) {
    backBtn.style.display = 'inline-block';
  }

  const nameContainer = document.createElement('div');
  const nameTxt = document.createTextNode(`${userName} Posts`);
  nameContainer.appendChild(nameTxt);
  nameContainer.setAttribute('class', 'name');
  postsContainer[0].appendChild(nameContainer);

  backBtn.addEventListener('click', backBtnHandler);
  fetchPosts().then((posts) => {
    backBtn.setAttribute('class', 'display-btn');
    for (const post of posts) {
      if (post.userId === userId) {
        const postContainer = document.createElement('div');
        const titleContainer = document.createElement('h1');
        const bodyContainer = document.createElement('p');
        const name = document.createTextNode(post.title);
        const body = document.createTextNode(post.body);

        postContainer.setAttribute('class', 'post-container');
        titleContainer.setAttribute('class', 'title');

        titleContainer.appendChild(name);
        bodyContainer.appendChild(body);
        postContainer.appendChild(titleContainer);
        postContainer.appendChild(bodyContainer);
        postsContainer[0].appendChild(postContainer);
      }
    }
  });
};

const displayUsers = () => {
  fetchUsers().then((users) => {
    for (const user of users) {
      const userRow = document.createElement('tr');
      const id = document.createElement('td');
      const username = document.createElement('td');
      const name = document.createElement('td');
      const email = document.createElement('td');
      const idTxt = document.createTextNode(user.id);
      const userNameTxt = document.createTextNode(user.username);
      const nameTxt = document.createTextNode(user.name);
      const emailTxt = document.createTextNode(user.email);

      username.setAttribute('class', 'username');
      username.addEventListener('click', () =>
        userClickHandler(user.id, user.username)
      );

      id.appendChild(idTxt);
      username.appendChild(userNameTxt);
      name.appendChild(nameTxt);
      email.appendChild(emailTxt);

      userRow.appendChild(id);
      userRow.appendChild(username);
      userRow.appendChild(name);
      userRow.appendChild(email);

      userTable.appendChild(userRow);
    }
  });
};

displayUsers();
