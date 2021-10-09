import pulumi

from gcp.cloud_storage import create_cloud_storage


class MockCloudStorage(pulumi.runtime.Mocks):
    def new_resource(self, args: pulumi.runtime.MockResourceArgs):
        return [f"{args.name}_id", args.inputs]

    def call(self, args: pulumi.runtime.MockCallArgs):
        return {}


pulumi.runtime.set_mocks(MockCloudStorage())


@pulumi.runtime.test
def test_create_cloud_storage():
    def check_website(website):
        assert website["not_found_page"] == website["main_page_suffix"]

    storage = create_cloud_storage()
    storage.website.apply(check_website)
