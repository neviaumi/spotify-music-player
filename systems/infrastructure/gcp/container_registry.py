from pulumi import export, Config
from pulumi_gcp import artifactregistry
from pulumi_docker import Image, DockerBuild


def create_container_registry():
    config = Config("gcp")
    project_id = config.require("project")
    location = config.require("region")
    image_name = "http-api"
    domain = "europe-west2-docker.pkg.dev"
    registry = artifactregistry.Repository(
        "test-pulumi-repository",
        location=location,
        repository_id="test-pulumi-repository",
        description="example docker repository",
        format="DOCKER",
    )
    registry_url = registry.name.apply(
        lambda registry_name: f"{domain}/{project_id}/{registry_name}"
    )
    default_image = Image(
        "http-api",
        image_name=registry_url.apply(lambda url: f"{url}/{image_name}:v0.0.0"),
        build=DockerBuild(context="./simple-http-api"),
    )
    export("image", default_image.image_name)
    export("registry", registry_url)
    return registry.name, default_image.image_name
