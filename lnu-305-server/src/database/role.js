const Database = require('./connection')

module.exports = {
  getRole,
  getRoleForUser
}

const db = Database.getConnection()

async function getRole (roleName) {
  const [rows] = await db.connection.query(`
    SELECT *
    FROM Role
    WHERE name = ?
  `, [roleName]
  )

  return rows[0]
}

async function getRoleForUser (userID) {
  const [rows] = await db.connection.query(`
    SELECT Role.*
    FROM Role
    INNER JOIN User ON Role.roleID = User.Role_IDrole
    WHERE User.userID = ?
  `, [userID]
  )

  return rows[0]
}
