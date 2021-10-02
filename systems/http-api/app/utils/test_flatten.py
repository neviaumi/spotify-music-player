import pytest

from .flatten import flatten


@pytest.mark.parametrize(
    "input_data,expected_output",
    [
        ([[["1"]], ["2"], "3"], [["1"], "2", "3"]),
        (
            [[1], [2], [3]],
            [1, 2, 3],
        ),
        (
            [],
            [],
        ),
    ],
)
def test_flatten(input_data, expected_output):
    output = flatten(input_data)
    assert output == expected_output
