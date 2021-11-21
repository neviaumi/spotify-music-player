import pulumi
import pytest

from gcp.container_registry import create_container_registry


class MockContainerRegistry(pulumi.runtime.Mocks):
    def new_resource(self, args: pulumi.runtime.MockResourceArgs):
        return [f"{args.name}_id", args.inputs]

    def call(self, args: pulumi.runtime.MockCallArgs):
        return {}


pulumi.runtime.set_config("gcp:project", "dummy")
pulumi.runtime.set_mocks(MockContainerRegistry())


@pytest.mark.skip(reason="Unknown how to mock docker build")
@pulumi.runtime.test
def test_create_container_registry():
    def check(args):
        assert args == ""

    registry, image = create_container_registry()
    pulumi.Output.all(registry, image).apply(check)
