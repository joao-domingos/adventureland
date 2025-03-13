// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

load_code(1);
load_code(2);
load_code(3);

setInterval(function(){
	
	//performance_trick();
	
	acceptParty();
	sendGold();
	sendItem();
	
	sendLocationUpdate();
	
	if(character.hp < 2700 || character.mp < 700)
		use_hp_or_mp();
	loot();


	/*var target=get_targeted_monster();
	if(!target)
	{
		target=get_nearest_monster({min_xp:100,max_att:120});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	if(!is_in_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}*/
	
	
	const leader = get_player("idkhtcwarr");
	if(leader !== null) 
		move(leader.x-40, leader.y+40);
	
	var targets=[];
	for(id in parent.entities)
		if(parent.entities[id].type=="monster" && is_in_range(parent.entities[id],"3shot") && targets.length<3)
			targets.push(parent.entities[id]);
	

// Use 3-Shot with a Ranger on 3 targets
	if(!is_on_cooldown("3shot"))
		use_skill("3shot",targets);
	
	set_message("farming");
	
	
	let mob = get_nearest_monster({target: "idkhtcwarr"});
	if (mob !== null && mob !== undefined) {
		if (can_attack(mob)) {
			if (!mob.s["marked"] && !is_on_cooldown("huntersmark")) {
				use_skill("huntersmark", mob);
			}
			if (!is_on_cooldown("supershot") && character.mana > 500)       {	
				use_skill("supershot", mob);
			}
			attack(mob);
		}
	}

},1000/4); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround