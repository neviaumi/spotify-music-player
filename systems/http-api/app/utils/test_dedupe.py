import pytest

from .dedupe import dedupe


@pytest.mark.parametrize(
    "input_data,expected_output",
    [
        (
            [
                {"id": 1, "value": 10},
                {"id": 1, "value": 10},
                {"id": 2, "value": 20},
                {"id": 2, "value": 20},
                {"id": 3, "value": 30},
            ],
            [{"id": 1, "value": 10}, {"id": 2, "value": 20}, {"id": 3, "value": 30}],
        ),
        (
            [{"id": 1}, {"id": 2}, {"id": 3}],
            [{"id": 1}, {"id": 2}, {"id": 3}],
        ),
        (
            [{"id": 2}, {"id": 1}, {"id": 3}, {"id": 2}, {"id": 1}, {"id": 3}],
            [{"id": 1}, {"id": 2}, {"id": 3}],
        ),
        (
            [],
            [],
        ),
    ],
)
def test_dedupe(input_data, expected_output):
    output = dedupe(input_data, lambda item: item["id"])
    assert output == expected_output
