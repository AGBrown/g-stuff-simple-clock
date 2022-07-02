import { Action } from "../types/common";

const getVersion = async (setVersion: Action<string>) => {
  try {
    const response = await fetch('version.json', {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const { version } = response.json() as unknown as { version: string };
    setVersion(version);
  }
  catch (e) {
    const msg = "Could not fetch release version";
    console.error(msg);
    console.error(e);
    setVersion(msg);
  }
};

export {
  getVersion
}
