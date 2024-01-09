# Query Deployment logs by Key

```bash
curl --get https://connect.us-central1.gcp.commercetools.com/{{ PROJECT-KEY }}/deployments/key=ordergroove-connector-deployment/logs \
--header 'Authorization: Bearer {{ token }}' | json_pp
```