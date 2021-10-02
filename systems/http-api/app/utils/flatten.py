from itertools import chain


def flatten(iterable: [[any]]):
    return list(chain.from_iterable(iterable))
