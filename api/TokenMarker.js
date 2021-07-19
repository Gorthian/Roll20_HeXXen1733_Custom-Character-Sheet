/* 
	EDITED by 			Gorthian
	Version				3.0
	Letzte Änderung		2021-06-06
	
	GitHub				https://github.com/Gorthian/HeXXen1733_Custom_Character_Sheet
	Wiki				https://github.com/Gorthian/HeXXen1733_Custom_Character_Sheet/wiki
	Bugs & Issues		https://github.com/Gorthian/HeXXen1733_Custom_Character_Sheet/issues
	
	Dieses API-Skript zeigt Einflüsse und die aktuellen Puffer-LeP als Token Marker an
*/

/*
 * KONFIGURATION
 *
 * Um andere Token Marker zu verwenden genügt es in den folgenden Zeilen den entsprechenden Namen der Marker zu ändern.
 * Den Namen einzelner Marker kann man ablesen indem in Roll20 mit der Maus über den gewünschten Marker fährt.
 * Dem Namen muss dann noch ein "status_" vorangestellt werden.
 *
 * Möchte man eigene Marker verwenden muss man sich nach Einfügen dieses Skripts im Chat über den Befehl !markernames alle Marker auflisten lassen, und sich ID und Namen des gewünschten Markers notieren.
 * Dieser muss dann in der Form ID::Name hier im Skript eingetragen werden.
*/

/* Puffer LeP */		var healthBuffer = "status_green";
/* Äußerer Schaden */	var externalDamage = "status_arrowed";
/* Innerer Schaden */	var internalDamage = "status_drink-me";
/* Malusstufen */		var malus = "status_broken-skull";
/* Lähmung */			var paralysis = "status_snail";

function setMarker(tokens, status, value) {
    for (let i = 0; i < tokens.length; i++) {
        tokens[i].set(status,value);
        if (value == 0) {
            tokens[i].set(status,false);    
        }
    }
}

on("change:attribute", function(obj) {
    var attr = obj.get("name");
    var value = parseInt(obj.get("current"));
    var tokens = findObjs({type:'graphic', represents: obj.get("_characterid")});

    if (attr == "HealthBufferMod") {
        setMarker(tokens,healthBuffer,parseInt(value))
    }
    
    if (attr == "influenceExternalDamageLevel") {
        setMarker(tokens,externalDamage,value)
    }
    
    if (attr == "influenceInternalDamageLevel") {
        setMarker(tokens,internalDamage,value)
    }
    
    if (attr == "influenceMalusLevel") {
        setMarker(tokens,malus,value)
    }
    
    if (attr == "influenceParalysisLevel") {
        setMarker(tokens,paralysis,value)
    }
});

/* Standardfunktionen der API-Skript
 * Siehe: https://wiki.roll20.net/API:Token_Markers
 */
on("ready", () => {
    const tokenMarkers = JSON.parse(Campaign().get("token_markers"));
    const getChatMessageFromTokenMarkers = markers => {
        let chatMessage = '';
        _.each(markers, marker => {
            chatMessage += `<p><img src='${marker.url}'> ${marker.id}: ${marker.name}</p>`;
        });
        return chatMessage;
    };
on("chat:message", msg => {
        if(msg.content.split(" ")[0].toLowerCase() === '!markernames') {
            let chatMessage = getChatMessageFromTokenMarkers(tokenMarkers);
            sendChat("Token Markers", chatMessage);
        } else if(msg.content.split(" ")[0].toLowerCase() === '!markerids') {
            const markerName = msg.content.split(" ")[1].toLowerCase();
            let results = [];
            _.each(tokenMarkers, marker => {
                if(marker.name.toLowerCase() === markerName) results.push(marker);
            });
            log(results);
            let chatMessage = getChatMessageFromTokenMarkers(results);
            chatMessage = chatMessage || 'Unable to find any matching token markers'
            sendChat("Token Markers", chatMessage);
        } else if(msg.content.split(" ")[0].toLowerCase() === '!settokenmarker') {
            const markerName = msg.content.split(" ")[1].toLowerCase();
            if (!msg.selected && msg.selected[0]._type == "graphic") return;
            obj = getObj(msg.selected[0]._type, msg.selected[0]._id);
            currentMarkers = obj.get("statusmarkers").split(',');
            currentMarkers.push(markerName);
            obj.set("statusmarkers", currentMarkers.join(','));
        } else if(msg.content.split(" ")[0].toLowerCase() === '!gettokenmarkers') {
            if (!msg.selected) return;
            if (msg.selected[0]._type !== "graphic") return;
            obj = getObj(msg.selected[0]._type, msg.selected[0]._id);
            currentMarkers = obj.get("statusmarkers");
            sendChat("Token Markers", currentMarkers);
        }
    });
});