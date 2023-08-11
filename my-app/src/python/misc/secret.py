import secrets
import string

def generate_secure_random_string(length):
    """
    Used to create a cryptographically string of length `length`.
    We can use this to generate links securely.
    """
    characters = string.ascii_letters + string.digits  # A-Z, a-z, 0-9
    return ''.join(secrets.choice(characters) for i in range(length))

# random_string = generate_secure_random_string(24)
# print(random_string)