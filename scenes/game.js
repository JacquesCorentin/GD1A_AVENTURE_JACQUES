var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 780,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug:false
        }
    },
    scene: [Menu, Lvl1, Lvl2, Lvl3, Lvl4, Inventary],
    input:{gamepad:true}
};

var game = new Phaser.Game(config);
var cursors;

var space;
var xAxis;
var yAxis;
var paddleConnected = false;
var paddle;
var lvlun = true;
var inventaire = true;
var buttonI;
var bg;
var resetCursors = false;

//scenes//
//scene1
var sceneUnDeux = false;
var sceneUnTrois = false;


//scene2
var sceneDeuxUn = false;
var sceneDeuxQuatre = false;

//scene3
var sceneTroisUn = false;
var sceneTroisQuatre = false;

//scene4
var sceneQuatreTrois = false;
var sceneQuatreDeux = false;

var x = 400;
var y = 740;

//reset//
var bRight = false;
var bLeft = false;
var bUp = true;
var bDown = false;

var actuVie = false; // permet d'actualiser la vie sur les  scènes

//player//
var player;
var speed = 300;
var vieJoueur = 3;
var barreDeVie;
var hit = true;

//invincibilité
var invincible = false;
var timerInvincible = 0;

//ennemis//
var ennemis;
var ennemi;
var animMobs = true;
var vieEnnemis = 3;

// Objet //
var objet;
var loot;
var pasDeKey = false;

// Porte //
var porte;
var porte1;
var porte2 = false;

// Projectile //
var projectile;
var projectileAuSol;
var pasDeProjectile = false;

// Pièce //
var piece;
var piece1;
var piece2 = false;

// GameOver //
var gameOver = false;


