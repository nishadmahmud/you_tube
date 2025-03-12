function loadCata() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCata(data.categories);
    });
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.error("Error fetching videos:", error));
}

function displayCata(catagories) {
  const cat = document.getElementById("catagory");

  for (let cata of catagories) {
    const catButton = document.createElement("button");
    catButton.innerText = cata.category;
    catButton.classList.add(
      "btn",
      "btn-sm",
      "bg-[#25252533]",
      "hover:bg-[#FF1F3D]"
    );
    cat.appendChild(catButton);
  }
}

function displayVideos(videos) {
  const videoContainer = document.getElementById("video-container");

  videos.forEach((video) => {
    const videoCard = document.createElement('div');

    const time = video.others.posted_date;
    let postDate = "";
    if(time){
        const hr = parseInt(time / (60*60));
        const mnt = time % 60;
        postDate = `${hr}hrs ${mnt}min ago`;
    }
    
    videoCard.innerHTML = `
        <div class="relative">
            <img src="${video.thumbnail}" class="h-[178px] w-[280px] rounded-sm mb-4 object-cover">
            <span class="absolute bottom-2 right-2 rounded-sm p-1 text-sm bg-black text-white">${postDate}</span>
        </div>
        
        <div class="flex flex-start gap-2 pl-2 pb-2">
            <img src="${video.authors[0].profile_picture}" class="w-9 h-9 rounded-full object-cover">
            <div class="">
                <h4 class="text-base font-bold">${video.title}</h4>
                <h5 class="text-sm font-normal text-[#171717B2]">${video.authors[0].profile_name}</h2>
                <h6 class="text-sm text-[#171717B2]">${video.others.views}</h6>
            </div>
        </div>
    `;

    videoCard.classList.add('rounded-sm','bg-slate-200')

    videoContainer.append(videoCard);
  });
}

loadCata();
loadVideos();
