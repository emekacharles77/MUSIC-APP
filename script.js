const progress=document.getElementById('progress')
const song=document.getElementById('song')
const play=document.getElementById('play')
// const playicon=document.querySelector('.fa-play')
const backward=document.getElementById('backward')
const forward=document.getElementById('forward')
const title=document.querySelector('h1')
const artist=document.querySelector('p')
const image=document.querySelector('img');
const currenttime=document.querySelector('.current-time');
const durationtime=document.querySelector('.duration');
// console.log(title,artist,playicon)

const tracks=[
    {
        name:"Kabiyosi",
        artist:"Adakole William Ft. Prospa Ochimana, Chris Morgan",
        cover:"IMAGE BANK/kabiyesi image.jpg",
        source:"MUSIC BANK/Adakole-William-Ft.-Prospa-Ochimana-Chris-Morgan-Kabiyosi.mp3",
    },
    {
        name:"okemmuo",
        artist:"Chioma Jesus Ft Mercy Chinwo",
        cover:"IMAGE BANK/okemmuo cover.jpg",
        source:"MUSIC BANK/Chioma_Jesus_Ft_Mercy_Chinwo_-_Okemmuo_(Naijay.com).mp3",
    },
    {
        name:"Imela",
        artist:"Mercy Chinwo",
        cover:"IMAGE BANK/imela image.webp",
        source:"MUSIC BANK/Mercy_Chinwo_-_Imela_(Jesusful.com).mp3",
    },
    {
        name:"Onyedikagi",
        artist:"Mercy Chinwo Ft Glowrie",
        cover:"IMAGE BANK/Onyedikagi image.webp",
        source:"MUSIC BANK/Mercy_Chinwo_Ft_Glowrie_-_Onyedikagi_(Naijay.com).mp3",
    },
    {
        name:"Iba",
        artist:"Nathaniel Bassey ft Dunsin Oyekan, Dasola Akinbule",
        cover:"IMAGE BANK/iba image.jpg",
        source:"MUSIC BANK/Nathaniel_Bassey_ft_Dunsin_Oyekan_Dasola_Akinbule_-_Iba_(Jesusful.com).mp3",
    },
    {
        name:"Your Presence",
        artist:"Eunice Morgan ft Prospa Ochimana",
        cover:"IMAGE BANK/your presence image.webp",
        source:"MUSIC BANK/Eunice_Morgan_ft_Prospa_Ochimana_-_Your_Presence_(Jesusful.com).mp3",
    }
]


let audio=null,
      duration=null,
      currentTime=null,
      currentTrack=tracks[0],
      currentTrackIndex=0;

   


    //   initial state value

          audio = new Audio()
          image.src=currentTrack.cover,
          audio.src=currentTrack.source,
          title.innerText=currentTrack.name;
          artist.innerText=currentTrack.artist;
           

          forward.addEventListener("click", ()=>{
            if(currentTrackIndex < tracks.length-1){
                currentTrackIndex++;
                play.classList.remove("fa-play")
                play.classList.add("fa-pause")
                image.style.animationPlayState="paused";
                // audio.play()
            }else{
                currentTrackIndex=0;
                play.classList.add("fa-pause")

            }

            currentTrack=tracks[currentTrackIndex]
                image.src=currentTrack.cover,
                audio.src=currentTrack.source,
                title.innerText=currentTrack.name;
                artist.innerText=currentTrack.artist;
           
            setTimeout(()=>{
                if(currentTrackIndex){
                   audio.play()
                }
            }, 300)

            if(currentTrackIndex===0){
                play.classList.add("fa-play")
                play.classList.remove("fa-pause")
            }
              
        })


          backward.addEventListener("click", ()=>{
            if(currentTrackIndex > 0){
                currentTrackIndex--;
                play.classList.remove("fa-play")
                play.classList.add("fa-pause")
                
                image.style.animationPlayState="paused";
            }else{
                currentTrackIndex= tracks.length-1;
                play.classList.remove("fa-play")
                play.classList.add("fa-pause")

            }
            currentTrack=tracks[currentTrackIndex]
            image.src=currentTrack.cover,
            audio.src=currentTrack.source,
            title.innerText=currentTrack.name;
            artist.innerText=currentTrack.artist;

            setTimeout(()=>{
                if(currentTrackIndex){
                   audio.play()
                }
            }, 300)

            if(currentTrackIndex===0){
                play.classList.add("fa-play")
                play.classList.remove("fa-pause")
            }
            
        })
       

          audio.onloadedmetadata= function(){
            progress.max=audio.duration;
            progress.value=audio.currentTime;
          }

       
             play.addEventListener('click', ()=>{
        function playpause(){
            if(play.classList.contains("fa-pause")){
                audio.pause();
                play.classList.remove("fa-pause");
                play.classList.add("fa-play");
            }else{
                audio.play();
                play.classList.add("fa-pause");
                play.classList.remove("fa-play");
            }
            
        }
        playpause()
        })
        


        if(audio.play()){
            audio.pause()
            setInterval(()=>{
                let durmin=Math.floor(audio.duration/60);
                let dursec=Math.floor(audio.duration-durmin*60);
                let curmin=Math.floor(audio.currentTime/60);
                let cursec=Math.floor(audio.currentTime-curmin*60);
                
                if(durmin < 10){ 
                    durmin="0" + durmin;
                }
                if(dursec < 10) {
                    dursec="0" + dursec;
                }
                if(curmin < 10) {
                    curmin="0" + curmin;
                }
                if(cursec < 10) {
                    cursec="0" + cursec;
                }
    
                duration=durmin + ":" + dursec;
                currentTime=curmin + ":" + cursec;
                // console.log(duration, currentTime)
                durationtime.innerText= duration;
                currenttime.innerText= currentTime;
                
                progress.value=audio.currentTime;
            },1000);
            
        }

        

        progress.onchange= function(){
            audio.play();
            audio.currentTime=progress.value;
            play.classList.add("fa-pause");
            play.classList.remove("fa-play");
        }

audio.onended=function(){
    play.classList.add("fa-play")
}

audio.onpause=function(){
    image.style.animationPlayState="paused";
}

audio.onplay=function(){
    image.style.animationPlayState="running";
}


