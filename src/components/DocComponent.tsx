import Markdown from "react-markdown";

function DocComponent() {
  const markdown = `
  # EE303: Mobile Robotics
  

  ## How to use
  
  The server that your robot will comunicate with is at [http://3.254.68.200:8000]()
  
  
  ### To Notify the server of Arrival
  
  To notify the EE303 Mobile Robotics Server of your arrival the robot should send a post to **/api/arrived/TEAM-ID**, this request should contain your position in the body.
  
  **Example:**

  To nofity the server of arrival to position 0 the following post request would be sent.
  
  \`\`\`
  POST /api/arrived/TEAM-ID HTTP/1.1
  Content-Type: application/x-www-form-urlencoded
  Content-Length: 10
  position=0
  \`\`\`
  The server in response to the post request will respond to the request with the destination formatted in plain text after the HTTP headers.
  
  **Example:**

  Destination of 5
  
  \`\`\`
  HTTP/1.1 200 OK
  Access-Control-Allow-Origin: *
  Content-Type: text/plain: charset=utf-8
  Content-Length: 1
  ETag: W/"1-NWoZK3kTsExUV@@Ywo1G5j1UKKs"
  Date: Fri, 17 Jul 2020 16:16:57 GMT
  Connection: keep-alive

  5
  \`\`\`
  
  `;

  return (
    <div
      style={{
        width: "60%",
        margin: "auto",
        position: "relative",
      }}
    >
      <Markdown>{markdown}</Markdown>
    </div>
  );
}

export default DocComponent;
