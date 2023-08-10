import { suggestUsers, posts } from './database.js';

function addSuggestionToDOM(user) {
  const suggestionsList = document.querySelector(".main__sugestions-list");

  const suggestionItem = document.createElement("li");
  suggestionItem.classList.add("main__sugestions-list__itens");

  const userDiv = document.createElement("div");
  userDiv.classList.add("main__sugestions-list__itens__user");

  const userImage = document.createElement("img");
  userImage.src = user.img;
  userImage.alt = user.user;
  userImage.classList.add("main__sugestions-list__itens__image-user", "image-perfil");

  const userInfoDiv = document.createElement("div");
  userInfoDiv.classList.add("main__sugestions-list__itens__info-user");

  const userName = document.createElement("h2");
  userName.classList.add("main__sugestions-list__itens__name-user", "title2");
  userName.textContent = user.user;

  const userStack = document.createElement("p");
  userStack.classList.add("main__sugestions-list__profission", "text2");
  userStack.textContent = user.stack;

  const followButton = document.createElement("button");
  followButton.classList.add("main__sugestions-list__item__btn-seguir");
  followButton.textContent = "Seguir";


  userInfoDiv.appendChild(userName);
  userInfoDiv.appendChild(userStack);
  userDiv.appendChild(userImage);
  userDiv.appendChild(userInfoDiv);
  suggestionItem.appendChild(userDiv);
  suggestionItem.appendChild(followButton);
  suggestionsList.appendChild(suggestionItem);
}


function addSuggestionsToDOM(suggestions) {
  for (let i = 0; i < suggestions.length; i++) {
    const user = suggestions[i];
    addSuggestionToDOM(user);
  }
}

addSuggestionsToDOM(suggestUsers);


const postListContainer = document.querySelector(".main__post-listing");


function createPostElement(post) {
  const postElement = document.createElement("article");
  postElement.classList.add("main__post-listing__post");

  const userDiv = document.createElement("div");
  userDiv.classList.add("main__post-listing__post__user");

  const userImage = document.createElement("img");
  userImage.src = post.img;
  userImage.alt = post.user;
  userImage.classList.add("main__post-listing__image-user", "image-perfil");

  const userInfoDiv = document.createElement("div");
  userInfoDiv.classList.add("main__post-listing__info-user");

  const userName = document.createElement("h2");
  userName.classList.add("main__post-listing__name-user", "title2");
  userName.textContent = post.user;

  const userStack = document.createElement("p");
  userStack.classList.add("main__post-listing__profission", "text2");
  userStack.textContent = post.stack;

  const postTitle = document.createElement("h2");
  postTitle.classList.add("main__post-listing__post-title", "title1");
  postTitle.textContent = post.title;

  const postContent = document.createElement("p");
  postContent.classList.add("main__post-listing__post-content", "text1", "ellipsis");
  postContent.textContent = post.text;

  const areaButtons = document.createElement("div");
  areaButtons.classList.add("area-buttons");

  const openPostButton = document.createElement("button");
  openPostButton.classList.add("main__post-listing__openpost-btn");
  openPostButton.textContent = "Abrir Post";

  const likeArea = document.createElement("div");
  likeArea.classList.add("area-like");

  const likeIcon = document.createElement("img");
  likeIcon.src = "./src/assets/img/gray-heart.svg";
  likeIcon.alt = "Empty Heart(Post not liked)";
  likeIcon.classList.add("main__post-listing__like-icon");

  const likeNum = document.createElement("small");
  likeNum.classList.add("main__post-listing__like-num");
  likeNum.textContent = post.likes;

  userInfoDiv.appendChild(userName);
  userInfoDiv.appendChild(userStack);
  userDiv.appendChild(userImage);
  userDiv.appendChild(userInfoDiv);
  postElement.appendChild(userDiv);
  postElement.appendChild(postTitle);
  postElement.appendChild(postContent);
  likeArea.appendChild(likeIcon);
  likeArea.appendChild(likeNum);
  areaButtons.appendChild(openPostButton);
  areaButtons.appendChild(likeArea);
  postElement.appendChild(areaButtons);

  return postElement;
}


function createPostList(posts) {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const postElement = createPostElement(post);
    postListContainer.appendChild(postElement);
  }
}

createPostList(posts);


document.addEventListener('DOMContentLoaded', () => {
  const openPostButtons = document.querySelectorAll('.main__post-listing__openpost-btn');
  const postModal = document.getElementById('postModal');
  const modalContent = document.getElementById('modalContent');
  const modalCloseButton = document.createElement('button');
  modalCloseButton.classList.add('modal__close-button');
  modalCloseButton.innerHTML = '&times;';

  function createModalPostContent(post) {
    const modalContentElement = document.createElement("div");
    modalContentElement.classList.add("modal__content");

    const userDiv = document.createElement("div");
    userDiv.classList.add("main__post-listing__post__user");

    const userImage = document.createElement("img");
    userImage.src = post.img;
    userImage.alt = post.user;
    userImage.classList.add("main__post-listing__image-user", "image-perfil");

    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("main__post-listing__info-user");

    const userName = document.createElement("h2");
    userName.classList.add("main__post-listing__name-user", "title2");
    userName.textContent = post.user;

    const userStack = document.createElement("p");
    userStack.classList.add("main__post-listing__profission", "text2");
    userStack.textContent = post.stack;

    const postTitle = document.createElement("h2");
    postTitle.classList.add("main__post-listing__post-title", "title1");
    postTitle.textContent = post.title;

    const postContent = document.createElement("p");
    postContent.classList.add("main__post-listing__post-content", "text1");
    postContent.textContent = post.text;

    modalContentElement.appendChild(userDiv);
    modalContentElement.appendChild(userImage);
    modalContentElement.appendChild(userInfoDiv);
    modalContentElement.appendChild(userName);
    modalContentElement.appendChild(userStack);
    userDiv.appendChild(userImage);
    userDiv.appendChild(userInfoDiv);
    userInfoDiv.appendChild(userName);
    userInfoDiv.appendChild(userStack);
    modalContentElement.appendChild(postTitle);
    modalContentElement.appendChild(postContent);

    return modalContentElement;
  }

  function handleOpenPostClick(index) {
    return () => {
      const post = posts[index];
      modalContent.innerHTML = '';

      const modalContentElement = createModalPostContent(post);
      modalContent.appendChild(modalContentElement);
      modalContent.appendChild(modalCloseButton);

      postModal.showModal();
    };
  }

  for (let index = 0; index < openPostButtons.length; index++) {
    const button = openPostButtons[index];
    button.addEventListener('click', handleOpenPostClick(index));
  }

  modalCloseButton.addEventListener('click', () => {
    postModal.close();
    modalContent.innerHTML = '';
  });
});
