(function(){
    let _id = "";
        let username = "";
        let place = "";
        $.getJSON("/api/:id").done(function(data){
                console.log(data);
                   // _id= data._id;
                if(data != ""){
                    username = data.github.username;
                    place = data.place;
                }
                /*if(username != ""){
                      let authenticated = `<h1 class="navbar-brand mb-0">Night life app</h1>
                                <span class="navbar-text" id="display-name">Welcome ${username}</span>
                                            <a class="menu" href="/profile">Profile</a>
                                            <a class="menu" href="/logout">Logout</a>`;
    
                    $(".navbar").html(authenticated);
                    console.log("auth")
                }
                else{
                        let unauthenticated=`<h1 class="navbar-brand mb-0">Night life app</h1><p>Welcome, Guest</span>!</p>
		                                      <a class="menu login" href="/login">Login</a>`;
                    $(".navbar").html(unauthenticated);
                    $(".login").click(function(e){
                        //e.preventDefault();
                        if($("#event-div").html()!= ""){
                            localStorage.setItem('template',$("#event-div").html());
                            }
                    })
                }*/
        });
    
    
    $("#s-but").click(function(e){
            $("#event-div").html("")
            $.post("/",{loc:$("#search").val()},function(data){
                console.log(data);
                if(data){
                    g = 0;
                    
                    data.forEach((el)=>{
                        let text = "going"
                        if(el.name==place) text = "delete";
                       /* let card = `<div class="card" style="width:25rem;">
                                        <img src="${el.image_url}" class="card-img-top">
                                        <div class="card-body">
                                            <h5 class="card-title" id="d${g}">${el.name}</h5>
                                            <p class="card-text">${el.location.address1}</p>
                                        </div>
                                        <div class="card-body">
                                            <button class="btn add" data-id="d${g}">${text}</button>
                                        </div>
                                    </div>`;*/
                        let card = `<div class="media mb-2">
                        <img class="mr-3" src="${el.image_url}" style="width:100px;height:100px">
                        <div class="media-body">
                          <h5 class="mt-0" id="d${g}">${el.name}</h5>
                          ${el.location.address1} ${el.location.address2}
                           <button class="btn add" data-id="d${g}">${text}</button>
                        </div>
                      </div>`
                        //let a = $('p').text(el.name);
                        $("#event-div").append(card);
                        g++;
                    })
                    main()
                }
            });
        })
    
    if(window.localStorage.getItem('template') != ""){
        $("#event-div").html(window.localStorage.getItem("template"));
        window.localStorage.setItem('template',"");
        main()
    }
    
    function main(){
         $(".add").click(function(e){
                        let a = $(this).data("id");
                        let aa = $("#"+a).text();
                        console.log(aa)
                        $.post("/api/:id/events",{place : aa})
                            
                            if(!username){
                                localStorage.setItem('template',$("#event-div").html());
                                window.location.href += "api/:id/events";
                            }
                            else{
                                let dd = $(this).text();
                                dd = dd == "going" ? "delete" : "going";
                                $(this).text(dd);
                            }
                        });

    }


})();