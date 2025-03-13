load_code(1);
load_code(2);
load_code(3);

load_code(20);
load_code(21);
load_code(22);
load_code(23);
load_code(24);
load_code(25);
load_code(26);
load_code(27);
load_code(28);
load_code(29);

setInterval(function(){
	
	acceptParty();
	sendGold();
	sendItem();
	sendLocationUpdate();

	if(character.hp < 1500 || character.mp < 3580)
		use_hp_or_mp();
	loot();
	
	const leader = get_player("idkhtcwarr");
	const priest = get_player("idkhtcprst");
	
	if (leader == null || leader == undefined) return;
	
	if(leader !== null) 
		move(leader.x+25, leader.y-70);
	
	if (priest.mp < 2670 && character.mp > 900) {
		if (!is_on_cooldown("energize"))  {
			use_skill("energize", "idkhtcprst", 800);
		}
	}
	
	if(leader.mp < 600 && character.mp > 2000) {
		if (!is_on_cooldown("energize")) {
			use_skill("energize", "idkhtcwarr", 450);
		}
	}
	
	if (!is_on_cooldown("energize"))  {
		use_skill("energize", "idkhtcmage", 1);
	}

	/*if(priest.hp < 2500 && character.mp > 300 && !is_on_cooldown("reflection")) {
		if (is_in_range("reflection")) use_skill("reflection", priest);
	}*/
							 				 
	let mob = get_nearest_monster({target: "idkhtcwarr"});
	if (mob !== null && mob !== undefined) {
		//if (!is_on_cooldown("burst") && character.mp > 1000) use_skill("burst", mob);
		if (can_attack(mob))
			attack(mob);
	}

},1000/4);