# Salesforce SFDX CLI action

This action allows to use the Salesforce SFDX CLI from GitHub Actions

## Inputs

### `sfdx-auth-url`

**Optional** Authorize a Salesforce org using an SFDX auth URL

The secret must have the format `force://<refreshToken>@<instanceUrl>` or `force://<clientId>:<clientSecret>:<refreshToken>@<instanceUrl>`

You can obtain the URL from a authorized org from your local machine using: `sfdx force:org:display -u ORG-ALIAS --verbose`

## Example usage

```yaml
name: SFDX Test Run on Push

on: [push]

jobs:
  test:
  
    runs-on: ubuntu-latest
    
    steps:
      - uses: sfdx-actions/setup-sfdx@v1
        with:
          sfdx-auth-url: ${{ secrets.AUTH_SECRET }}
      - name: sfdx-test-run
        run: sfdx force:apex:test:run -l RunLocalTests -w 30
```

## License
```
MIT License

Copyright (c) 2019 Felipe Echanique Torres (felipe.echanique at gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
