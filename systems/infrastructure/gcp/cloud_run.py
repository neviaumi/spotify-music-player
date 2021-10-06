import pulumi
from pulumi_gcp import cloudrun, organizations
from pulumi import Output


def create_cloud_run(registry: Output[str]):
    cloud_run_instance = cloudrun.Service("test-pulumi-cloud-run",
                                          location="europe-west2",
                                          template=cloudrun.ServiceTemplateArgs(
                                              spec=cloudrun.ServiceTemplateSpecArgs(
                                                  containers=[cloudrun.ServiceTemplateSpecContainerArgs(
                                                      image=registry.apply(
                                                          lambda container_registry: f"{container_registry}/http-api"),
                                                  )],
                                              ),
                                          ),
                                          traffics=[cloudrun.ServiceTrafficArgs(
                                              percent=100,
                                              latest_revision=True,
                                          )],
                                          autogenerate_revision_name=True)
    no_auth_iam_policy = organizations.get_iam_policy(bindings=[organizations.GetIAMPolicyBindingArgs(
        role="roles/run.invoker",
        members=["allUsers"],
    )])
    cloudrun.IamPolicy("no-auth-iam-policy",
                       location=cloud_run_instance.location,
                       project=cloud_run_instance.project,
                       service=cloud_run_instance.name,
                       policy_data=no_auth_iam_policy.policy_data)
    pulumi.export("cloud run url", cloud_run_instance.statuses.url)
