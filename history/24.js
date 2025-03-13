load_code(2);
load_code(4);

const partyLeader = "idkhtcmerch";
const partyMembers = ["idkhtcode", "idkhtcprst", "idkhtcwarr", "idkhtcmage"];

async function handleParty() {
    for (let i = 0; i < partyMembers.length; i++) {
        let member = partyMembers[i];
        if (on_party_invite("idkhtcmerch") || member.party == "idkhtcmerch") {
            return;
        } else {
            send_party_invite(member);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Pequeno delay para evitar spam
        }
    }
}

// Function to handle cm messages
function on_cm(name, data) {
	const callerId = get_player(name);
    if (partyMembers.includes(name) && data.message === "location") {
        // If not already moving, smart move to the location
        if (!smart.moving) {
            smart_move({ x: data.x, y: data.y, map: data.map });
            game_log(`Smart moving to ${name}`);
        }
		if (is_in_range(callerId, "mluck") && !is_on_cooldown("mluck") && callerId !== null) {
			use_skill("mluck", callerId);
		}
    }
	if (partyMembers.includes(name) && data.message === "buyMp") {
		if(character.x !== -35 && character.y !== -147) {
			if (!smart.moving) {
				smart_move("fancypots");
				game_log(`Smart moving to pots`);
			}
		}
		let aux2 = quantity("mpot1");
		if (aux2 < 5000)
			buy("mpot1", 5000);
        if (!smart.moving) {
            smart_move({ x: data.x, y: data.y, map: data.map });
            game_log(`Smart moving to ${name}`);
        }
		if (is_in_range(callerId, "mluck") && !is_on_cooldown("mluck") && callerId !== null) {
			use_skill("mluck", callerId);
		}
		let aux = locate_item("mpot1");
		//let quantidadeAtual = quantity("mpot1");
		send_item(name, aux, 5000);
	}
	
}

async function mainLoop() {
	
	const eu = get_entity("idkhtcmerch")
	if (is_moving(eu)) close_stand(); 
	
    use_hp_or_mp();

    let party = get_party();
    if (Object.keys(party).length < 4) {
        await handleParty(); // Agora chamando corretamente a função assíncrona
    }

	let emptySlots = character.esize
    if (emptySlots == 0 && !(smart.moving)) {
        smart_move("town");
		selling();
    }
	
	selling();
	
	if(!smart.moving && character.x !== -204 && character.y !== -129)
		smart_move("upgrade");	
	
	//await exchange(9);
	
	if (!is_moving(eu)) open_stand();
}

// Criar um loop assíncrono que roda continuamente
setInterval(() => {
    mainLoop().catch(console.error);
	upgrading();
	compounding();
}, 1000 / 4);