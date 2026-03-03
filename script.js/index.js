const createElements = (arr) => {
    const htmlElement = arr.map(el => ` <span class="btn">${el}</span>`)
    return htmlElement.join(" ");

};


const managespinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}




//.....................................................................

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data)
        )
};


const removeActive = () => {
    const lessonbtn = document.querySelectorAll(".lesson-btn");
    lessonbtn.forEach(btn => btn.classList.remove("active"));

}
//...........................................................................................................//
//id,, ata diye je tate click kore sai button cak kore////
const loadLevelword = (id) => {
    managespinner(true);
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive(); ///remove all active class
            const clickbtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickbtn);
            clickbtn.classList.add("active");
            displayLevelword(data.data)
        })
};


const loadworddetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayworlddetals(details.data);
};

const displayworlddetals = (word) => {
    console.log(word);
    const detailsbox = document.getElementById("details-container");
    detailsbox.innerHTML = `
     <div>
            <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
         </div>     
         <div>
            <h2 class=" font-bold">${word.meaning}</h2>
            <p>আগ্রহী</p>
         </div>     
         <div>
            <h2 class=" font-bold">Example</h2>
            <p>${word.sentence}</p>
         </div>     
         <div>
            <h2 class=" font-bold">Synonm</h2>
             <div class= ""> ${createElements(word.synonyms)} </div> 
        

         </div>   
    
    
    
    `;
    document.getElementById("word_modal").showModal();
}
//........................................................
const displayLevelword = (words) => {
    // console.log(words);

    const wordcontainer = document.getElementById("word-container");
    wordcontainer.innerHTML = "";
    //faka je ta ace tar joon ata kaj kore
    if (words.length == 0) {
        wordcontainer.innerHTML = `
              
             <div class="text-center  col-span-3 py-10 rounded-xl space-y-5 font-bangla">
              <img src="./assets/alert-error.png" alt="" class="mx-auto">
             <p class="text-xl font-medium text-gray-400">আপনি এখনো কোন Lesson Select করেন নি</p>
             <h2 class="font-bold text-4xl">একটি Lesson Select করুন।</h2>
             </div>
             `;
        managespinner(false)
        //  return;
    }

    words.forEach(word => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
             <div class="bg-white rounded-2xl shadow-sm text-center py-10 px-5 space-y-4 h-full flex flex-col justify-between">
             <h2 class="font-bold text-xl"> ${word.word ? word.word : "শব্দ পাওয়া যায়নি"} </h2>
             <p class="font-semibold">Meaning /Prononuction</p>
             <div class="text-2xl font-medium  font-bangla">" ${word.meaning ? word.meaning : "শব্দ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "শব্দ পাওয়া যায়নি"}"</div>
             <div onclick="loadworddetail(${word.id})" class="flex justify-between items-center">
             <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
             <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
             </div>
             </div> 
            
            `;

        wordcontainer.append(card);
    });
    managespinner(false);
};

//.........................................................................................................................//


////ai section holo butto dainamick... vabe kaj kore ....
const displayLesson = (lessons) => {
    //get the container 
    const levelcontainer = document.getElementById('level-container');
    levelcontainer.innerHTML = "";
    for (let lesson of lessons) {
        // console.log(lesson);

        const btndiv = document.createElement("div");  ///onclick button akhane add kora ace .... click korle kaj   kore///
        btndiv.innerHTML = `                  
             <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelword (${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn "><span><i
             class="fa-solid fa-book-open"></i></span>Lesson - ${lesson.level_no}</button>
            `
        levelcontainer.append(btndiv)
    }
}
loadLessons();

/////,,,,,,,,,,,,,,,,,,,,,

document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("input-search");
    const searchvalue = input.value.trim().toLowerCase();
    console.log(searchvalue);

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then((res) => res.json())
        .then((data) => {
            const allworlds = data.data;
            console.log(allworlds);
            const filterworlds = allworlds.filter((word) => word.word.toLowerCase().includes(searchvalue));
            displayLevelword(filterworlds);
        });



})