const merch = "idkhtcmerch";

// Function to send location updates
async function sendLocationUpdate() {
    try {
        // Check if character has mluck and if it's not from targetPlayerName
        const needsUpdate = !character.s.mluck || character.s.mluck.f !== merch;

        // Count the number of null slots in the inventory
        const nullCount = character.items.filter(item => item === null).length;

        // Send update if either condition is met
        if (needsUpdate || nullCount <= 7) {
            send_cm(merch, {
                message: "location",
                x: character.x,
                y: character.y,
                map: character.map
            });
        }
		
		if(quantity("mpot1") <= 4999)
		send_cm(merch, {
                message: "buyMp",
                x: character.x,
                y: character.y,
                map: character.map
            });
		
    } catch (error) {
        console.error("Failed to send location update:", error);
    }
}