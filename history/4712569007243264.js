
load_code(1);
load_code(2);
load_code(3);

load_code(21);
load_code(22);
load_code(24);
load_code(25);
load_code(28);
load_code(29);

function healing(healTarget) {
	if (healTarget && can_heal(healTarget) && is_in_range(healTarget))
		heal(healTarget);
}

var attack_mode=true

setInterval(function(){
	
	//performance_trick();
	
	acceptParty();
	sendGold();
	sendItem();
	
	sendLocationUpdate();

	if(character.mp < 3670)
		if(!is_on_cooldown("use_mp")) use_skill('use_mp');
	loot();
	
	const damDealer = get_player("idkhtcmage");
	const leader = get_player("idkhtcwarr");
	
	if (leader == null || leader == undefined) return;
	
	if(leader !== null) 
		move(leader.x-25, leader.y-70);
	
	let helpp;
    if(!helpp){
        helpp=get_nearest_monster({type: 'spider'});
        helpp
    }
    if (helpp.target !== "idkhtcwarr")
        if(can_attack(helpp)) attack(helpp);

	if(!is_on_cooldown("absorb") && character.mp > 1000) {
		if(damDealer.hp < 2500) {
			use_skill("absorb", "idkhtcmage");
			use_skill("partyheal");
		}
		/*if(leader.attack < 500) {
			use_skill("absorb", leader);
		}*/
	}

	if (character.hp < 4600) {
		use_skill("partyheal");
	}

	if (leader.hp < 9000) {
		healing(leader);
		if(leader.hp < 600) {
			use_skill("partyheal");
		}
	}

	if (character.hp < 5000 && leader.hp < 9200 && damDealer.hp < 2600) {
		use_skill("partyheal");
	}
		
	let mob = get_nearest_monster({target: "idkhtcwarr"});
	if (mob !== null && mob !== undefined) {
		if (can_attack(mob))
			attack(mob);
	}

},1000/4); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround