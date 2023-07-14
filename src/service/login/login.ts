import hyRequest from ".."

export function loginAccountRequest(account: any) {
  return hyRequest.post({
    url: "/login",
    data: account
  })
}
