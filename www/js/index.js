const app = {
    track:[
        {
            id:1,
            source:"file:///android_asset/www/media/Amplifier.mp3",
            artist:"Imran Khan",
            song:"Amplifier",
            length:"3.51",
            path:"img/amplifier.jpg"
        },
        {
            id:2,
            source:"file:///android_asset/www/media/BA_Fail.mp3",
            artist:"Preet Harpal",
            song:"BA_Fail",
            length:"3.52",
            path:"img/bafail.jpg"
        },
        {
            id:3,
            source:"file:///android_asset/www/media/Combination.mp3",
            artist:"Amrit Maan",
            song:"Combination",
            length:"4.02",
            path:"img/combination.jpg"
        },
        {
            id:4,
            source:"file:///android_asset/www/media/Drop.mp3",
            artist:"Mehtab Virk",
            song:"Drop",
            length:"3.17",
            path:"img/drop.jpg"
        },
        {
            id:5,
            source:"file:///android_asset/www/media/Gun_Label.mp3",
            artist:"Gulrez Akhtar",
            song:"Gun_Label",
            length:"3.42",
            path:"img/gunlabel.jpeg"
        },
    ],
    currentTrack:0,
    media:null,
    stat:0,
    currentPosition:0,
    duration:0,
    
    

    status:{
        '0':'MEDIA_NONE',
        '1':'MEDIA_STARTING',
        '2':'MEDIA_RUNNING',
        '3':'MEDIA_PAUSED',
        '4':'MEDIA_STOPPED'
    },

    err:{
        '1':'MEDIA_ERR_ABORTED',
        '2':'MEDIA_ERR_NETWORK',
        '3':'MEDIA_ERR_DECODE',
        '4':'MEDIA_ERR_NONE_SUPPORTED'
    },

    init:function() {
        document.addEventListener('deviceready',app.ready,false);
    },
    
    ready:function(){
        let song = document.querySelector(".song");
        app.track.forEach(ele=>{
            let p = document.createElement("p");
            let img = document.createElement("img");
            let span = document.createElement("span");
            let spa = document.createElement("span");
            let br = document.createElement("br");
            let spatime = document.createElement("span");

            span.textContent=ele.song;
            spa.textContent=ele.artist;
            spatime.textContent=ele.length;
            img.setAttribute("src",ele.path);
            img.setAttribute("alt","image");
            img.setAttribute("class","poster");
            p.setAttribute("data-item-id",ele.id);
            p.setAttribute("class","songList");
            spatime.setAttribute("class","time");
            span.setAttribute("class","track");

            p.appendChild(img);
            p.insertAdjacentElement("beforeend",spa);
            spa.insertAdjacentElement("beforeend",spatime);
            span.insertAdjacentElement("afterend",br);
            img.insertAdjacentElement("afterend",span);
            song.appendChild(p);
        });
        app.addEventListeners();
        
    },
    get: function(){  
        console.log("get it");
    },
    notGet:function(){
        console.log("something wrong");
    },
    statusChange:function(status){
        app.stat = status;
        console.log("staus is now "+ app.status[status]);
    },
    addEventListeners:function(){
        let para = document.querySelector(".song")
        para.addEventListener("click",app.play); 
        document.querySelector(".play").addEventListener("click",app.resume);
        document.querySelector(".pause").addEventListener("click",app.pause);
        document.querySelector(".next").addEventListener("click",app.next);
        document.querySelector(".previous").addEventListener("click",app.previous);
        document.querySelector(".right").addEventListener("click",app.goForward);
        document.querySelector(".left").addEventListener("click",app.goBackward);
    },
    goForward:function(){
        
        document.getElementById("first").classList.remove("active");
        document.querySelector(".page2").classList.add("active");
        document.getElementById("first").classList.add("active2");
        document.getElementsByClassName("page2").classList.remove("active2");
        document.querySelector(".play").classList.remove("active");
        document.querySelector(".pause").classList.add("active");
    },
    goBackward:function(){
        document.querySelector(".page2").classList.remove("active");
        document.querySelector(".page1").classList.add("active");
        document.getElementById("first").classList.remove("active2");
        document.querySelector(".play").classList.remove("active");
        document.querySelector(".pause").classList.add("active");
    },
    goNext:function(){
        let currentStatus = setInterval(function(){
            if(app.stat==4){
                app.next();
            }
        },1000);
        let progressBar = document.querySelector("progress");
        var current = setInterval(function () {
            
            app.media.getCurrentPosition(
                
                function (pos) {
                    if (pos > -1) {
                        app.currentPosition = pos/60;
                        
                    }
                },
                function(err){
                    console.log(e);
                }
                
                );
                 app.duration =  app.media.getDuration();
                 let dur = app.duration/60;
                 let duration = dur.toFixed(2);
                 progressBar.setAttribute("max",duration);
                 let start = document.querySelector(".start");
                 let decimal = app.currentPosition.toFixed(2);
                 progressBar.setAttribute("value",decimal);
                start.textContent = decimal;
                let end = document.querySelector(".end");
                end.textContent=duration;


            }, 1000);

    },
    next:function(){
        app.currentTrack++;
        if(app.currentTrack > app.track.length){
            app.currentTrack=1;
        }
        let src1 = app.track.find(item=>
            item.id === app.currentTrack
            )
            let src = src1.source;
            document.querySelector(".name").textContent=src1.song;
            document.querySelector(".art").textContent=src1.artist;
            document.querySelector(".play").classList.remove("active");
        document.querySelector(".pause").classList.add("active");
        document.querySelector(".visual").classList.add("act");
            app.media.release();
            app.media=null;
            app.media = new Media(src, app.get ,app.notGet ,app.statusChange);
            app.media.play();
            
            
        },
    previous:function(){
            app.currentTrack--;
            if(app.currentTrack < 1){
                app.currentTrack=5;
            }
            let src1 = app.track.find(item=>
                item.id === app.currentTrack
                )
                let src = src1.source;
                document.querySelector(".name").textContent=src1.song;
                document.querySelector(".art").textContent=src1.artist;
                document.querySelector(".play").classList.remove("active");
        document.querySelector(".pause").classList.add("active");
        document.querySelector(".visual").classList.add("act");
                app.media.release();
                app.media=null;
                app.media = new Media(src, app.get ,app.notGet ,app.statusChange);
                app.media.play();
            },
    resume:function(){
        app.media.play();
        document.querySelector(".visual").classList.add("act");
        document.querySelector(".play").classList.remove("active");
        document.querySelector(".pause").classList.add("active");
            },
    pause:function(){
        app.media.pause();
        document.querySelector(".visual").classList.remove("act");
        document.querySelector(".pause").classList.remove("active");
        document.querySelector(".play").classList.add("active");
            },
    play:function(ev){
                ev.preventDefault();
                
                let page1 = document.querySelector(".page1")
                page1.classList.remove("active");
                page1.classList.add("active2");
                document.querySelector(".page2").classList.add("active");
                app.goNext();
                if(app.media!=null){
                    
                    app.media.release();
                    app.media = null;
                    
                        };
                let Clicked = ev.target;
                let compare = Clicked.closest('[data-item-id]');
                let id = parseInt(compare.getAttribute('data-item-id'));
                let songobj = app.track.find(identity=>
                identity.id === id);
                app.currentTrack = songobj.id;
                let src = songobj.source;
                document.querySelector(".name").textContent=songobj.song;
                document.querySelector(".art").textContent=songobj.artist;
                document.querySelector(".visual").classList.add("act");
                app.media = new Media(src, app.get ,app.notGet ,app.statusChange);
                app.media.play();
            
        }
        
        
    }
    app.init();