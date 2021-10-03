from typing import List
from itertools import chain


def flatten(iterable: List[List[dict]]) -> List[dict]:
    return list(chain.from_iterable(iterable))
