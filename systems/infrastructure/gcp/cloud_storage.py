import pulumi
from pulumi_gcp import storage


def create_cloud_storage():
    # Create a GCP resource (Storage Bucket)
    bucket = storage.Bucket('test-pulumi',
                            location="EU",
                            force_destroy=True,
                            uniform_bucket_level_access=True,
                            website=storage.BucketWebsiteArgs(
                                main_page_suffix="index.html",
                                not_found_page="index.html",  # SPA fallback
                            ),
                            )
    storage.BucketIAMBinding('test-pulumi-bucket-iam-binding',
                             bucket=bucket,
                             role="roles/storage.objectViewer",
                             members=["allUsers"]
                             )

    pulumi.export('cloud storage public url', pulumi.Output.concat('https://storage.googleapis.com/', bucket.id, "/"))
