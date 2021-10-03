from typing import Callable, List

from itertools import groupby


def dedupe(iterable: List[dict], key: Callable[[dict], str]):
    return [list(v)[0] for _, v in groupby(sorted(iterable, key=key), key=key)]
