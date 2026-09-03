import sys
sys.path.insert(0, 'app')
from dotenv import load_dotenv
load_dotenv()

from routes.report import router
print("Router loaded. Registered routes:")
for route in router.routes:
    print(f"  {route.methods} {route.path}")