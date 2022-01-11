const appDiv = document.getElementById('application');

var config = {
    type: Phaser.AUTO,
    width: 700, 
    height: 450,
    physics: { default: 'arcade', },
    scene: { preload, create, update }
};

var game = new Phaser.Game(config);

function preload(){    //ładowanie zasobów
    //this.load.baseURL = 'https://examples.phaser.io/assets/';
    //this.load.crossOrigin = 'anonymous';
   // this.load.image('background', 'skies/deep-space.jpg');
    //masztabirowanie nuzno
    this.load.image('background', 'img/tlo.jpeg');
    this.load.spritesheet('postac_gracza', 'img/kindpng_111404.png', {
        frameWidth: 90,
        frameHeight: 110
    })
}

var postac_gracza;

function create(){    //tworzenie obiektu gry
    let background = this.add.tileSprite(0,0,900,600,'background');
    background.setOrigin(0);  //ustaianie punktu

    postac_gracza = this.physics.add.sprite(50,100,'postac_gracza');
    postac_gracza.setCollideWorldBounds(true);
    postac_gracza.setBounce(0.2);
    postac_gracza.body.gravity.y = 500

}

function update(){    //metoda uruchamiana co klatkę(akt. obiektów, zmiana polozenia)

}