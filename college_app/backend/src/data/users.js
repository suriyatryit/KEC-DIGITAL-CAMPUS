const bcrypt = require('bcryptjs');

// In-memory user store (replace with database in production)
const users = [
  {
    id: 'u001',
    username: 'kingston_admin',
    password: bcrypt.hashSync('Kec@Admin!2026', 10),
    role: 'chairman',
    name: 'Chairman Officer',
    department: null,
  },
  {
    id: 'u002',
    username: 'kec_principal',
    password: bcrypt.hashSync('Kec@Principal!2026', 10),
    role: 'principal',
    name: 'Dr. Principal',
    department: null,
  },
  {
    id: 'u003',
    username: 'kec_hod_cse',
    password: bcrypt.hashSync('Kec@Hod!2026', 10),
    role: 'hod',
    name: 'HOD CSE',
    department: 'CSE',
  },
  {
    id: 'u004',
    username: 'kec_faculty',
    password: bcrypt.hashSync('Kec@Faculty!2026', 10),
    role: 'faculty',
    name: 'Prof. Jenkins',
    department: 'CSE',
  },
  {
    id: 'u005',
    username: 'kec_student01',
    password: bcrypt.hashSync('Kec@Student!2026', 10),
    role: 'student',
    name: 'Alex Johnson',
    department: 'CSE',
    rollNo: 'CS101',
  },
  {
    id: 'u006',
    username: 'kec_hod_aids',
    password: bcrypt.hashSync('Kec@HodAids!2026', 10),
    role: 'hod',
    name: 'HOD AI&DS',
    department: 'AI&DS',
  },
  {
    id: 'u007',
    username: 'kec_hod_aiml',
    password: bcrypt.hashSync('Kec@HodAiml!2026', 10),
    role: 'hod',
    name: 'HOD AIML',
    department: 'AIML',
  },
  {
    id: 'u008',
    username: 'kec_hod_ece',
    password: bcrypt.hashSync('Kec@HodEce!2026', 10),
    role: 'hod',
    name: 'HOD ECE',
    department: 'ECE',
  },
  {
    id: 'u009',
    username: 'kec_hod_it',
    password: bcrypt.hashSync('Kec@HodIt!2026', 10),
    role: 'hod',
    name: 'HOD IT',
    department: 'IT',
  },
];

const findByUsername = (username) =>
  users.find((u) => u.username.toLowerCase() === username.toLowerCase());

const findById = (id) => users.find((u) => u.id === id);

module.exports = { users, findByUsername, findById };
