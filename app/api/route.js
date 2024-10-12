export async function POST(request) {
    try {
        const body = await request.json(); // Use request.json() to parse JSON body
        console.log('Received request:', body); // Log the received request body to the console
         
        const res= await fetch("https://live-calls-network.trackdrive.com/api/v1/leads",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)  // Send the parsed JSON body to the API
        })

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Received data:', data);  // Log the received data from the API
        
        return new Response(JSON.stringify({ message: "successfully added the document" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}