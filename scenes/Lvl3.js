class Lvl3 extends Phaser.Scene {
    constructor( ) {
        super("Lvl3");
    } 

    init (){
     }

    preload( ){
        this.load.spritesheet("Lezard","assets/sprite.png" , {frameWidth: 32 , frameHeight: 32 });
        this.load.spritesheet('Shina', 'assets/sprite_perso/PNG/sprite.png',{frameWidth:32, frameHeight: 32});
        this.load.tilemapTiledJSON('Labyrinthe', 'assets/map/Labyrinthe.JSON');
        this.load.image('Map', 'assets/map/asset_test.png');
        
    }

    create( ) {
// map //
    
    const map = this.make.tilemap({ key: 'Labyrinthe' })
    const tileset = map.addTilesetImage('asset test','Map')
    
    map.createStaticLayer('sol_1', tileset)
    map.createStaticLayer('sol_2', tileset)
    map.createStaticLayer('loot', tileset)


    
    // ennemis //
     ennemis = this.physics.add.sprite(400, 800, 'Lezard');
    
    // player //
    player = this.physics.add.sprite(x, y, 'Shina');
    player.body.setSize(20,18);


    //environnements//
    
    
    
    map.createStaticLayer('tronc', tileset)
    
    map.createStaticLayer('arbres_1', tileset)
    map.createStaticLayer('arbres_2', tileset)
    
    
    map.createStaticLayer('arbres_4', tileset)
    map.createStaticLayer('arbres_3', tileset)
    map.createStaticLayer('maison', tileset)
    map.createStaticLayer('barriere_1', tileset)
    map.createStaticLayer('barriere_2', tileset)
    
    
    
    this.wallsLayer = map.createStaticLayer('invisible', tileset)
    this.sortieLayer = map.createStaticLayer('sortie_1', tileset)
    this.sortie2Layer = map.createStaticLayer('sortie_2', tileset)
    this.wallsLayer.setCollisionByExclusion(-1, true);
    this.sortieLayer.setCollisionByExclusion(-1, true);
    this.sortie2Layer.setCollisionByExclusion(-1, true);
    
    

    //bg = this.add.image(0, 0, "mainMenu").setOrigin(0, 0);        



// Physiques player //
    
    player.setBounce(0.0);
    player.setCollideWorldBounds(true);
    //this.physics.world.setBounds(0, 0, 2560, 1560);
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, 1280, 780);
    this.cameras.main.setZoom(3);

// bouton //
    cursors = this.input.keyboard.createCursorKeys();
    buttonI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I); 

// collider //
    this.physics.add.collider(player, this.wallsLayer);
    this.physics.add.collider(player, this.sortieLayer, Sortie31);
    this.physics.add.collider(player, this.sortie2Layer, Sortie34);

// Animations //
this.anims.create({
    key: 'turnL',
    frames: [ {key: 'Shina', frame: 7}],
    frameRate : 5,
    repeat : -1
});

this.anims.create({
    key: 'turnR',
    frames: [ {key: 'Shina', frame: 4}],
    frameRate : 5,
    repeat : -1
});

this.anims.create({
    key: 'turnU',
    frames: [ {key: 'Shina', frame: 10}],
    frameRate : 5,
    repeat : -1
});

