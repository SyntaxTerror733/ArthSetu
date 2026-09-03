import json
from functools import lru_cache
from pathlib import Path
from typing import Any, Dict, List, Optional

DATA_FILE_PATH = Path(__file__).parent / "district_data.json"


@lru_cache(maxsize=1)
def load_district_data() -> Dict[str, Any]:
    """Read and return the district dataset, cached in memory."""
    with open(DATA_FILE_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def get_district(district_name: str) -> Optional[Dict[str, Any]]:
    """
    Case-insensitive search for a district by name.
    Returns the district dictionary or None if not found.
    """
    if not district_name:
        return None

    normalized_query = district_name.strip().lower()
    data = load_district_data()
    districts = data.get("districts", [])

    for d in districts:
        if d.get("district", "").strip().lower() == normalized_query:
            return d

    return None


def list_available_districts() -> List[str]:
    """Return a list of available district names."""
    data = load_district_data()
    return [d["district"] for d in data.get("districts", []) if "district" in d]
