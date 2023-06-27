const express  = require('express');
const dashboardRoute = express.Router();

const { showDashboard } = require('../controllers/dashboard.controller');

dashboardRoute.get('/', showDashboard)

module.exports = dashboardRoute;

