import os
import json

f = []
for (dirpath, dirnames, filenames) in os.walk(os.getcwd()):
    f.extend(filenames)
    break

for file in f:
    if not (str.endswith(file,".json")):
        f.remove(file)

################################

f.sort()

# [ {id, titulo} ]


res = []

for file in f:
    jstr = json.load(open(file))
    id = jstr["_id"]
    titulo = jstr["titulo"]
    res.append((id,titulo))

 
l = []
for (a,b) in res:
    item = {"id" : a , "titulo" : b}
    l.append(item)

fd = open("index.json", "w")
fd.write(json.dumps(l, indent=4, ensure_ascii=True))





