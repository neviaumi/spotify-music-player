"""A Python Pulumi program"""

import pulumi
from pulumi_gcp import storage

# Create a GCP resource (Storage Bucket)
bucket = storage.Bucket('test-pulumi')

# Export the DNS name of the bucket
pulumi.export('test-pulumi',  bucket.url)
