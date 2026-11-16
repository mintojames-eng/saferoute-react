import json
import os
from pymongo import MongoClient

def seed():
    try:
        client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=3000)
        db = client['saferoute']

        base_dir = os.path.dirname(os.path.abspath(__file__))
        possible_paths = [
            os.path.join(base_dir, 'saferoute-react', 'db.json'),
            os.path.join(base_dir, 'db.json'),
            os.path.join(base_dir, '..', 'saferoute-react', 'db.json')
        ]
        
        db_data = None
        for p in possible_paths:
            if os.path.exists(p):
                with open(p, 'r', encoding='utf-8') as f:
                    db_data = json.load(f)
                print(f"Loaded db.json from {p}")
                break

        if db_data:
            if db['incidents'].count_documents({}) == 0 and 'incidents' in db_data:
                db['incidents'].insert_many(db_data['incidents'])
                print(f"Seeded {len(db_data['incidents'])} incidents into MongoDB.")

            if db['dashboardStats'].count_documents({}) == 0 and 'dashboardStats' in db_data:
                db['dashboardStats'].insert_many(db_data['dashboardStats'])
                print("Seeded dashboardStats into MongoDB.")

        print("\n=== SafeRoute MongoDB Verification ===")
        print(f"Collections: {db.list_collection_names()}")
        print(f"Incidents count: {db['incidents'].count_documents({})}")
        print(f"Stats count: {db['dashboardStats'].count_documents({})}")
        print(f"Users count: {db['users'].count_documents({})}")
        print(f"Alerts count: {db['alerts'].count_documents({})}")

    except Exception as e:
        print("MongoDB Seeder Error:", e)

if __name__ == '__main__':
    seed()
