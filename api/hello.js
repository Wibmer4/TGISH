// api/hello.js
export default function handler(request, response) {
  response.status(200).json({ 
    message: "Hello from a new Vercel Function! This confirms routing is working."
  });
}