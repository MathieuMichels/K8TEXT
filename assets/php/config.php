<?php
const MAXMESSAGES = 30;
const AUTOMOD = false;
const API_KEY = 'YOUR_API_KEY';
const API_URL = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=' . API_KEY;
const LANGUAGES = 'fr';
const TIMEZONE = 'Europe/Brussels';
const TOXICITY_LEVEL = 0.2;
const MESSAGES_FILE = 'messages.json';
const MESSAGES_BACKUP_FILE = 'messages_backup.json';
const REJECTED_MESSAGES_FILE = 'rejected_messages.json';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';
?>