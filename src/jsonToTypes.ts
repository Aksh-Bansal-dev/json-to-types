/*
{"hello":"hi", "num": 21,"arr":[]}
*/
export function jsonToTypes(json: string): string {
  try {
    let res = "export interface jsonObj = {\n";
    let obj = JSON.parse(json);
    Object.keys(obj).forEach((e) => {
      res += "    ";
      res += e + ": " + typeof obj[e] + ";\n";
    });
    res += "}";
    return res;
  } catch (error) {
    return "";
  }
}
