const appDiv = document.getElementById('application');

var config = {
    type: Phaser.AUTO,
    width: 700, 
    height: 450,
    physics: { default: 'arcade'},
    scene: { preload, create, update }
};

var style = {
    font: "30px Arial",
    fill: "#FFFF00",
    stroke: "#123EAB",
    align: "center",
    strokeThickness: 13,
};

var game = new Phaser.Game(config);

class wrog{

    direction;
    enemy;

    constructor(){
        this.direction = 1;
        this.enemy = {};
    }

    createObject(parent, w, h, sprite, frameN){
        this.enemy = parent.physics.add.sprite(w, h, sprite, frameN);
        this.enemy.setBounce(0.2);
        this.enemy.setCollideWorldBounds(true);
        this.enemy.body.gravity.y = 450;
    }

    changeDirection(){
        this.direction *= (-1);
    }

    Collider(parent, object2, object3){
        parent.physics.add.collider(this.enemy, object2, () => {
            if(object2.y+60 > this.enemy.y) {
                object2.active = false;
                object2.disableBody(true, true);
                alert("Game over!");
                parent.scene.restart();
                score = 0;
            }
            else {
                this.enemy.active = false;
                this.enemy.disableBody(true, true);
                score+=10;
            }
        });

        parent.physics.add.collider(this.enemy, object3, () => {
            this.changeDirection();
        });
    }
}

function preload(){    //ładowanie zasobów
    //masztabirowanie nuzno
    this.load.image('background', 'img/tlo.jpeg');
    
    this.load.spritesheet('postac_gracza', 'img/kindpng_111404.png', {
        frameWidth: 107, //90,
        frameHeight: 136 //140
    })
    
    this.load.spritesheet('alien', 'img/alien-sprite-png-1.png', {
        frameWidth: 45,
        frameHeight: 49
    })

    this.load.spritesheet('platform', 'img/platforms.png', {
        frameWidth: 72,
        frameHeight: 71.5
    })

    this.load.spritesheet('coin', 'img/coin.png', {
        frameWidth: 50,
        frameHeight: 40
    })
}

var postac_gracza;
var postac_wroga1;
var postac_wroga2;
var wrogi;
var kursory;
var platforms;
var coin;
var score = 0;
var scoreText;

