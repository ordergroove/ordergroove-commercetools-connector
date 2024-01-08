# Get a Deployment

```bash
curl --get https://connect.us-central1.gcp.commercetools.com/{{ PROJECT-KEY }}/deployments/key=ordergroove-connector-deployment \
--header 'Authorization: Bearer {{ token }}' | json_pp
```