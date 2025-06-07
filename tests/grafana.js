import http from "k6/http";
import { sleep } from "k6";
import { loginUser } from "../apis/apiUser.js";
import { checkLoginResponse } from "../utils/checksLogin.js";
import { loginPayload } from "../payload/loginPayload.js";
import { postPizza } from "../apis/apiPizza.js";
import { pizzaConfigPayload } from "../payload/pizzaConfigPayload.js";
import { checkPizzaResponse } from "../utils/checksPizza.js";
import { CONFIG } from "../env.js";

export const options = {
  vus: 1,
  duration: "3s",
  //Grafana Cloud integration
  cloud: {
    projectID: __ENV.K6_PROJECT_ID,
    // use projectId from config file
    name: "k6- grafana",
  },
};

// This runs once before the test begins, used for setup/login
export function setup() {
  const { res, token } = loginUser(loginPayload);
  checkLoginResponse(res);

  if (!token) throw new Error("Login failed, no token received");
  return token; // token will be passed to each VU
}

// This runs for every iteration per VU
export default function (token) {
  const res = postPizza(pizzaConfigPayload, token);
  checkPizzaResponse(res);
  sleep(1); // simulate user think time
}
