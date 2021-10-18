var current = document.getElementById("display");
let photos = document.querySelectorAll(".pic");
function init(){
    var temp1 = document.getElementById("a1");
    temp1.style.border = "3px solid lime";
    photos.forEach((image) => {image.style.border = "0px solid";});
    current.src = document.getElementById("a1").src;
}
init();

function checkempty(a){
    var temp = document.getElementsByClassName(`a${a}`);
    if(a===0){
        init();
    }
    else if(temp.item(0)=== null){
        alert("This album have no photos");
        document.getElementById(`check${a+1}`).checked = false;
        document.getElementById("check1").checked = true;
    }
    else{
        photos.forEach((image) => {image.style.border = "0px solid";});
        current.src = document.getElementById(`a${a}`).src;
        temp.item(0).style.border = "3px solid lime";
    }

}


if(photos){
    photos.forEach((image) => {
        image.onclick = () =>{
            photos.forEach((image) => {image.style.border = "0px solid";});
            var myimg = image.getElementsByTagName('img')[0];
            /*console.log(image.style);*/
            current.src = myimg.src;
            image.style.border = "3px solid lime";
        }
    })
}