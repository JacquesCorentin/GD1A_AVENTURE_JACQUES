class Inventary extends Phaser.Scene {
    constructor( ) {
        super("Inventary");
    }
    init ( ){};

    preload(){
        this.load.image('inv', 'assets/inv.jpg',);
    
    }

    create( ) {

    bg = this.add.image(0, 0, "inv").setOrigin(0, 0);     
    


// bouton //
    cursors = this.input.keyboard.createCursorKeys();
    buttonI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);


    }
    update( ){


//Controles // 

this.input.gamepad.once('connected', function (pad){
    paddleConnected=true;
    paddle=pad;
    bg.setVisible(false);
});

if (paddleConnected==true){
      //Inventaire 
      if (paddle.A && inventaire==true)
      {
        inventaire=false;
            this.scene.start("Lvl1");
            this.scene.pause("Inventary");

      }
      if (paddle.A==false)
      {
          inventaire = true ;
      }}
//Controle Clavier 
else {
    //Inventaire 
    if (buttonI.isDown && inventaire==true)
    {
        inventaire=false;
        this.scene.start("Lvl1");
        this.scene.pause("Inventary");
    }
    if (buttonI.isUp)
    {
        inventaire = true ;
    }

}}}
