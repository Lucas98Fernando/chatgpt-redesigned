const content = document.querySelector("#content");
const searchInput = document.querySelector("#search-input");
const initialExamples = document.querySelector(".initial-examples");
const bottomContainer = document.querySelector("#bottom-container");

// URL for text completions
// const API_URL = "https://api.openai.com/v1/completions";

const API_URL = "https://api.openai.com/v1/chat/completions";
// OpenAI API Key
const API_KEY = "";

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

searchInput.focus();

document.addEventListener("keydown", (event) => {
  if (event.code === "Enter" || event.code === "NumpadEnter") {
    render();
  }
});

function initialExamplesVisibility() {
  if (content.children.length > 0) {
    initialExamples.style.display = "none";
    content.setAttribute("class", "content-chat-active");
    bottomContainer.setAttribute("class", "bottom-container-chat-active");
  }
}

function createImage(path, className) {
  const img = document.createElement("img");
  img.setAttribute("src", path);
  img.setAttribute("class", className);

  return img;
}

function render() {
  const div = document.createElement("div");
  const text = document.createElement("div");

  text.innerText = searchInput.value;
  div.setAttribute("class", "container-question-answer question");

  const img = createImage("img/user.png", "icon-chat");

  div.appendChild(img);
  div.appendChild(text);
  content.appendChild(div);

  initialExamplesVisibility();

  fetchData();

  searchInput.value = "";
}

async function fetchData() {
  const div = document.createElement("div");
  const text = document.createElement("div");

  text.innerText = "...";
  div.setAttribute("class", "container-question-answer answer");

  const img = createImage("img/chatgpt-icon.png", "icon-chat");

  div.appendChild(img);
  div.appendChild(text);
  content.appendChild(div);

  window.scrollTo(0, document.body.scrollHeight);

  let response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: searchInput.value,
        },
      ],
    }),
    /**
     * 
     * Model to text-davinci-003
     * 
    
     body: JSON.stringify({
      model: "text-davinci-003",
      prompt: searchInput.value,
      max_tokens: 7,
      temperature: 0,
    }),

    */
  });

  const data = await response.json();

  text.innerHTML = data.choices[0].message.content;

  window.scrollTo(0, document.body.scrollHeight);
}
