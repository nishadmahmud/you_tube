function removeActiveBtn() {
  const btns = document.getElementsByClassName("active");
  for (btn of btns) {
    btn.classList.remove("active");
  }
}

function loadCata() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCata(data.categories);
    });
}

function displayCata(catagories) {
  const cat = document.getElementById("catagory");

  for (let cata of catagories) {
    const catButton = document.createElement("div");

    catButton.innerHTML = `
        <button id="btn-${cata.category_id}" onclick="loadCataVid(${cata.category_id})" class="btn btn-sm bg-[#25252533] hover:bg-[#FF1F3D]">${cata.category}</button>
    `;
    cat.appendChild(catButton);
  }
}

function loadVideos(input = "") {
  showLoading();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${input}`
  )
    .then((res) => res.json())
    .then((data) => {
      removeActiveBtn();
      const all = document.getElementById("btn-all");
      all.classList.add("active");
      displayVideos(data.videos);
    })
    .catch((error) => console.error("Error fetching videos:", error));
}

function loadCataVid(id) {
    showLoading();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const clickBtn = document.getElementById(`btn-${id}`);
      removeActiveBtn();
      clickBtn.classList.add("active");
      displayVideos(data.category);
    });
}

function videoDetails(video_id) {
  console.log(video_id);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayVideoDetails(data.video);
    });
}

const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();
  const details = document.getElementById("details");

  details.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
        <figure>
            <img src="${video.thumbnail}" />
        </figure>
        <div class="card-body">
            <h2 class="card-title font-bold">${video.title}</h2>
            <p>${video.description}</p>
        </div>
    </div>
    `;
};

function displayVideos(videos) {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = ``;
  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full py-10 text-center flex flex-col justify-center items-center">
                <img src="assests/Icon.png" class="m-auto mb-4">
                <h1 class="text-3xl font-bold">Oops!! Sorry, There is no content here</h1>
            </div>
    `;
    hideLoading();
    return;
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");

    const time = video.others.posted_date;
    let postDate = "";
    if (time) {
      const hr = parseInt(time / (60 * 60));
      const mnt = time % 60;
      postDate = `${hr}hrs ${mnt}min ago`;
    }

    videoCard.innerHTML = `
        <div class="relative">
            <img src="${
              video.thumbnail
            }" class="h-[178px] w-[280px] rounded-sm mb-4 object-cover">
            <span class="absolute bottom-2 right-2 rounded-sm p-1 text-sm bg-black text-white">${postDate}</span>
        </div>
        
        <div class="flex flex-start gap-2 pl-2 pb-2">
            <img src="${
              video.authors[0].profile_picture
            }" class="w-9 h-9 rounded-full object-cover">
            <div class="">
                <h4 class="text-base font-bold">${video.title}</h4>
                <div id="author-info" class="flex gap-2 items-center">
                    <h5 class="text-sm font-normal text-[rgba(23,23,23,0.7)]">${
                      video.authors[0].profile_name
                    }</h2>
                    ${
                      video.authors[0].verified == true
                        ? `<img src="https://img.icons8.com/?size=100&id=SRJUuaAShjVD&format=png&color=000000"" class="w-4 h-4">`
                        : ``
                    }
                </div>
                <h6 class="text-sm text-[#171717B2]">${video.others.views}</h6>
            </div>
        </div>
        <button onclick="videoDetails('${
          video.video_id
        }')" class="btn btn-block">Show Details</button>
    `;

    videoCard.classList.add("rounded-sm", "bg-slate-200");

    videoContainer.append(videoCard);
  });
  hideLoading();
}

document.getElementById("search").addEventListener("keyup", (event) => {
  const input = event.target.value;
  loadVideos(input);
});

const showLoading = () => {
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
};
const hideLoading = () => {
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
};

loadCata();
loadVideos();
