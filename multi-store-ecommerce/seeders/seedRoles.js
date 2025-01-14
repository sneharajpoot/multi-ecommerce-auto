const db = require('../config/db');

async function seedRoles() {
  const roles = [
    { roleName: 'Super Admin', description: 'Full access to all modules and actions' },
    { roleName: 'Store Admin', description: 'Manage store-specific modules and actions' },
    { roleName: 'Worker', description: 'Limited access to specific modules' },
  ];

  for (const role of roles) {
    await db.query(`INSERT INTO Roles (roleName, description) VALUES (?, ?)`, [role.roleName, role.description]);
  }

  console.log('Roles seeded successfully.');
  process.exit();
}

seedRoles();
