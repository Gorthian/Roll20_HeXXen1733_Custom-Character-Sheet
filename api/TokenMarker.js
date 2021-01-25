/* 
	EDITED by 			Gorthian
	Version				1.0
	Letzte Änderung		2021-01-25
	
	GitHub				https://github.com/Gorthian/HeXXen1733_Custom_Character_Sheet
	Wiki				https://github.com/Gorthian/HeXXen1733_Custom_Character_Sheet/wiki
	Bugs & Issues		https://github.com/Gorthian/HeXXen1733_Custom_Character_Sheet/issues
	
	Dieses API-Skript zeigt Einflüsse und die aktuellen Puffer-LeP als Token Marker an
*/

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

    if (attr == "HealthBuffer") {
        setMarker(tokens,"status_green",parseInt(value))
    }
    
    if (attr == "influenceExternalDamageLevel") {
        setMarker(tokens,"status_arrowed",value)
    }
    
    if (attr == "influenceInternalDamageLevel") {
        setMarker(tokens,"status_drink-me",value)
    }
    
    if (attr == "influenceMalusLevel") {
        setMarker(tokens,"status_broken-skull",value)
    }
    
    if (attr == "influenceParalysisLevel") {
        setMarker(tokens,"status_snail",value)
    }
});