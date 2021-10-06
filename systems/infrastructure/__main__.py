from gcp import create_cloud_storage, create_container_registry, create_cloud_run

create_cloud_storage()
registry = create_container_registry()
create_cloud_run(registry)
