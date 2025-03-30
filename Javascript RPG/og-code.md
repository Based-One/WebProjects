//  gameState ={
//     player: {
//         xp: 0,
//         health: 100,
//         gold: 52,
//         inventory: ['stick'],
//         currentWeapon: 0
//     },
//     monsters:[
//         {
//             name: "Slime",
//             level: 2,
//             health: 16
//         },
//         {
//             name: "Gigant Spider",
//             level: 6,
//             health:60
//
//         },
//         {
//             name: "Dragon",
//             level: 10,
//             health: 400
//
//         }
//
//     ],
//     weapons: [
//         {
//             name: "Stick",
//             power: 6
//
//         },
//         {
//             name: "Bow",
//             power: 10
//         },
//         {
//             name: "Hammer",
//             power: 55
//         },
//         {
//             name: "Sword",
//             power: 101
//         }
//     ],
//     locations: [
//         {
//             name: "town Square",
//             buttons: [goStore, goCave, fightDragon],
//             text: "You're in Town Square. You see a sign that says \"Store\"."
//         },
//         {
//             name: "store",
//             "button text": ["Want to buy 10 health (11 gold)", "Want to buy a weapon (30)", "Go to town square"],
//             "button functions": [buyHealth, buyWeapon, goTown],
//             text: "You enter the store"
//         },
//         {
//             name: "cave",
//             "button text": ["Fight slime", "Fight giant spider", "Go to town square"],
//             "button functions": [fightSlime, fightGiantSpider, goTown],
//             text: "You see some monsters"
//         },
//         {
//             name: "fight",
//             "button text": ["Attack", "Dodge", "Escape"],
//             "button functions": [attack, dodge, goTown],
//             text: "*Fighting*"
//         }, {
//             name: "killed monster",
//             "button text": ["Go to Town Square"],
//             "button functions": [goTown,],
//             text: 'The monster screams "Argg!". You gain experience and find some gold'
//         },
//         {
//             name: "You lose",
//             "button text": ["Restart", "Go Town Square"],
//             "button functions": [replay, goTown],
//             text: 'You die 💀'
//         }, {
//             name: "Win",
//             "button text": ["REPLAY?", "REPLAY?"],
//             "button functions": [replay, replay],
//             text: 'You defeat the dragon!!! YOU WIN THE GAME!!🎈🎉'
//         },
//         {
//             name: "easter egg",
//             "button text": ["2", "8", "Go to town square?"],
//             "button functions": [pickTwo, pickEight, goTown],
//             text: 'You discovered an easterEgg, choose a number and try your luck'
//         }
//
//     ],
// currentLocation:'town Square',
// Fighting: null ,
//
//
// }
//
//
// const button1 = document.querySelector("#button1");
// const button2 = document.querySelector("#button2");
// const button3 = document.querySelector("#button3")
// const text = document.querySelector("#text");
// const xpText = document.querySelector("#xpText");
// const healthText = document.querySelector("#healthText");
// const goldText = document.querySelector("#goldText");
// const monsterStats = document.querySelector("#monsterStats");
// const monsterNameText = document.querySelector("#monsterName");
// const monsterHealthText = document.querySelector("#monsterHealth");
//
//
//
//
// function update(location) {
//     monsterStats.style.display = "none";
//     button1.innerText = location["button text"][0];
//     button2.innerText = location["button text"][1];
//     button3.innerText = location["button text"][2];
//     button1.onclick = location["button functions"][0];
//     button2.onclick = location["button functions"][1];
//     button3.onclick = location["button functions"][2];
//     text.innerText = location.text;
//
// }
//
// function goTown() {
//     update(locations[0]);
// document.body.style.backgroundImage = "url(Images/Town.png)"
// }
//
// function goStore() {
//     update(locations[1]);
//     document.body.style.backgroundColor = "black"
//     document.body.style.backgroundImage = "url(Images/Store.png)"
//     document.body.style.backgroundSize = "cover"
//     document.body.style.backgroundRepeat = "no-repeat";
//
// }
// function goCave() {
//     update(locations[2])
//     document.body.style.backgroundImage = "url(Images/Cave.gif)";
//     document.body.style.backgroundRepeat = "repeat-y";
// }
//
//
// function buyHealth() {
//     if (gold >= 11) {
//         gold -= 11;
//         health += 11;
//
//         goldText.innerText = gold;
//         healthText.innerText = health;
//
//     } else {
//         text.innerText = "Go get more gold, you do not have enough"
//     }
//
// }
// function buyWeapon() {
//     if (currentWeapon < weapons.length - 1) {
//         if (gold >= 30) {
//             gold -= 30;
//             currentWeapon++;
//             goldText.innerText = gold;
//             let newWeapon = weapons[currentWeapon].name;
//             text.innerText = " You now have a " + newWeapon + ", use it wisely.";
//             inventory.push(newWeapon);
//             text.innerText += " In your inventory you have: " + inventory.join(", ");
//
//
//         } else {
//             text.innerText = "Sorry, there is not enough gold.";
//         }
//     } else {
//         text.innerText = "You already have the most powerful weapon!";
//         button2.innerText = "Sell weapon for 16 gold";
//         button2.onclick = sellWeapon;
//     }
// }
//
//
// function sellWeapon() {
//     if (inventory.length > 1) {
//         gold += 15;
//         goldText.innerText = gold;
//         let currentWeapon = inventory.shift();
//         text.innerText = "You sold a " + currentWeapon + ".";
//         text.innerText += " In your inventory you have: " + inventory.join(", ");
//     }
//     else {
//         text.innerText = "Do not sell your only weapon";
//     }
// }
// function fightSlime() {
//     fighting = 0;
//     goFight();
//
// }
// function fightGiantSpider() {
//     fighting = 1;
//     goFight();
//
// }
// function fightDragon() {
//     fighting = 2;
//     goFight();
// }
// function goFight() {
//     update(locations[3]);
//     monsterHealth = monsters[fighting].health;
//     monsterStats.style.display = "block";
//     monsterNameText.innerText = monsters[fighting].name;
//     monsterHealthText.innerText = monsterHealth;
//
// }
// function attack() {
//     text.innerText = "The " + monsters[fighting].name + " attacks.";
//     text.innerText = "You attack it with your " + weapons[currentWeapon].name + ".";
//     if (isMonsterHit()) {
//         health -= getMonsterAttackValue(monsters[fighting].level);
//
//     } else {
//         text.innerText += " How do you miss that?"
//     }
//     health -= getMonsterAttackValue(monsters[fighting].level);
//     monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;;
//     healthText.innerText = health;
//     monsterHealthText.innerText = monsterHealth;
//     if (health <= 0) {
//         lose();
//     }
//     else if (monsterHealth <= 0) {
//         fighting === 2 ? winGame() : defeatMonster();
//     }
//     if (Math.random() <= .1 && inventory.length !== 1) {
//         text.innerText += " Your " + inventory.pop() + " breaks.";
//         currentWeapon--;
//     }
// }
// function getMonsterAttackValue(level) {
//     let hit = (level * 3) - (Math.floor(Math.random() * xp));
//     console.log(hit);
//     return hit;
// }
// function isMonsterHit() {
//     return Math.random() > .2 || health < 40;
//
// }
// function dodge() {
//     text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
// }
// function defeatMonster() {
//     gold += Math.floor(monsters[fighting].level * 7.1);
//     xp += monsters[fighting].level
//     goldText.innerText = gold;
//     xpText.innerText = xp;
//     update(locations[4])
// }
//
//
// function lose() {
//     update(locations[5]);
//
// }
// function winGame() {
//     update(locations[6]);
// }
// function replay() {
//     xp = 0;
//     health = 100;
//     gold = 50;
//     currentWeapon = 0;
//     inventory = ["stick"];
//     goldText.innerText = gold;
//     healthText.innetText = health;
//     xpText.innerText = xp;
//     goTown()
// }
// function easterEgg() {
//     update(locations[7]);
// }
//
// function pickTwo() {
//     pick(2);
// }
//
// function pickEight() {
//     pick(8)
// }
//
// function pick(guess) {
//     let numbers = [];
//     while (numbers.lenght < 10) {
//         numbers.puch(math.floor(math.random() * 11));
//
//     }
//     text.innerText = 'You picked ' + guess + '. Here are the random numbers:\n';
//
//     for (let i = 0; i < 10; i++) {
//         text.innerText += numbers[i] + "\n";
//
//     }
//
// }
//

