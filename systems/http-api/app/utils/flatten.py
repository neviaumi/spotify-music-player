from typing import List, TypeVar
from itertools import chain

Item = TypeVar("Item")


def flatten(iterable: List[List[Item]]) -> List[Item]:
    return list(chain.from_iterable(iterable))
