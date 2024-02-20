# test_analytics_api.py
import unittest
from flask import json
from app import app

class AnalyticsAPITestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_root_endpoint(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        # Assuming the response is JSON with a list of exercises
        data = json.loads(response.data)
        self.assertIsInstance(data, list)  # Check if data is a list

    def test_stats_endpoint(self):
        response = self.app.get('/stats')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue('stats' in data)  # Check if 'stats' key exists in response

    def test_user_stats_endpoint(self):
        # Replace 'testuser' with a valid username from your database
        response = self.app.get('/stats/testuser')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue('stats' in data)

    def test_weekly_user_stats(self):
        # Ensure these query parameters are correctly formatted and valid
        response = self.app.get('/stats/weekly/?user=testuser&start=2022-01-01&end=2022-01-07')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue('stats' in data)

if __name__ == '__main__':
    unittest.main()
