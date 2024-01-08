# Update ConnectorStaged by Key

```bash
curl https://connect.{region}.commercetools.com/connectors/drafts/key={key} -i \
--header 'Authorization: Bearer {{ token }}' \
--header 'Content-Type: application/json' \
--data-binary '{
  "version" : 1,
  "actions" : [ {
    "action" : "{{ action }}",
    "{{ key }}" : "{{ value }}"
  } ]
}'
```

See all actions: https://docs.commercetools.com/connect/connectors-staged#update-actions

## Update GitHub repository and/or release tag

```bash
curl https://connect.us-central1.gcp.commercetools.com/connectors/drafts/key=ordergroove-connector -i \
--header 'Authorization: Bearer {{ token }}' \
--header 'Content-Type: application/json' \
--data-binary '{
  "version" : 1,
  "actions" : [{
    "action": "setRepository",
    "url": "https://github.com/gluo-dev/ordergroove-commercetools-connector.git",
    "tag": "v1.0.1"
  }]
}'
```

## Update Creator Name

```bash
curl https://connect.us-central1.gcp.commercetools.com/connectors/drafts/key=ordergroove-connector -i \
--header 'Authorization: Bearer {{ token }}' \
--header 'Content-Type: application/json' \
--data-binary '{
  "version" : 1,
  "actions" : [{
    "action": "setCreatorName",
    "creatorName": "Creator Name"
  }]
}'
```

## Update Creator Email

```bash
curl https://connect.us-central1.gcp.commercetools.com/connectors/drafts/key=ordergroove-connector -i \
--header 'Authorization: Bearer {{ token }}' \
--header 'Content-Type: application/json' \
--data-binary '{
  "version" : 1,
  "actions" : [{
    "action": "setCreatorEmail",
    "creatorEmail": "email@abc.com"
  }]
}'
```