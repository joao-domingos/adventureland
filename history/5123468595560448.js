load_code(1);
load_code(2);
load_code(3);

load_code(21);
load_code(22);
load_code(24);
load_code(25);
load_code(28);
load_code(29);


const swapWeap = (() => {
    const swapCooldown = 750; // pequena pausa entre trocas (evita spam)
    let lastCheck = 0;

    return () => {
        const now = Date.now();
        if (now - lastCheck < swapCooldown) return;
        lastCheck = now;

        const pop1 = locate_item("ololipop");
        const pop2 = locate_item("glolipop");
        const axe = locate_item("bataxe");

        // Se condições para cleave estiverem ativas, equipa o machado
        if (character.mp > 720 && !is_on_cooldown("cleave")) {
            if (axe !== -1 && character.slots.mainhand?.name !== "bataxe") {
                unequip("mainhand");
				unequip("offhand");
                equip(axe, "mainhand");
            }
        } 
        // Caso contrário, garante que está com os lollipops
        else {
            if ((pop1 !== -1 && character.slots.mainhand?.name !== "ololipop") ||
                (pop2 !== -1 && character.slots.offhand?.name !== "glolipop")) {
                unequip("mainhand");
                equip(pop1, "mainhand");
                equip(pop2, "offhand");
            }
        }
    };
})();

const kaiting = (() => {
    let kiteIndex = 0;
    const kiteSpots = [
        { x: 930, y: -150},
        { x: 965, y: -220},
        { x: 1000, y: -150}
    ];

    let lastMoveTime = 0;
    const moveCooldown = 500;

    return () => {
        if (!character.moving && new Date().getTime() - lastMoveTime > moveCooldown) {
            const { x, y } = kiteSpots[kiteIndex];
            move(x, y);
            kiteIndex = (kiteIndex + 1) % kiteSpots.length;
            lastMoveTime = new Date().getTime();
        }
    };
})();

setInterval(function(){
	
	const receiver = get_entity("idkhtcmerch");
	const priest = get_player("idkhtcprst");
	
	acceptParty();
	sendGold();
	sendItem();
	
	sendLocationUpdate();
	
	if(character.mp < 740)
		if(!is_on_cooldown("use_mp")) use_skill('use_mp');

	loot();
	
	/*if(character.hp < 7000 && character.mp > 480) {
		if (!is_on_cooldown("hardshell")) use_skill("hardshell");
	}*/
	
	kaiting();
	swapWeap();
	
	if (priest == null || priest == undefined) return;
	
	let helpp;
    if(!helpp){
        helpp=get_nearest_monster({type: 'spider'});
        helpp
    }
    if (helpp.target !== "idkhtcwarr")
        use_skill('taunt', helpp)

	//var target=get_targeted_monster();
	var target;
	if(!target)
	{
		target=get_nearest_monster({type: "spider"});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	
	if(!is_in_range(target))
	{
		if (!is_on_cooldown("charge"))
			use_skill("charge")
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}
	else {
		if(!is_on_cooldown("cleave") && character.mp > 721) {
			use_skill("cleave");
		}
	}
	
	if(!is_on_cooldown("cleave") && character.mp > 1000) {
		use_skill("cleave");
	}
	
},1000/4); // Loops every 1/4 seconds.