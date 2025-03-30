console.log("JavaScript is running!");
document.addEventListener("DOMContentLoaded", () => {
    new Game(); // Ensure Game class initializes after DOM is ready
    console.log("Game initialized!");
});

const sound = new Howl({
    src: ['https://assets.codepen.io/21542/howler-push.mp3', 'sounds.mp3'],
    sprite: {
        blast: [0, 3000],
        laser: [4000, 1000],
        winner: [6000, 5000]
    }
});

class Player {
    constructor() {
        const saveData = JSON.parse(localStorage.getItem("saveData"));
        if(saveData) {
            this.xp = saveData.xp;
            this.health = saveData.health;
            this.gold = saveData.gold;
            this.inventory = saveData.inventory;
            this.currentWeapon = saveData.currentWeapon


        }
        else {
            this.xp = 0;
            this.health = 100;
            this.gold = 20;
            this.inventory = ['Stick'];
            this.currentWeapon = 0;
        }
    }
save(){
        localStorage.setItem("saveData", JSON.stringify(this));
        Game.instance.updateUI()

    }
    attack(monster){
            Game.instance.textElement.innerText = "You attack it with your " + Game.weapons[this.currentWeapon].name + "."

            console.log("Current Weapon Index:", this.currentWeapon);
            console.log("Available Weapons:", Game.weapons);

            let weapon = Game.weapons[this.currentWeapon];
            if (!weapon) {
                console.error("Invalid weapon index! Check inventory or game state.");
                return;
            }

            let weaponPower = weapon.power;
            let damage = weaponPower + Math.floor(Math.random() * this.xp) + 1;
            if(Game.instance.isMonsterhit()) {
                monster.takeDamage(damage);
                Game.instance.showMessage("You've dealed " + damage +" to " +Game.weapons[this.currentWeapon].name)
            }
            else{
                this.health -= monster.getAttackValue();
                if(this.health <=0){
                    Game.instance.lose()
                }
            Game.instance.initMonsterUI()
            if(monster.health <=0){
           Game.instance.defeatMonster();
        }

        }
        this.save()
    }
    buyHealth(){
        sound.play("laser")
            // console.log(sound)
        if(this.gold>=11){
            this.gold-=11
            this.health +=10
            this.save()

            Game.instance.showMessage("Great, now you have 10 health extra")
        }
        else {
            Game.instance.showMessage("Not enough gold pal")
        }
    }
    buyWeapon(){
        if(this.gold>=30){
            this.gold-=30;
            this.currentWeapon++
            this.inventory.push(Game.weapons[this.currentWeapon].name)
            Game.instance.showMessage("Enjoy you little toy ")
            this.save()
        }
        else{
            Game.instance.showMessage("Not enough gold bruv")
        }

}


}
class Monster {
    constructor(name, level,health) {
        this.name = name;
        this.level = level;
        this.health = health;
    }
    takeDamage(damage){
        this.health -= damage;
    }
    getAttackValue(){
        return (this.level*3) - (Math.floor(Math.random()*10));
    }

}
class Game {
    static weapons = [
        {
            name: "Stick",
            power: 6

        },
        {
            name: "Bow",
            power: 10
        },
        {
            name: "Hammer",
            power: 55
        },
        {
            name: "Sword",
            power: 101
        }
    ];

    static monsters = [
        {
            name: "Slime",
            level: 2,
            health: 16,
            sceneUrl:"Images/Slime.jpeg"
        },
        {
            name: "Giant Spider",
            level: 6,
            health:60,
            sceneUrl:"Images/GiantSpider.jpeg"

        },
        {
            name: "Dragon",
            level: 10,
            health: 400,
            sceneUrl:"Images/Dragon.jpeg"

        }

    ];

    constructor() {
        this.player = new Player();
        this.fightMonster = null;
        Game.instance = this
        this.initUi();
        this.loadGameState()

    }
    initUi(){
        this.textElement = document.querySelector("#text")
        this.button1 = document.querySelector("#button1")
        this.button2 = document.querySelector("#button2")
        this.button3 = document.querySelector("#button3")

        this.xpText = document.querySelector("#xpText")
        this.healthText = document.querySelector("#healthText")
        this.goldText = document.querySelector("#goldText")

        this.monsterStats = document.querySelector("#monsterStats")
        this.monsterNameText = document.querySelector("#monsterName")
        this.monsterHealthText = document.querySelector("#monsterHealth")
        this.monsterLevel = document.querySelector("#monsterLevel")

        document.body.style.backgroundImage = "url(Images/loading.gif)"
          document.body.style.backgroundPositionY = "center"
        document.body.style.backgroundPositionX = "center"
        setTimeout(()=>{
        this.goTown()
        },5000)
    }



