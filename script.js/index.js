const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data)
        )
};

//...........................................................................................................//
//id,, ata diye je tate click kore sai button cak kore////
 const loadLevelword = (id) =>{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelword(data.data))
 };
  
  const displayLevelword = (words) =>{
    // console.log(words);
    
        const wordcontainer = document.getElementById("word-container");
        wordcontainer.innerHTML = "";
        //faka je ta ace tar joon ata kaj kore
        if(words.length == 0){
             wordcontainer.innerHTML = `
             <div class="text-center bg-sky-100 col-span-3 py-10 rounded-xl space-y-5 font-bangla">
             <p class="text-xl font-medium text-gray-400">আপনি এখনো কোন Lesson Select করেন নি</p>
             <h2 class="font-bold text-4xl">একটি Lesson Select করুন।</h2>
             </div>
             `;
        }

        words.forEach(word => {
            console.log(word);
            const card =document.createElement("div");
            card.innerHTML = `
             <div class="bg-white rounded-2xl shadow-sm text-center py-10 px-5 space-y-4 h-full flex flex-col justify-between">
             <h2 class="font-bold text-xl"> ${word.word} </h2>
             <p class="font-semibold">Meaning /Prononuction</p>
             <div class="text-2xl font-medium  font-bangla">" ${word.meaning} / ${word.pronunciation}"</div>
             <div class="flex justify-between items-center">
             <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
             <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
             </div>
             </div> 
            
            `;

            wordcontainer.append(card);
        });
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
             <button onClick="loadLevelword (${lesson.level_no})" class="btn btn-outline btn-primary"><span><i
             class="fa-solid fa-book-open"></i></span>Lesson - ${lesson.level_no}</button>
            `
        levelcontainer.append(btndiv)
    }
}
loadLessons();