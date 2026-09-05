import sys
sys.path.insert(0, 'app')
from routes.calculator import router

# Just confirm the router loaded without errors and has the endpoint registered
print("Router loaded successfully.")
print("Registered routes:")
for route in router.routes:
    print(f"  {route.methods} {route.path}")