window.addEventListener("click", buttonHandler);
window.addEventListener("DOMContentLoaded", renderPosts);

/* Renders all posts from localStorage when page refreshed */
function renderPosts(event) {
  event.preventDefault();
  let postList = localStorage.getItem("postList");
  postList = JSON.parse(postList);

  if (postList != null) {
    for (post in postList) {
      makePost(postList[post]);
    }
  }
}

/* Handles events for buttons */
function buttonHandler(event) {
  event.preventDefault();
  if (event.target.id == "post-btn") {
    show();
  } else if (event.target.id == "submit-btn") {
    submit(event);
  } else if (event.target.id == "cancel-btn") {
    cancel(event);
  } else if (
    String(event.target.id).substring(0, 4) == "edit" &&
    event.target.tagName == "BUTTON"
  ) {
    editPost(event);
  } else if (event.target.id.substring(0, 6) == "delete") {
    deletePost(event);
  }
}

/* Show dialog */
function show() {
  let dialog = document.getElementById("dialog");
  let title = document.getElementById("title");
  let post = document.getElementById("post");
  let submitBtn = document.getElementById("submit-btn");
  submitBtn.innerHTML = "Submit";
  title.value = "";
  post.value = "";
  dialog.open = true;

  console.log("Show dialog");
}

/* Cancel button hides dialog */
function cancel(event) {
  let dialog = document.getElementById("dialog");
  document.getElementById("title").value = "";
  document.getElementById("post").value = "";
  document.getElementById("submit-btn").innerHTML = "Submit";
  dialog.open = false;
  console.log("cancel");
}

/* Saves form data to local storage */
function submit(event) {
  let form = document.getElementById("post-form");
  let postTitle = document.getElementById("title");
  let postContent = document.getElementById("post");

  if (form.checkValidity()) {
    let dialog = document.getElementById("dialog");
    let date = new Date();
    let formatDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;

    // Create Post Data to store
    postTitle = cleanInput(postTitle.value);
    postContent = cleanInput(postContent.value);
    let postData = {
      id: `${postTitle}`,
      title: `${postTitle}`,
      date: `${formatDate}`,
      content: `${postContent}`,
    };

    let postList = localStorage.getItem("postList");
    postList = JSON.parse(postList);
    if (postList == null) {
      postList = [];
    }

    // Create and store new post
    if (event.target.innerHTML == "Submit") {
      postList.push(postData);
      makePost(postList[postList.length - 1]);
      localStorage.setItem("postList", JSON.stringify(postList));
      console.log("Submit");
    } else if (event.target.innerHTML == "Save") {
      // Editing post will update the post
      updatePost(postData, prevPostIdx);
      console.log("Save");
    }
    dialog.open = false;
  } else {
    form.reportValidity();
  }
  console.log(localStorage.getItem("postList"));
}

/* Adds a post to post-list */
function makePost(postData) {
  let postList = document.getElementById("post-list");
  let container = document.createElement("div");
  container.id = postData.title;
  let postTitle = postData.title;
  let postContent = postData.content;
  let postDate = postData.date;

  container.innerHTML = `
    <h2>${postTitle} ${postDate}</h2>
    <p>${postContent}</p>
  `;

  let editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  editBtn.type = "button";
  editBtn.id = "edit:" + postTitle;
  editBtn.addEventListener("clicked", editPost);
  container.appendChild(editBtn);

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.type = "button";
  deleteBtn.id = "delete:" + postTitle;
  editBtn.addEventListener("clicked", deletePost);
  container.appendChild(deleteBtn);

  postList.appendChild(container);
  console.log("make post");
}

/* Shows dialog to edit post. Stores updated post to storage and updates elements */
let prevPostIdx;
function editPost(event) {
  event.preventDefault();
  show();
  let saveBtn = document.getElementById("submit-btn");
  saveBtn.innerHTML = "Save";
  let dialog = document.getElementById("dialog");
  let postTitle = event.target.parentNode.id;
  let postList = localStorage.getItem("postList");
  postList = JSON.parse(postList);
  let postContent = postList.find((post) => post.id == postTitle);
  postContent = postContent.content;
  prevPostIdx = postList
    .map((post) => post.id)
    .indexOf(event.target.parentNode.id);

  document.getElementById("title").value = postTitle;
  document.getElementById("post").value = postContent;
  console.log(`Edit: ${event.target.parentNode.id}`);
}

/* Updates the DOM with edited post and stores it */
function updatePost(postData, postIdx) {
  let postTitle = postData.title;
  let postContent = postData.content;
  let storedPosts = localStorage.getItem("postList");
  storedPosts = JSON.parse(storedPosts);
  let prevID = storedPosts[postIdx].id;
  let container = document.getElementById(prevID);
  let editBtn = document.getElementById(`edit:${prevID}`);
  let deleteBtn = document.getElementById(`delete:${prevID}`);

  // Update editBtn id, deleteBtn id, stored post data, and DOM
  container.id = postData.title;
  container.children[0].innerHTML = `${postTitle} ${postData.date}`;
  container.children[1].innerHTML = postContent;
  storedPosts[postIdx].id = postTitle;
  storedPosts[postIdx].title = postTitle;
  storedPosts[postIdx].content = postContent;

  localStorage.setItem("postList", JSON.stringify(storedPosts));
  console.log("updated posts " + JSON.stringify(storedPosts));
}

/* Deletes the specified post from local storage and DOM */
function deletePost(event) {
  event.preventDefault();
  let postID = event.target.parentNode.id;
  let post = document.getElementById(postID);
  let editBtn = document.getElementById(`edit:${postID}`);
  let deleteBtn = document.getElementById(`delete:${postID}`);
  editBtn.removeEventListener("click", editPost);
  deleteBtn.removeEventListener("click", deletePost);
  post.remove();

  let postList = localStorage.getItem("postList");
  postList = JSON.parse(postList);
  let postIdx = postList.map((post) => post.id).indexOf(postID);
  postList.splice(postIdx, 1);
  localStorage.setItem("postList", JSON.stringify(postList));
  console.log(`Delete: ${event.target.parentNode.id}`);
}

/* Sanitize input */
function cleanInput(str) {
  let temp = document.createElement("p");
  DOMPurify.sanitize(str);
  temp.textContent = str;
  return temp.innerHTML;
}
