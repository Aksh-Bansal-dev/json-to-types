/*
{
    "hello":"hi", 
    "num": 21,
    "arr":[
        {
            "arrsr": "good"
            "nested": {
                "nice": 1
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
    console.log(remainingJson[0]);
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
    if (Array.isArray(obj)) {
      const interfaceName = capitalizeFirstLetter(name);
      if (obj.length === 0) {
        return "[]";
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

// const addSpace = (n: number): string=>{

// }
