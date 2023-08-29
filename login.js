// use the looker sdk to login using a client id and secret
// this is a server side script that will be run on the server
// and will return a token that can be used to make api calls
// to looker
import * as dotenv from "dotenv";
import req from "./req.json" assert { type: "json" };
dotenv.config();
import {
  LookerNodeSDK,
  NodeSettingsIniFile,
  NodeSession,
} from "@looker/sdk-node";

(async () => {
  const settings = new NodeSettingsIniFile();
  const session = new NodeSession(settings);
  const sdk = LookerNodeSDK.init40(settings);

  // retrieve your user account to verify correct credentials
  //   const me = await sdk.ok(sdk.me(
  //     "id, first_name, last_name, display_name, email, personal_space_id, home_space_id, group_ids, role_ids"))
  //   console.log({me})
  // make any other calls to the Looker SDK

  for (let i = 0; i < 10; i++) {
    console.time("looker" + i);
    const json_1 = await sdk.ok(sdk.run_inline_query(req))
    .then((json_1) => {
      console.timeLog("looker" + i);
    });
  }


  // const json = await sdk.ok(sdk.query_for_slug("YGvEuI9eseT8Oh73XUTZ2r"));
  // const json = await sdk.ok(sdk.look(1));
  // console.log({ json });
  //

  await sdk.authSession.logout();
  if (!sdk.authSession.isAuthenticated()) {
    console.log("Logout successful");
  }
})();
