var database, dog, happyDogImg, foodStock, dogImg, foods;

function preload(){
    dogImg = loadImage("Dog.png")
    happyDogImg= loadImage("happydog.png")
}
function setup(){
    database = firebase.database()
    console.log(database)
    createCanvas(500,500);
    dog = createSprite(250,250,10,10);
    dog.addImage("dog", dogImg)
    dog.scale=0.2
    foodStock= database.ref('food');
    foodStock.on("value",readStock)
}

function draw(){
    background(46, 139, 87);
    if(keyWentDown(UP_ARROW)){
        writeStock(foods);
        dog.addImage(happyDogImg)
    }
    drawSprites();
    fill("red")
    stroke("orange")
    textSize(15)
    text("Food Remaining: "+foods, 100, 100)
    textSize(15)
    text("Press Up Arrow to Feed", 200,400)
}

function writeStock(x){
    if(x<=0){
        x=0
    }
    else{
        x=x-1
    }
    database.ref('/').update({
        food:x
    })
}
function readStock(data){
    foods=data.val()
}
