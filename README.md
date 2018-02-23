# oanda-download
  download instrument data from oanda as csv

## install
```
  npm install -g https://github.com/eLimones/oanda-download.git
```
## usage
```
  oanda-download --key xxxxx [options]
```
  Options:

    -k, --key <apiKey>       your api key
    -i, --instrument <name>  instrument name. defaults to EUR_USD (default: EUR_USD)
    -o, --output <path>      output file path. defaults to instrument_name.csv
    -m, --min <date>         start date/date-time to request, example '2003-01-01' or '2003-01-01T00:00:00'. defaults to '2003-01-01' (default: 2003-01-01)
    -M, --max <date>         max date/date-time to request. defaults to current date-time
    -h, --help               output usage information
# examples
  minimal
  ```
  oanda-download --key xxxxxx 
 ```
  download another instrument
  ```
  oanda-download --key xxxxxx --instrument AUD_CAD  
  ```
  set non standard filename
  ```
  oanda-download --key xxxxxx -i AUD_CAD -o myfilename.csv
  ```
