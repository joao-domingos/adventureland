const trash = ["hpamulet", "hpbelt", "ringsj", "vitscroll", "vitearring"];


function sendGold() {
	const receiver = get_entity("idkhtcmerch");
	if (receiver && character.gold > 500000 && is_in_range(receiver)) {
		send_gold("idkhtcmerch", 500000);
	}
}

function sendItem() {
	const dontSend = ["mpot1", "hpot1", "hpot0", "mpot0", "bataxe", "pouchbow", "bowofthedead", "tracker", "ololipop", "glolipop", "gstaff", "helmet", "coat", "pants", "gloves", "shoes", "wbook0", "coat1", "helmet1", "pants1", "gloves1", "shoes1", "sshield", "candycanesword"];
	const receiver = get_entity("idkhtcmerch");
	if (!receiver || !is_in_range(receiver)) return;

	for (const slot in character.items) {
		const item = character.items[slot];
		if (item && !dontSend.includes(item.name)) {
			send_item(receiver, slot, item.q ? item.q : 1);
		}
	}
}


function selling() {
	for (let i = 0; i < 42; i++) {
		const item = character.items[i];
		if (item && trash.includes(item.name)) {
			sell(i, 1);
		}
	}
}
