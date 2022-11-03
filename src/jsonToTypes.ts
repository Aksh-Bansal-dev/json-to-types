/*
{
    "hello":"hi", 
    "num": 21,
    "arr":[
        {
            "arrsr": "good",
            "nested": {
                "nice": [1,2,3]
            }
        }
    ],
    "obj": {
        "again": "depth"
    }
}
*/
interface jsonItem {
  name: string;
  obj: any;
}
export const jsonStringToTypes = (name: string, obj: string): string => {
  try {
    return jsonToTypes(name, JSON.parse(obj));
  } catch (error) {
    return "";
  }
};

const jsonToTypes = (name: string, json: any): string => {
  if (Array.isArray(json)) {
    console.log(json[0]);
    return jsonToTypes(name, json[0]);
  }
  console.log("helle");
  let res = `export interface ${name} {\n`;
  let remainingJson: jsonItem[] = [];
  Object.keys(json).forEach((e) => {
    res += "    ";
    res +=
      e +
      ": " +
      getType(e, json[e], (e) => {
        remainingJson.push(e);
      }) +
      ";\n";
  });
  res += "}\n";
  while (remainingJson.length !== 0) {
    res += "\n\n" + jsonToTypes(remainingJson[0].name, remainingJson[0].obj);
    remainingJson.shift();
  }
  return res;
};

const getType = (
  name: string,
  obj: any,
  pushToStack: (e: jsonItem) => void
): string => {
  const type = typeof obj;
  if (type === "object") {
    if (obj === null) {
      return "null";
    } else if (Array.isArray(obj)) {
      const interfaceName = capitalizeFirstLetter(name);
      if (obj.length === 0) {
        return "any[]";
      }
      return getType(interfaceName, obj[0], pushToStack) + "[]";
    } else {
      const interfaceName = capitalizeFirstLetter(name);
      pushToStack({ name: interfaceName, obj });
      return interfaceName;
    }
  } else {
    return type;
  }
};

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// TODO: check if a field take multiple types (possible in array)
