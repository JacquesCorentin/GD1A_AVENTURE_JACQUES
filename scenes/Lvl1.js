class Lvl1 extends Phaser.Scene {
    constructor( ) {
        super("Lvl1");
    } 

    init (){
     }

    preload( ){
        
        this.load.spritesheet('Shina', 'assets/sprite/PNG/sprite.png',{frameWidth:32, frameHeight: 32}); // sprite perso
        this.load.tilemapTiledJSON('Foret', 'assets/map/Foret.JSON'); // map en format JSON
        this.load.image('Map', 'assets/map/asset_test.png');  // assets utilisé pour la map dans tiled
        this.load.spritesheet('key', 'assets/inventaire/key.png',{frameWidth:33, frameHeight: 43}); // Objet
        this.load.spritesheet('mobs', 'assets/sprite/PNG/sprite_ennemi_1.png',{frameWidth:32, frameHeight: 32}); // sprite du monstre
        this.load.spritesheet('barreDeVie', 'assets/interface/PNG/vie.png',{frameWidth:111,frameHeight:29});  // sprite de la barre de vie
        this.load.image('petiteKey', 'assets/inventaire/loot.png'); // Loot
        this.load.image('magie', 'assets/environnement/PNG/magie.png'); // Sort magique sur le sol (projectile)
        this.load.spritesheet('projectile', 'assets/inventaire/projectile.png',{frameWidth:33, frameHeight: 43}); // projectile
        this.load.spritesheet('interfacePiece', 'assets/inventaire/sprite_piece.png',{frameWidth:40, frameHeight: 39}); // compteur de pièce
        this.load.image('piece', 'assets/inventaire/piece.png'); // Piece
        this.load.image('sort', 'assets/sprite/PNG/sprite-personnage-magie.png')
    }

    create( ) {
    // map //  
    
    const map = this.make.tilemap({ key: 'Foret' }) // on charge la map foret 
    const tileset = map.addTilesetImage('asset test','Map') // on charge les assets de la map utilisé dans Tilde
    
    map.createStaticLayer('Sol', tileset) // on crée les assets grâce au JSON
    map.createStaticLayer('Sol_2', tileset)
    map.createStaticLayer('Sol_3', tileset)
    map.createStaticLayer('loot', tileset)
    
    
    // ennemis //
    ennemis = this.physics.add.sprite(640, 340, 'mobs'); // on fait spawn l'ennemis avec une physique
    ennemis.body.setSize(20,18); // on définis une hitbox précise à l'ennemis   
    
    // player //
    player = this.physics.add.sprite(x, y, 'Shina');
    player.body.setSize(20,18);
        
    
    //arbres//
    map.createStaticLayer('deco', tileset)
    map.createStaticLayer('deco1', tileset)
    map.createStaticLayer('deco2', tileset)
    map.createStaticLayer('decors1', tileset)
    map.createStaticLayer('decors2', tileset)
    map.createStaticLayer('decors3', tileset)
    map.createStaticLayer('maison', tileset)
    
    
    this.wallsLayer = map.createStaticLayer('invisible', tileset)
    this.sortieLayer = map.createStaticLayer('sortie', tileset)
    this.sortie2Layer = map.createStaticLayer('sortie2', tileset)
    this.wallsLayer.setCollisionByExclusion(-1, true);
    this.sortieLayer.setCollisionByExclusion(-1, true);
    this.sortie2Layer.setCollisionByExclusion(-1, true);
    
    
    
    //bg = this.add.image(0, 0, "mainMenu").setOrigin(0, 0);

    
    // Inventaire //
    objet = this.physics.add.sprite(800, 285, 'key');
    objet.setScrollFactor(0,0)

    loot = this.physics.add.image(208, 66, 'petiteKey');

    projectile = this.physics.add.sprite(765, 285, 'progectile');
    projectile.setScrollFactor(0,0)

    piece = this.physics.add.sprite(725, 287, 'interfacePiece');
    piece.setScrollFactor(0,0)

    petitePiece = this.physics.add.image (400, 240, 'piece');



    // Vie //
    barreDeVie = this.physics.add.sprite(500, 280, 'barreDeVie');
    barreDeVie.setScrollFactor(0,0)

// Physiques player //
    
    player.setBounce(0.0);
    player.setCollideWorldBounds(true);
    //this.physics.world.setBounds(0, 0, 2560, 1560);
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, 1280, 780);
    this.cameras.main.setZoom(3);

// bouton //
    cursors = this.input.keyboard.createCursorKeys();
    //buttonI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    buttonA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); 

// collider //
    this.physics.add.collider(player, this.wallsLayer); //collision jouer contre les murs / environnement
    this.physics.add.collider(player, this.sortieLayer, Sortie12); //collision joueur contre une des sorties
    this.physics.add.collider(player, this.sortie2Layer, Sortie13); //  ""                            ""           
    this.physics.add.collider(player, ennemis, hitEnnemis); // collision joueur contre ennemis + application des dégats

    this.physics.add.collider(ennemis, this.wallsLayer); // collision ennemis contre les murs / environnement
    this.physics.add.collider(player, loot, collectKey); // collision joueur contre un loot + récolte le loot
    this.physics.add.collider(loot, this.wallsLayer); // collision loot contre les murs / environnement

    this.physics.add.collider(player, petitePiece, collectPiece); // collision joueur contre piece + recolte piece & compteur
    

// Tween //

    var tween = this.tweens.add({
        targets: ennemis,
        x: 790,
        y: 340,
        paused: false,
        yoyo: true,
        repeat: -1
    });



// Animations //

//Sprite sort

this.anims.create({
    key: 'sprite_sort',
    frames: [ {key : 'sort', frame: 0}],
    frameRate : 10,
    repeat : -1
});

//Objet

this.anims.create({
    key: 'piece_0',
    frames: [ {key : 'interfacePiece', frame: 0}],
    frameRate : 10,
    repeat : -1
});

this.anims.create({
    key: 'piece_1',
    frames: [ {key : 'interfacePiece', frame: 1}],
    frameRate : 10,
    repeat : -1
});

this.anims.create({
    key: 'piece_2',
    frames: [ {key : 'interfacePiece', frame: 2}],
    frameRate : 10,
    repeat : -1
});

this.anims.create({
    key: 'piece_3',
    frames: [ {key : 'interfacePiece', frame: 3}],
    frameRate : 10,
    repeat : -1
});

this.anims.create({
    key: 'piece_4',
    frames: [ {key : 'interfacePiece', frame: 4}],
    frameRate : 10,
    repeat : -1
});

this.anims.create({
    key: 'projectileOff',
    frames: [ {key : 'projectile', frame: 1}],
    frameRate : 10,
    repeat : -1
});

this.anims.create({
    key: 'cle',
    frames: [ {key : 'key', frame: 0}],
    frameRate : 10,
    repeat : -1
});

this.anims.create({
    key: 'pasDeKey',
    frames: [ {key : 'key', frame: 1}],
    frameRate : 10,
    repeat : -1
});

//Vie
this.anims.create({
    key: 'vie_3/3',
    frames: [ {key : 'barreDeVie', frame:0}],
    frameRate : 10,
    repeat : -1
});

this.anims.create({
    key: 'vie_2/3',
    frames: [ {key : 'barreDeVie', frame:1}],
    frameRate : 10,
    repeat : -1
});

this.anims.create({
    key: 'vie_1/3',
    frames: [ {key : 'barreDeVie', frame:2}],
    frameRate : 10,
    repeat : -1
});

this.anims.create({
    key: 'vie_0/3',
    frames: [ {key : 'barreDeVie', frame:3}],
    frameRate : 10,
    repeat : -1
});


//Ennemis
this.anims.create({
    key: 'lezard',
    frames: this.anims.generateFrameNumbers('mobs', {start: 0, end: 5}),
    frameRate : 3,
    repeat : -1
});

//Personnage
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

    if (actuVie == true){   // on actualise la vie sur la scène
        if (vieJoueur == 2){
            barreDeVie.anims.play("vie_2/3", true);
        }
        else if (vieJoueur == 1){
            barreDeVie.anims.play("vie_1/3", true);
        }
    }    

    if (actuPiece == true){   // on actualise les pièces sur la scène
        if (piece1 == 1){
            piece.anims.play("piece_1", true);
        }
        else if (piece1 == 2){
            piece.anims.play("piece_2", true);
        }

        else if (piece1 == 3){
            piece.anims.play("piece_3", true);
        }
        else if (piece1 == 4){
            piece.anims.play("piece_4", true);
        }
        actuPiece = false;
    }
    

    if(toucheEnnemis == true && buttonA.isDown && pasDeProjectile == true){ // permet de jouer l'animation de sort une fois tous les critère remplis
        player.anims.play("sprite_sort");
        ennemis.disableBody(true,true);
        player.setVelocityX(0);
        player.setVelocityY(0);
    }
    
    if (pasDeKey == false){  // on check si la clé a été recoltée et on joue l'animation si c'est le cas
        objet.anims.play("pasDeKey", true);
    }
    if (pasDeKey == true){
        objet.anims.play("cle", true);
    }


    if (piece1 == 0){
        piece.anims.play("piece_0",true);
    }
    if (compteur == true){
        piece1 = piece1 + 1
        if (piece1 > 4){
            piece1 = 4
        }
        if ( piece1 == 1){
            piece.anims.play('piece_1');
        }
        if ( piece1 == 2){
            piece.anims.play('piece_2');
        }

        if ( piece1 == 3){
            piece.anims.play('piece_3');
        }
    
        if ( piece1 == 4){
            piece.anims.play('piece_4');
        }
        compteur = false;
    }

    if (pasDeProjectile == false){
        projectile.anims.play("projectileOff", true);
    }
    if (pasDeProjectile == true){
        projectile.anims.play("projectileOn", true);
    }

    
    if (animMobs == true){
        ennemis.anims.play("lezard", true);
    } 


 // Barre de vie //
    if(invincible == true){
        timerInvincible = timerInvincible + 1
        if(timerInvincible >= 100){
            invincible = false
            timerInvincible = 0
        }
    }


// GameOver //
    if (gameOver)
    {

        this.physics.pause();
        return;
    }

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
        resetCursors=true;
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
   /* if (buttonI.isDown && lvlun==true)
    {
        resetCursors=true;
        lvlun=false;
        this.scene.start("Inventary");
        //this.scene.pause("Lvl1");
    }
    if (buttonI.isUp)
    {
        lvlun = true ;
    }*/
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
        if (sceneUnDeux==true){
            x = 20;
            y = 150;
            sceneUnDeux = false;
            resetCursors = true;
            actuVie = true;
            actuPiece = true;
            this.scene.start("Lvl2");
            this.scene.pause("Lvl1");
            
        }
        if (sceneUnTrois==true){
            x = 380;
            y = 10;
            sceneUnTrois = false;
            resetCursors = true;
            actuVie = true;
            actuPiece = true;
            this.scene.start("Lvl3");
            this.scene.pause("Lvl1");
        }
    }
}
}
function Sortie12() {
    sceneUnDeux = true;
}
function Sortie13() {
    sceneUnTrois = true;  
}

//Dégat par l'ennemis//
function hitEnnemis ()
{
    toucheEnnemis = true ;
    if (vieJoueur > 0 && invincible == false)
    {
        vieJoueur = vieJoueur -1;
        
    if (vieJoueur == 3){
        barreDeVie.anims.play('vie_3/3');
    
    }
    
    if (vieJoueur == 2){
        barreDeVie.anims.play('vie_2/3');
    }
    
    if (vieJoueur ==1){
        barreDeVie.anims.play('vie_1/3');
    }
    
    if (vieJoueur == 0){
        barreDeVie.anims.play('vie_0/3');
        player.setTint(0xff0000);
        gameOver = true;
    }
    }
    invincible = true;
}

function collectKey (){
    loot.disableBody(true, true);
    pasDeKey = true;
}

function collectMagie (){
    projectileAuSol.disableBody(true,true);

}

function collectPiece(){
    petitePiece.disableBody(true,true);
    compteur = true;
}
