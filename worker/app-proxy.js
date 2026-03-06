export default {
  async fetch(request) {
    const incomingUrl = new URL(request.url)
    const pathAfterApp = incomingUrl.pathname.replace(/^\/app(?=\/|$)/, '') || '/'
    const targetUrl = new URL(`https://gst.orivenza.com${pathAfterApp}${incomingUrl.search}`)

    return fetch(new Request(targetUrl, request))
  }
}
