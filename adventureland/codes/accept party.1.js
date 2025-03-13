function acceptParty () {
	if (character.party !== "idkhtcmerch") {
		leave_party();
	}
	if (character.party == "idkhtcmerch") 
		return
	else
		accept_party_invite("idkhtcmerch");
}