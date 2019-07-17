#!/usr/bin/python3
import urllib.request
print("Getting the list...")
contents = urllib.request.urlopen("https://data.iana.org/TLD/tlds-alpha-by-domain.txt").readlines()
tlds = []
for line in contents:
  line = line.strip().lower()
  if line.startswith(b"#"):
    continue
  elif line.startswith(b"xn--"):
    tlds = tlds + [line.decode("idna")]
  else:
    tlds = tlds + [line.decode("utf-8")]


start="let tlds: string[] = ["
end="];\nexport { tlds };"


print("Writing to file...")

with open("../src/tlds.ts", 'w') as file:
  file.write(start)
  file.write(",\n".join(list(map(lambda tld: '  "' + tld + '"', tlds))))
  file.write(end)

print("Done!")

