# Query Custom Object which holds the job status

```bash
curl --get https://api.us-central1.gcp.commercetools.com/{{ PROJECT-KEY }}/custom-objects/Ordergroove/JobStatusSchema \
--header 'Authorization: Bearer {{ token }}' | json_pp
```