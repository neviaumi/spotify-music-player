from pulumi import export, Output, Config
from pulumi_gcp import container

config = Config("gcp")
project_id = config.require('project')


def create_container_registry():
    container.Registry("test-pulumi-registry", location="EU")
    output = Output.from_input(f"eu.gcr.io/{project_id}")
    # TODO: push initial image to registry
    export("registry", output)
    return output
