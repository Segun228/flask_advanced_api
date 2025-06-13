from faker import Faker
import random

fake = Faker()


def generate_user(user_id):
    return {
        "id": user_id,
        "username": fake.user_name(),
        "email": fake.email(),
        "is_active": random.choice([True, False]),
        "is_admin": random.choice([True, False]),
        "created_at": fake.iso8601(),
        "profile": {
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "age": random.randint(18, 70),
            "country": fake.country()
        }
    }


users = [generate_user(i + 1) for i in range(100)]
