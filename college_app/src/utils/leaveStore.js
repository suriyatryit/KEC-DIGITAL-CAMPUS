// Shared in-memory leave store — simulates a backend
// In production this would be replaced by API calls

let leaveRequests = [
  {
    id: 1,
    submittedBy: 'kec_faculty',
    name: 'Prof. Jenkins',
    role: 'faculty',
    type: 'Casual Leave',
    from: '2026-10-28',
    to: '2026-10-28',
    days: 1,
    reason: 'Personal work',
    status: 'approved',
    remarks: 'Approved. Take care.',
    submittedAt: '2026-10-25',
  },
  {
    id: 2,
    submittedBy: 'kec_faculty',
    name: 'Prof. Jenkins',
    role: 'faculty',
    type: 'Medical Leave',
    from: '2026-11-02',
    to: '2026-11-04',
    days: 3,
    reason: 'Scheduled medical checkup',
    status: 'pending',
    remarks: '',
    submittedAt: '2026-10-30',
  },
  {
    id: 3,
    submittedBy: 'kec_student01',
    name: 'Suriya',
    role: 'student',
    type: 'Medical Leave',
    from: '2026-11-05',
    to: '2026-11-06',
    days: 2,
    reason: 'Fever and flu',
    status: 'pending',
    remarks: '',
    submittedAt: '2026-11-04',
  },
];

let nextId = 4;

export const getLeaves = (username) =>
  leaveRequests.filter((l) => l.submittedBy === username);

export const getAllLeaves = () => [...leaveRequests];

export const getPendingLeaves = () =>
  leaveRequests.filter((l) => l.status === 'pending');

export const submitLeave = (data) => {
  const leave = { ...data, id: nextId++, status: 'pending', remarks: '' };
  leaveRequests = [leave, ...leaveRequests];
  return leave;
};

export const updateLeaveStatus = (id, status, remarks = '') => {
  leaveRequests = leaveRequests.map((l) =>
    l.id === id ? { ...l, status, remarks } : l
  );
};