    loadGameState(){
    this.reset()
    this.updateUI()


    }

    reset(){
        let resetButton = document.getElementById("reset");
        resetButton.onclick = ()=>{
            this.player.xp = 0
            this.player.health = 100
            this.player.gold = 20
            this.player.save()
            window.location.reload()
        }

    }

    updateUI(){
        this.xpText.innerText = this.player.xp
        this.healthText.innerText = this.player.health
        this.goldText.innerText = this.player.gold



        }
    updateScene(title, text, buttonsText, buttonsFunctions,sceneUrl) {

        console.log("updateScene called with:", { title, text, buttonsText, buttonsFunctions });

        if (!Array.isArray(buttonsFunctions) || buttonsFunctions.length === 0) {
            console.error("🚨    ERROR: buttonsFunctions is not a valid array!", buttonsFunctions);
            return;
        }

        this.textElement.innerText = text;
        [this.button1, this.button2, this.button3].forEach((button, index) => {
            button.innerText = buttonsText[index];
            button.onclick = () => buttonsFunctions[index](); // Call the corresponding function
        });
        document.body.style.backgroundImage = `url(${sceneUrl})`
        document.body.style.backgroundRepeat = "no-repeat"
        document.body.style.backgroundColor = "black"
    }

    goTown(){
        document.body.style.backgroundImage = "url(Images/loading.gif)"
        // document.body.style.backgroundRepeat = "no-repeat"
        document.body.style.backgroundPositionY = "center"
        document.body.style.backgroundPositionX = "center"

            this.monsterStats.style.display = "none"

        setTimeout(()=>{

            this.updateScene("Town Square",
                "You're in Town Square. You see a sign that says \"Store\".",
                ["Go to store","Go to cave","Fight Dragon"], Array.from([
                    () => this.goStore(),
                    () => this.goCave(),
                    () => this.fight(2)
                ]),"Images/TownSquare.jpeg"

            )
        },1500)


    }
    isMonsterhit(){
        return Math.random > .2 || this.player.health < 40
    }

    goStore(){
        this.updateScene("Store","You entered the store",
            ["Want to buy 10 health (11 gold)","Want to buy a weapon (30 gold)", "Leave"],
            [()=>this.player.buyHealth(),()=> this.player.buyWeapon(),()=>this.goTown()],"Images/Store.jpeg")

    }
    goCave(){
        this.updateScene("Cave",
            "You see some monsters",
            ["Fight slime","Fight Giant Spider","Go to Town Square"],
            [()=>this.fight(0),()=> this.fight(1),()=>this.goTown()],"Images/Cave.jpeg")
    }
    fight(monsterIndex){
        this.fightMonster = new Monster(
            Game.monsters[monsterIndex].name,
            Game.monsters[monsterIndex].level,
            Game.monsters[monsterIndex].health,
        )
        this.updateScene("Fight", `You are fighting a ${this.fightMonster.name}.`,
            ["Attack", "Dodge", "Escape"],
            [()=>this.attack(),()=>this.dodge(),
                ()=>this.goTown()],
            Game.monsters[monsterIndex].sceneUrl)
        this.initMonsterUI()
    }
    initMonsterUI(){
        this.monsterStats.style.display = "block"
        this.monsterNameText.innerText = this.fightMonster.name
        this.monsterLevel.innerText = this.fightMonster.level
        this.monsterHealthText.innerText = this.fightMonster.health
    }
    attack() {

        this.player.attack(this.fightMonster);



        this.updateUI();

        if (this.fightMonster.health <= 0) {
            this.defeatMonster();
        }
    }
    showMessage(message) {
        this.textElement.innerText = message;
    }
    dodge() {
        // Implement dodge behavior here
        this.showMessage("You dodged the attack!");
        // Possibly update the game state or call this.goTown() afterward
    }
    lose() {
        this.showMessage("You have been defeated. Game Over.");

        // Reset player stats
        localStorage.removeItem("saveData");
        this.player = new Player();
        this.goTown();
    }
    defeatMonster() {
        this.player.xp += 10;
        this.player.gold += 20;
        this.showMessage(`You defeated ${this.fightMonster.name}! You earned 10 XP and 20 gold.`);

        this.player.save();
        this.goTown(); // Go back to town after the fight
    }



}
var sfx = {
    push: new Howl({
        src: ''
    })
}







