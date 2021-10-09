import pulumi
import pytest

from gcp.cloud_run import create_cloud_run


class MockCloudRun(pulumi.runtime.Mocks):
    def new_resource(self, args: pulumi.runtime.MockResourceArgs):
        return [f"{args.name}_id", args.inputs]

    def call(self, args: pulumi.runtime.MockCallArgs):
        return {}


pulumi.runtime.set_mocks(MockCloudRun())


@pytest.mark.skip(reason="Unknown how to mock cloud run output")
@pulumi.runtime.test
def test_create_cloud_run():
    def check(cloud_run_instance):
        assert (
            cloud_run_instance["not_found_page"]
            == cloud_run_instance["main_page_suffix"]
        )

    cloud_run = create_cloud_run(pulumi.Output.from_input("dummy-image"))
    cloud_run.apply(check)
