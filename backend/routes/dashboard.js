const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, (req, res) => {
  // Dummy data required by the assignment
  const dashboardData = {
    leads: [
      { id: 1, name: 'John Doe', status: 'New' },
      { id: 2, name: 'Jane Smith', status: 'Contacted' },
      { id: 3, name: 'Acme Corp', status: 'Qualified' }
    ],
    tasks: [
      { id: 1, title: 'Follow up with John', completed: false },
      { id: 2, title: 'Prepare presentation for Acme', completed: true },
      { id: 3, title: 'Send invoice to Jane', completed: false }
    ],
    users: [
      { id: 1, name: 'Alice Admin', role: 'Manager' },
      { id: 2, name: 'Bob Employee', role: 'Staff' }
    ]
  };

  res.json({
    user: req.user,
    data: dashboardData
  });
});

module.exports = router;
