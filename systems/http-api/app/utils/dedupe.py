from typing import Callable, List, TypeVar

from itertools import groupby

Item = TypeVar("Item")


def dedupe(iterable: List[Item], key: Callable[[Item], str]) -> List[Item]:
    return [list(v)[0] for _, v in groupby(sorted(iterable, key=key), key=key)]
