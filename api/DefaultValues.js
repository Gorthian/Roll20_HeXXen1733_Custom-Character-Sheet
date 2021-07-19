/* 
	EDITED by 			Gorthian
	Version				3.0
	Letzte Änderung		2021-04-21
	
	GitHub				https://github.com/Gorthian/HeXXen1733_Custom_Character_Sheet
	Wiki				https://github.com/Gorthian/HeXXen1733_Custom_Character_Sheet/wiki
	Bugs & Issues		https://github.com/Gorthian/HeXXen1733_Custom_Character_Sheet/issues
	
	Über dieses API können Standarwerte für neue Charaktere gesetzt werden.
	z.B. die verwendeten Würfeltabellen, bevorzugten Einstellungen und verwendeten Module.
*/

/*********************************/
/* JANUSEINSTELLUNGEN            */
/*********************************/
/* Januswurf ohne Rückfrage */	var sJanusAutoCalc = "1"; 		/* 1- Aktiv / 0 - Inaktiv */
/* Januswürfel verrechnen */	var sSumAutoCalc = "1"; 	/* 1- Aktiv / 0 - Inaktiv */

/*********************************/
/* TABELLEN                      */
/*********************************/
/* HeXXenwürfel */		var sTableHexxen = "HeXXen";
/* Januswürfel */		var sTableJanus = "Janus";
/* Blutwürfel */		var sTableBlood = "Blutwürfel";
/* Segnungswürfel */	var sTableBless = "Segen";
/* Elixierwürfel */		var sTableElix = "Elixier";
/* HeXXenmeister */		var sTableHexxenmeister = "HeXXenmeister";

/*********************************/
/* Module			             */
/*********************************/
/* MM - Fibel des Jägerhandwerks */		var sModule_MM_FdJ = "1"; 			/* 1- Aktiv / 0 - Inaktiv */
/* MM - Altersgebrechen */				var sModule_MM_FdJ_Mod1 = "1"; 		/* 1- Aktiv / 0 - Inaktiv */
/* MM - Herkunft */						var sModule_MM_FdJ_Mod2 = "1"; 		/* 1- Aktiv / 0 - Inaktiv */
/* MM - Fraktionen */					var sModule_MM_FdJ_Mod3 = "1"; 		/* 1- Aktiv / 0 - Inaktiv */

function getAttrByName (sCharId, sAttrName) {
	let objAttr = findObjs({type: 'attribute', characterid: sCharId, name: sAttrName})[0];
	if (!objAttr) {
		objAttr = createObj('attribute', {characterid: sCharId,	name: sAttrName});
	}
	return objAttr;
}

function setAttr(sCharId,sAttrName,sAttrValue) {
	let objAttribute = getAttrByName(sCharId,sAttrName);
	objAttribute.set("current", sAttrValue);
}

on("ready", function() {
	on("add:character", function(obj) {
		let objCharacter = getObj("character", obj.id);
		setAttr(objCharacter.id, "JanusAutoCalc", sJanusAutoCalc);
		setAttr(objCharacter.id, "SumAutoCalc", sSumAutoCalc);
		setAttr(objCharacter.id, "tblHexxen", sTableHexxen);
		setAttr(objCharacter.id, "tblJanus", sTableJanus);
		setAttr(objCharacter.id, "tblBlood", sTableBlood);
		setAttr(objCharacter.id, "tblBless", sTableBless);
		setAttr(objCharacter.id, "tblElix", sTableElix);
		setAttr(objCharacter.id, "tblHexxenmeister", sTableHexxenmeister);
		setAttr(objCharacter.id, "Module-MM-FdJ", sModule_MM_FdJ);
		setAttr(objCharacter.id, "Module-MM-FdJ-Mod1", sModule_MM_FdJ_Mod1);
		setAttr(objCharacter.id, "Module-MM-FdJ-Mod2", sModule_MM_FdJ_Mod2);
	});
});