function create(){    //tworzenie obiektu gry
    let background = this.add.tileSprite(0,0,700,450,'background');
    background.setOrigin(0);  //ustaianie punktu
    background.setScrollFactor(0);//fixedToCamera = true;
    this.cameras.main.setBounds(0, 0, 2000, 450);
    this.physics.world.setBounds(0, 0, 2000, 450)

    postac_gracza = this.physics.add.sprite(10, 375,'postac_gracza');
    postac_gracza.setScale(0.7);
    postac_gracza.setBounce(0.2);
    postac_gracza.setCollideWorldBounds(true);
    postac_gracza.body.gravity.y = 500;
/*
    postac_wroga = this.physics.add.sprite(100, 450,'alien', 2);
    //alien.setScale(0.7);
    postac_wroga.setBounce(0.2);
    postac_wroga.setCollideWorldBounds(true);
    postac_wroga.body.bounce.set(1);
    postac_wroga.body.gravity.y = 500;
*/
    postac_wroga1 = new wrog();
    postac_wroga1.createObject(this, 100, 425, 'alien', 2);

    postac_wroga2 = new wrog();
    //postac_wroga2.enemy.body.bounce.set(1);
    postac_wroga2.createObject(this, 860, 120, 'alien', 2);

    
    //wrogi = this.physics.add.group({key: 'postac_wroga', repeat: 9 });//setXY: {x: 100, y:100, stepX: 150}});
    //wrogi.children.each(function(child) { child = new wrog();
      //  child.createObject(this, x+=100, y+=100, 'alien', 2)}, this);

    this.cameras.main.startFollow(postac_gracza);

    this.anims.create({key: 'W_prawo', frames: this.anims.generateFrameNumbers('postac_gracza', {start: 9, end: 14}), frameRate: 5, repeat: -1})
    this.anims.create({key: 'Do_gory', frames: [{key: 'postac_gracza', frame: 1 }], frameRate: 1})   //?
    this.anims.create({key: 'W_lewo', frames:  [{key: 'postac_gracza', frame: 24 }], frameRate: 10 })
    this.anims.create({key: 'Bez_ruchu', frames:  [{key: 'postac_gracza', frame: 0 }], frameRate: 10 })

    this.anims.create({key: 'W_prawo_alien', frames: this.anims.generateFrameNumbers('alien', {start: 24, end: 26}), frameRate: 2, repeat: -1})
    this.anims.create({key: 'W_lewo_alien', frames: this.anims.generateFrameNumbers('alien', {start: 12, end: 14}), frameRate: 2, repeat: -1})

    this.anims.create({key: 'coin_r', frames: this.anims.generateFrameNumbers('coin', {start: 0, end: 3}), frameRate: 3, repeat: -1})

    platforms = this.physics.add.staticGroup(); 
   
   
    platforms.create(10, 420, 'platform', 26);
    platforms.create(160, 350, 'platform', 62);
    platforms.create(210, 350, 'platform', 38);
    platforms.create(300, 300, 'platform', 26);
    platforms.create(425, 380, 'platform', 74);
    platforms.create(475, 380, 'platform', 50);
    platforms.create(440, 210, 'platform', 26);
    platforms.create(490, 210, 'platform', 26);
    platforms.create(540, 210, 'platform', 26);
    platforms.create(590, 210, 'platform', 26);
    platforms.create(670, 380, 'platform', 62);
    platforms.create(720, 380, 'platform', 38);
    platforms.create(770, 150, 'platform', 26);
    platforms.create(820, 150, 'platform', 26);
    platforms.create(870, 150, 'platform', 26);
    platforms.create(920, 150, 'platform', 26);
    platforms.create(970, 150, 'platform', 26);
    platforms.create(770, 120, 'platform', 26);
    platforms.create(970, 120, 'platform', 26);
    platforms.create(800, 320, 'platform', 26);
    platforms.create(850, 320, 'platform', 26);
    platforms.create(900, 320, 'platform', 26);
    platforms.create(1000, 380, 'platform', 26);
    platforms.create(1100, 290, 'platform', 26);
    platforms.create(1150, 290, 'platform', 26);
    platforms.create(1200, 290, 'platform', 62);
    platforms.create(1250, 290, 'platform', 38);
    platforms.create(1300, 290, 'platform', 26);
    platforms.create(1350, 290, 'platform', 26);
    platforms.create(1250, 130, 'platform', 74);
    platforms.create(1300, 130, 'platform', 50);
    platforms.create(1450, 400, 'platform', 26);
    platforms.create(1500, 400, 'platform', 26);
    platforms.create(1550, 400, 'platform', 26);
    platforms.create(1600, 400, 'platform', 26);
    platforms.create(1550, 150, 'platform', 26);
    platforms.create(1600, 150, 'platform', 26);
    platforms.create(1500, 150, 'platform', 26);
    platforms.create(1750, 300, 'platform', 74);
    platforms.create(1800, 300, 'platform', 50);
    platforms.create(1950, 200, 'platform', 26);
    platforms.create(1900, 200, 'platform', 26);
    platforms.create(1950, 150, 'platform', 57);
    platforms.create(1950, 100, 'platform', 45);

     wrogi = this.physics.add.staticGroup();
    x = 300; y=100;
     for (i = 0; i< 4; i++){
          postac_wroga = new wrog();
          postac_wroga.createObject(this, x, y, 'alien', 2);
          postac_wroga.Collider(this, postac_gracza, platforms);
          wrogi.create('postac_wroga');
          x+=400; 
      }

    platforms.getChildren().forEach(c => c.setScale(0.7).setOrigin(0).refreshBody())
    this.physics.add.collider(postac_gracza, platforms);
    
    postac_wroga1.Collider(this, postac_gracza, platforms);
    postac_wroga2.Collider(this, postac_gracza, platforms);

    kursory = this.input.keyboard.createCursorKeys();

    coin = this.physics.add.sprite(400,150, 'coin', 0);
    this.physics.add.collider(coin, platforms);
    this.physics.add.overlap(postac_gracza, coin, hit, null, this)

    function hit() {
        coin.x = Phaser.Math.Between(postac_gracza.x, postac_gracza.x+500)
        coin.y = Phaser.Math.Between(100, 400)
        score++;
    }

    this.scoreText = this.add.text(16, 16, 'Score: 0', style);
    this.scoreText.setScrollFactor(0);

}

function update(){    //metoda uruchamiana co klatkę(akt. obiektów, zmiana polozenia)

    this.scoreText.setText('Score: ' +score);

    postac_gracza.setVelocityX(150);

    if(kursory.left.isDown) {
        postac_gracza.anims.play('W_lewo', true);
        postac_gracza.setVelocityX(-150);
    }

    else if(kursory.right.isDown) {
        postac_gracza.anims.play('W_prawo', true);
        postac_gracza.setVelocityX(150);
    }

    else {
        postac_gracza.anims.play('Bez_ruchu', true);
        postac_gracza.setVelocityX(0);
    }

    if(kursory.up.isDown && (postac_gracza.body.touching.down || postac_gracza.body.onFloor())){
        postac_gracza.anims.play('Do_gory', true);
        postac_gracza.setVelocityY(-400);
    }

    else if(kursory.up.isDown && kursory.right.isDown){
        postac_gracza.anims.play('Do_gory', true);
    }

    if(kursory.down.isDown) {
        postac_gracza.setVelocityY(250);
    }


   postac_wroga1.enemy.setVelocityX(50*postac_wroga1.direction);
   
   if(postac_wroga1.direction == 1){
        postac_wroga1.enemy.anims.play('W_prawo_alien', true);
    }
    else {
        postac_wroga1.enemy.anims.play('W_lewo_alien', true);
    }

    postac_wroga2.enemy.setVelocityX(50*postac_wroga2.direction);
   
    if(postac_wroga2.direction == 1){
        postac_wroga2.enemy.anims.play('W_prawo_alien', true);
    }
    else {
        postac_wroga2.enemy.anims.play('W_lewo_alien', true);
    }

    coin.play('coin_r', true);

    if(postac_gracza.x >= 1900 && postac_gracza.y <= 200 && postac_gracza.y >= 100){
        alert("You win!" + "\nYour total score is " + score);
        this.scene.restart();
        score = 0;
    }
     
}

