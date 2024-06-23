

// Define the function to fetch METAR data
async function fetchMetar(icaoCode) {
    // Construct the URL
    const url = `https://api.met.no/weatherapi/tafmetar/1.0/metar?icao=${icaoCode}`;
    
    try {
        // Fetch the data from the API
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'FMCAPP/1.0 (mazesecbr@gmail.com)' // Replace with your app details
            }
        });

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Parse the response text
        const metarData = await response.text();

        // Process the METAR data (for demonstration, we just log it to the console)
        
        // You can split the data into individual reports if needed
        const reports = metarData.split('=\n');
        console.log(reports);

        const mostRecentReport = reports[reports.length - 2];
        // Return the parsed METAR data
        return mostRecentReport;
    } catch (error) {
        // Handle any errors
        console.error(`Failed to fetch METAR data: ${error.message}`);
    }
}

export default fetchMetar;