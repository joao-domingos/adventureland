function upgrading() {
	//limita gold
	if (character.gold < 20000000) return;
	
	// verifica se esta dando upgrade ja
	if(character.q.upgrade) return;
	if(!character.s["massproduction"]) use_skill("massproduction");
	
	let scrollUpgradeAux = locate_item("scroll1");
	let scrollUpgrade = locate_item("scroll0");
	
	if(scrollUpgrade == -1) {
		buy("scroll0", 3);
	}
	if (scrollUpgradeAux == -1) {
		buy("scroll1", 3);
	}
	
	let itemUpgrade;
	
	//items fracos, nao ligo se perder
	const normalUpgrade = ["wshoes", "wcap", "wattire", "wbreeches", "wgloves", "pants", "shoes", "glolipop"];
	let locatePants = locate_item("pants");
	let locateShoes = locate_item("shoes");
	//if (locatePants == -1 && character.esize > 0) buy("pants");
	//if (locateShoes == -1 && character.esize > 0) buy("shoes");
	
	for (let i = 0; i < normalUpgrade.length; i++) {
		if(character.q.upgrade) return;
		if(!character.s["massproduction"]) use_skill("massproduction");
		itemUpgrade = locate_item(normalUpgrade[i]);
		if (itemUpgrade !== -1 && character.items[itemUpgrade].level < 7) {
			upgrade(itemUpgrade, scrollUpgrade).then(
				function(data) {
					game_log("upgrade call completed");
				},
				function(data) {
					game_log("upgrade call failed with reason: " + data.reason);
				}
			);
			return;
		}
		else if (itemUpgrade !== -1 && character.items[itemUpgrade].level >= 7 && character.items[itemUpgrade].level < 9) {
			upgrade(itemUpgrade, scrollUpgradeAux).then(
				function(data) {
					game_log("upgrade call completed");
				},
				function(data) {
					game_log("upgrade call failed with reason: " + data.reason);
				}
			);
			return;
		}
	}
	
	//itens mais importantes, ja começa com scroll1
	const toUpgrade = ["fireblade", "firebow", "firestaff", "sshield", "quiver", "helmet1", "shoes1", "pants1", "gloves1", "coat1", "candycanesword"];
	for (let i = 0; i < toUpgrade.length; i++) {
		if(character.q.upgrade) return;
		if(!character.s["massproduction"]) use_skill("massproduction");
		itemUpgrade = locate_item(toUpgrade[i]);
		if (itemUpgrade !== -1 && character.items[itemUpgrade].level < 7) {
			upgrade(itemUpgrade, scrollUpgradeAux).then(
				function(data) {
					game_log("upgrade call completed");
				},
				function(data) {
					game_log("upgrade call failed with reason: " + data.reason);
				}
			);
			return;
		}
	}
	if (locatePants == -1 && character.esize > 0) buy("pants");
	if (locateShoes == -1 && character.esize > 0) buy("shoes");
}

function compounding() {
	const whiteList = ["intearring", "strearring", "dexearring", "wbook0", "dexamulet", "intamulet", "stramulet", "strring", "intring", "dexring"];

	if (character.gold < 20000000) return;
	if (character.q.compound) return;
	if (!character.s["massproduction"]) use_skill("massproduction");

	let scrollUpgrade0 = locate_item("cscroll0");
	if (scrollUpgrade0 === -1) buy("cscroll0", 3);

	let scrollUpgrade1 = locate_item("cscroll1");
	if (scrollUpgrade1 === -1) buy("cscroll1", 3);

	for (let i = 0; i < whiteList.length; i++) {
		let itemName = whiteList[i];
		let itemsToCompound = [];

		// Busca até 3 itens com o mesmo nome e mesmo nível
		for (let j = 0; j < character.items.length; j++) {
			let item = character.items[j];
			if (
				item &&
				item.name === itemName &&
				item.level < 3
			) {
				if (
					itemsToCompound.length === 0 ||
					item.level === character.items[itemsToCompound[0]].level
				) {
					itemsToCompound.push(j);
				}
			}

			if (itemsToCompound.length === 3) break;
		}

		// Se encontrou 3 itens com o mesmo level, faz compound
		if (itemsToCompound.length === 3) {
			let compoundLevel = character.items[itemsToCompound[0]].level;
			let scrollToUse = compoundLevel >= 2 ? scrollUpgrade1 : scrollUpgrade0;

			compound(
				itemsToCompound[0],
				itemsToCompound[1],
				itemsToCompound[2],
				scrollToUse
			).then(
				function (data) {
					game_log("compound call completed");
				},
				function (data) {
					game_log("compound call failed: " + data.reason);
				}
			);
			return; // faz um compound por chamada
		}
	}
}

function exchanging() {
	const whiteList = [""];
}