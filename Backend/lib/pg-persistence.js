const { dbQuery } = require("./db-query");
const bcrypt = require("bcrypt");

module.exports = class PgPersistence {
  constructor(sessionID) {
  	this.sessionID = sessionID; //
  }

  async testQuery1() {
    const SELECT = 'SELECT * FROM urls WHERE ';

    let result = await dbQuery(SELECT);
    console.log(result.rows);
    return result.rows;
  }

  async getURLs() {
    const SELECT = 'SELECT * FROM urls WHERE session_id = $1';

    let result = await dbQuery(SELECT, this.sessionID);

    return result.rows;
  }

  async lengthOfPlantInfos(plantListId) {
    const SELECT = 'SELECT COUNT(*) FROM plant_info WHERE plantlist_id = $1';

    let result = await dbQuery(SELECT, plantListId);

    return result.rows[0].count;
  }

  async acceptUserCredentials(username, password) {
  	const SELECT = 'SELECT password FROM users WHERE username = $1';

  	let result = await dbQuery(SELECT, username);

  	if (result.rowCount === 0) return false;

  	return bcrypt.compare(password, result.rows[0].password);
  }

  async sortedPlants(plantListId, limit = 10, offset = 0) {
  	const PLONTS = 'SELECT * FROM plant_info WHERE plantlist_id = $1 ORDER BY "date" DESC OFFSET $2 LIMIT $3';

  	let result = await dbQuery(PLONTS, plantListId, offset, limit);

  	return result.rows;
  }

  async sortedPlantLists(limit = 10, offset = 0) {
  	const SELECT = 'SELECT * FROM plantlists WHERE username = $1 ORDER BY name ASC OFFSET $2 LIMIT $3';

  	let result = await dbQuery(SELECT, this.username, offset, limit);

  	return result.rows;
  }

  async loadPlantInfo(plantId) {
  	const PLONT = 'SELECT * FROM plant_info WHERE id = $1';

  	let result = await dbQuery(PLONT, plantId);

  	return result.rows[0];
  }

  async loadPlantInfos(plantListId) {
  	// return a list of plant infos for (plantListId)
  	const PLONTS = 'SELECT * FROM plant_info WHERE plantlist_id = $1';

  	let result = await dbQuery(PLONTS, plantListId);

  	return result.rows;
  }

  async loadPlantName(plantListId) {
  	const SELECT = 'SELECT name FROM plantlists WHERE id = $1 AND username = $2';

  	let result = await dbQuery(SELECT, plantListId, this.username);

  	return result.rows[0];
  }

  async updatePlantInfo(plantId, date, watered, notes) {
  	const UPDATE = 'UPDATE plant_info SET date = $1, watered = $2, notes = $3 WHERE id = $4';

  	let result = await dbQuery(UPDATE, date, watered, notes, plantId);

  	return result.rowCount > 0;
  }

  async updatePlantName(plantListId, newPlantName) {
  	const UPDATE = 'UPDATE plantlists SET name = $1 WHERE id = $2 AND username = $3';

  	let result = await dbQuery(UPDATE, newPlantName, plantListId, this.username);

  	return result.rowCount > 0;
  }

  async deletePlantInfo(plantId) {
  	const DELETE = 'DELETE FROM plant_info WHERE id = $1';

  	let result = await dbQuery(DELETE, plantId);

  	return result.rowCount > 0;
  }

  async deletePlant(plantListId) {
  	const DELETE = 'DELETE FROM plantlists WHERE id = $1 AND username = $2';

  	let result = await dbQuery(DELETE, plantListId, this.username);

  	return result.rowCount > 0;
  }

}