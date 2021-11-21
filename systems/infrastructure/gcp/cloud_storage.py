import pulumi
from pulumi import Config
from pulumi_gcp import storage


def create_cloud_storage():
    config = Config("gcp")
    location = config.require("region")
    name_config = Config("name")
    prefix = name_config.require("prefix")

    # Create a GCP resource (Storage Bucket)
    bucket = storage.Bucket(
        f"{prefix}-bucket",
        location=location,
        force_destroy=True,
        uniform_bucket_level_access=True,
        website=storage.BucketWebsiteArgs(
            main_page_suffix="index.html",
            not_found_page="index.html",  # SPA fallback
        ),
    )
    storage.BucketIAMBinding(
        f"{prefix}-bucket-iam-binding",
        bucket=bucket,
        role="roles/storage.objectViewer",
        members=["allUsers"],
    )

    pulumi.export(
        "cloud storage public url",
        pulumi.Output.concat("https://storage.googleapis.com/", bucket.id, "/"),
    )
    return bucket
