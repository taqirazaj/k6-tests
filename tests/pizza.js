import { loginUser } from "../apis/apiUser.js";
import { checkLoginResponse } from "../utils/checksLogin.js";
import { loginPayload } from "../payload/loginPayload.js";
import { postPizza } from "../apis/apiPizza.js";
import { pizzaConfigPayload } from "../payload/pizzaConfigPayload.js";
import { checkPizzaResponse } from "../utils/checksPizza.js";
import { sleep } from "k6";

// Load test options configuration
export const options = {
  vus: 2, // Number of Virtual Users (concurrent users)
  iterations: 10, // Total iterations across all VUs
  // You can add more options here, like duration, thresholds, etc.
};

// The setup function runs once before the load test begins
// Used here to perform login and retrieve auth token for all VUs
export function setup() {
  // Call login API and get response and token
  const { res, token } = loginUser(loginPayload);

  // Perform checks on login response to ensure success
  checkLoginResponse(res);

  // If token is missing, throw error to stop test
  if (!token) throw new Error("Login failed, no token received");

  // Return the token to be passed to the default function for each VU
  return token;
}

// The default function is executed by each virtual user iteration
// Receives the token returned from setup() as a parameter
export default function (token) {
  // Use the token to make authenticated POST request to pizza API
  const res = postPizza(pizzaConfigPayload, token);

  // Check the pizza API response for expected results
  checkPizzaResponse(res);

  // Sleep for 1 second to simulate think time between requests
  sleep(1);
}