this.anims.create({
    key: 'turnD',
    frames: [ {key: 'Shina', frame: 0}],
    frameRate : 5,
    repeat : -1
});

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('Shina', { start: 6, end: 8 }),
        frameRate : 10,
        repeat : -1
    });


    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('Shina', {start: 9, end: 11}),
        frameRate : 10,
        repeat : -1
    });


    this.anims.create({
        key : 'down',
        frames: this.anims.generateFrameNumbers('Shina', {start: 0, end: 2}),
        frameRate: 10,
        repeat : -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('Shina', {start: 3, end: 5}),
        framesRate: 10,
        repeat : -1
    });

    }

    update( ){


//Controles manette// 
this.input.gamepad.once('connected', function (pad){
    paddleConnected=true;
    paddle=pad;
    bg.setVisible(false);
});

if (resetCursors==true)
{
    if (paddleConnected==true)
    {
        paddle.right=false ;
        paddle.left=false ;
        paddle.up=false;
        paddle.down=false;
        paddle.A=false;
    }
    else 
    {
        cursors.right.isDown=false;
        cursors.right.isUp=true;
        cursors.left.isDown=false;
        cursors.left.isUp=true;
        cursors.down.isDown=false;
        cursors.down.isUp=true;
        cursors.up.isDown=false;
        cursors.up.isUp=true;
    }
    resetCursors=false;
}



if (paddleConnected==true){
      //Inventaire 
      if (paddle.A && lvlun==true)
      {
        lvlun=false;
            this.scene.start("Inventary");
            this.scene.pause("Lvl1");

      }
      if (paddle.A==false)
      {
        lvlun = true ;
      }
      // Bas
    if (paddle.down){
        player.setVelocityY(speed);
        player.setVelocityX(0);
        player.anims.play('down', true);
        bDown = true;

        //Diagonale 
        if (paddle.right){
            player.setVelocityX(speed);
            player.anims.play('right', true);
        }
        if (paddle.left){
            player.setVelocityX(-speed);
            player.anims.play('left', true);
        }
        }
    //Droite
    else if (paddle.right){
        player.setVelocityX(speed);
        player.setVelocityY(0);
        player.anims.play('right', true);
        bRight = true;

            //Diagonale
            if (paddle.down){
                player.setVelocityY(speed);
                player.anims.play('down', true);
            }
            if (paddle.up){
                player.setVelocityY(-speed);
                player.anims.play('up', true);
        }

        }
    //Gauche
    else if (paddle.left){
        player.setVelocityX(-speed);
        player.setVelocityY(0);
        player.anims.play('left', true);
        bLeft = true;

        //Diagonale
        if (paddle.up){
            player.setVelocityY(-speed);
            player.anims.play('up', true);
            }
        if (paddle.down){
            player.setVelocityY(speed);
            player.anims.play('down', true);
            }

            }
    //Haut
    else if (paddle.up){
        player.setVelocityY(-speed);
        player.setVelocityX(0);
        player.anims.play('up', true);
        bUp = true;

        //Diagonale
            if (paddle.right){
                player.setVelocityX(speed);
                player.anims.play('right', true);
            }
            if (paddle.left){
                player.setVelocityX(-speed);
                player.anims.play('left', true);
        }
        }
    //Arret
        else {
            player.setVelocityX(0);
            player.setVelocityY(0);
            
            if (bRight == true){
                player.anims.play('turnR')
            }
            if (bLeft == true){
                player.anims.play('turnL')
            }
            if (bUp == true){
                player.anims.play('turnU')
            }
            if (bDown == true){
                player.anims.play('turnD')
            }
            bRight = false;
            bLeft = false;
            bUp = false;
            bDown = false;
        } 
    }
//Controle Clavier 
else {
    //Inventaire 
    if (buttonI.isDown && lvlun==true)
    {
        lvlun=false;
        this.scene.start("Inventary");
        //this.scene.pause("Lvl1");
    }
    if (buttonI.isUp)
    {
        lvlun = true ;
    }
// Controle Clavier
      // Bas
      if (cursors.down.isDown){
        player.setVelocityY(speed);
        player.setVelocityX(0);
        player.anims.play('down', true);
        bDown = true;

        //Diagonale 
        if (cursors.right.isDown){
            player.setVelocityX(speed);
            player.anims.play('right', true);
        }
        if (cursors.left.isDown){
            player.setVelocityX(-speed);
            player.anims.play('left', true);
        }
        }
    //Droite
        else if (cursors.right.isDown){
        player.setVelocityX(speed);
        player.setVelocityY(0);
        player.anims.play('right', true);
        bRight = true;

        //Diagonale
        if (cursors.down.isDown){
            player.setVelocityY(speed);
            player.anims.play('down', true);
        }
        if (cursors.up.isDown){
            player.setVelocityY(-speed);
            player.anims.play('up', true);
        }

        }
    //Gauche
        else if (cursors.left.isDown){
        player.setVelocityX(-speed);
        player.setVelocityY(0);
        player.anims.play('left', true);
        bLeft = true;

        //Diagonale
        if (cursors.up.isDown){
            player.setVelocityY(-speed);
            player.anims.play('up', true);
        }
        if (cursors.down.isDown){
            player.setVelocityY(speed);
            player.anims.play('down', true);
        }

        }
    //Haut
        else if (cursors.up.isDown){    
        player.setVelocityY(-speed);
        player.setVelocityX(0);
        player.anims.play('up', true);
        bUp = true;
        //Diagonale
        if (cursors.right.isDown){
            player.setVelocityX(speed);
            player.anims.play('right', true);
        }
        if (cursors.left.isDown){
            player.setVelocityX(-speed);
            player.anims.play('left', true);
        }
        }

  //Haut
  else if (cursors.up.isDown){    
    player.setVelocityY(-speed);
    player.setVelocityX(0);
    player.anims.play('up', true);
    //Diagonale
    if (cursors.right.isDown){
        player.setVelocityX(speed);
        player.anims.play('right', true);
    }
    if (cursors.left.isDown){
        player.setVelocityX(-speed);
        player.anims.play('left', true);
    }
    }

    //Arret//
        else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        
        if (bRight == true){
            player.anims.play('turnR')
        }
        if (bLeft == true){
            player.anims.play('turnL')
        }
        if (bUp == true){
            player.anims.play('turnU')
        }
        if (bDown == true){
            player.anims.play('turnD')
        }
        bRight = false;
        bLeft = false;
        bUp = false;
        bDown = false;
        }
        if (sceneTroisUn==true){
            x = 400;
            y = 800;
            sceneTroisUn = false;
            resetCursors = true;
            this.scene.start("Lvl1");
            this.scene.pause("Lvl3");
            
        }
        if (sceneTroisQuatre==true){
            x = 20;
            y = 680;
            sceneTroisQuatre = false;
            resetCursors = true;
            this.scene.start("Lvl4");
            this.scene.pause("Lvl3");
            
        }
    }
}
}
function Sortie31() {
    sceneTroisUn = true;
}
function Sortie34() {
    sceneTroisQuatre = true;
    
}